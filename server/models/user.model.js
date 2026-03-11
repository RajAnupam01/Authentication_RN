import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+\@.+\..+/, "Please enter a valid email"]
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: true
        },
        dateOfBirth: {
            type: Date,
        },
        country: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true,
            match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"]
        },
        avatar: {
            type: String
        },
        avatarPublicId: {
            type: String
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        refreshToken: {
            type: String
        },
    }, {
    timestamps: true
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User", userSchema);
export default User;