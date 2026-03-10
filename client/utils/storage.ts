import * as  SecureStorage from "expo-secure-store"

export const SaveTokens = async(accessToken:string, refreshToken:string)=>{
    await SecureStorage.setItemAsync("accessToken",accessToken)
    await SecureStorage.setItemAsync("refreshToken",refreshToken)
}

export const getAccessToken = async()=>{
    return await SecureStorage.getItemAsync("accessToken");
}

export const getRefreshToken = async()=>{
    return await SecureStorage.getItemAsync("refreshToken");
}

export const RemoveTokens = async()=>{
    await SecureStorage.deleteItemAsync("accessToken");
    await SecureStorage.deleteItemAsync("refreshToken");
}
