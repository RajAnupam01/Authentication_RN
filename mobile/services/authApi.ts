import {  removeTokens, storeToken } from "@/utils/storage"
import API from "./api"

export const RegisterUser = async (data: any) => {
  const res = await API.post("/auth/register", data)
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

