import {  removeTokens, storeToken } from "@/utils/storage"
import API from "./api"

export const RegisterUser = async (data: any,avatar?:any) => {
   const formData = new FormData();

  // Append all fields
  for (const key in data) {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  }

  // Append avatar only if user selected one
  if (avatar) {
    const uriParts = avatar.uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    formData.append('avatar', {
      uri: avatar.uri,
      name: `avatar.${fileType}`,
      type: `image/${fileType}`,
    } as any);
  }

  // Send as multipart/form-data
  const res = await API.post('/auth/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  await storeToken(res.data.data.accessToken, res.data.data.refreshToken);
  return res.data
}

export const LoginUser = async (data: any) => {
  const res = await API.post("/auth/login", data)
  await storeToken(res.data.data.accessToken, res.data.data.refreshToken);
  return res.data
}

export const LogoutUser = async (data: any) => {
  try {
    await API.post("/auth/logout")
    
  } catch (err) {
    console.log(err)
  }
  await removeTokens()
}

