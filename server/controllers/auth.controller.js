import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";
import jwt from 'jsonwebtoken'

export const GenerateToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found to generate token");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        const sanitizedUser = user.toObject();
        delete sanitizedUser.password;
        delete sanitizedUser.refreshToken;

        return { accessToken, refreshToken, user: sanitizedUser }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
}


const sendTokenResponse = async (userId, res, message = "success", statusCode = 200) => {
    const { accessToken, refreshToken, user } = await GenerateToken(userId);

    return res
        .status(statusCode)
        .json(new ApiResponse(statusCode, { user, accessToken, refreshToken, }, message))
}




export const RegisterController = AsyncHandler(async (req, res) => {
    const { name, email, password, gender, dateOfBirth, country, state, phone } = req.body;

    if ([name, email, password, gender].some((field) => !field || String(field).trim() === "")) {
        throw new ApiError(400, "All fields are mandatory to fill");
    }
    const existedUser = await User.findOne({
        $or: [{ name: name.trim() }, { email: email.toLowerCase().trim() }]
    });
    if (existedUser) {
        throw new ApiError(409, "User with this email or Name already Exists.")
    }
    const userPayload = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        gender: gender.toLowerCase(),
        dateOfBirth:dateOfBirth?dateOfBirth:undefined,
        country: country ? country.trim() : undefined,
        state: state ? state.trim() : undefined,
        phone: phone ? phone.trim() : undefined
    }

    if (req.file && req.file.buffer) {
        const avatar = await uploadImageToCloudinary(req.file.buffer);
        userPayload.avatar = avatar.url;
        userPayload.avatarPublicId = avatar.public_id;
    }
    const user = await User.create(userPayload);

    return sendTokenResponse(user._id, res, "User Registered and logged in Successfully", 201);
});



export const LoginController = AsyncHandler(async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        throw new ApiError(400,"Email and Password is required to login");
    }
    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(404, "User does not exist.")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401,"Incorrect Password.")
    }
    return sendTokenResponse(user._id,res,"User logged in Successfully.")
})


export const LogoutController = AsyncHandler(async (req, res) => {
    if(!req.user || !req.user._id){
        throw new ApiError(401,"Unauthorized request.")
    }
    await User.findByIdAndUpdate(req.user._id,{
        $unset:{refreshToken:""}
    });
    res
    .status(200)
    .json(new ApiResponse(200,{},"User logged out successfully."))
})


export const RegenerateAccessTokenController = AsyncHandler(async (req, res) => {
    const incomingRefreshToken = req.header("Authorization")?.replace("Bearer ","");
    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized Request.Refresh Token missing.");
    }
    try {
        const decodedToken =jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);
        if(!user){
            throw new ApiError(401,"Invalid refresh token")
        }
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,'Refresh Token is expired or used.')
        }
        const {accessToken,refreshToken} = await GenerateToken(user._id)
        return res
        .json(new ApiResponse(200,{accessToken,refreshToken},"AccessToken refreshed"))

    } catch (error) {
        throw new ApiError(401,error.message);
    }
})