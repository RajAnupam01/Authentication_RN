import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import { ApiError } from './ApiError.js';

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = (buffer, folder='myauth') =>{
    return new Promise((resolve,reject) =>{
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type:'image'
            },
            ((error,result)=>{
                if(error){
                    return reject(new ApiError(500, "cloudinary upload failed."))
                }
                resolve({
                    url:result.secure_url,
                    public_id: result.public_id,
                });
            })
        )
        stream.end(buffer);
    })
}

