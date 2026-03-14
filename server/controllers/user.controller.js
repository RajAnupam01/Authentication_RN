import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "../utils/cloudinary.js";

export const getMyProfile = AsyncHandler(async (req,res)=>{
    const user = req.user
    if(!user){
        throw new ApiError(401,"user not found.")
    }
    return res.json(
        new ApiResponse(200,user,"Current user fetched successfully.")
    )
})

export const updateMyProfile = AsyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const {name,email,gender,dateOfBirth,state,country,phone}=req.body;

    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404,"No such user exist.")
    }
    if(name && name !== user.name){
        const nameExists = await User.findOne({name:name.trim()});
        if(nameExists && nameExists._id.toString() !== userId.toString()){
            throw new ApiError(409,"name is already taken.")
        }
        user.name = name;
    }
    if(email && email.toLowerCase() !== user.email.toLowerCase()){
        const emailExists = await User.findOne({email:email.toLowerCase()});
        if(emailExists && emailExists._id.toString() !== userId.toString()){
            throw new ApiError(409,"email is already taken.")
        }
        user.email = email.toLowerCase()
    }
    if(gender) user.gender = gender.toLowerCase();
    if(dateOfBirth) user.dateOfBirth = dateOfBirth;
    if(country) user.country = country.trim()
    if(state) user.state = state.trim();
    if(phone) user.phone = phone.trim();
    
    const buffer = req.file?.buffer;
    if(buffer){
        if(user.avatarPublicId){
            try {
                await deleteImageFromCloudinary(user.avatarPublicId)
            } catch (error) {
                throw new ApiError(500,"failed to delete old avatar.")
            }
        }
         const uploaded = await uploadImageToCloudinary(buffer);
         user.avatar = uploaded.url;
         user.avatarPublicId = uploaded.public_id;
    }

    await user.save({validateBeforeSave:true});
    const updatedUser = await User.findById(userId).select("-password -refreshToken").lean()

    return res.status(200).json(new ApiResponse(200,updatedUser,"User updated successfully."));
})