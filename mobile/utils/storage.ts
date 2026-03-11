import * as SecureStore from "expo-secure-store";

export const saveAuthData = async (accessToken:string, refreshToken:string, user:any) => {
  await SecureStore.setItemAsync("accessToken", accessToken);
  await SecureStore.setItemAsync("refreshToken", refreshToken);
  await SecureStore.setItemAsync("cachedUser", JSON.stringify(user));
};

export const getAccessToken = async () => {
  return await SecureStore.getItemAsync("accessToken");
};

export const getRefreshToken = async () => {
  return await SecureStore.getItemAsync("refreshToken");
};

export const getCachedUser = async () => {
  const user = await SecureStore.getItemAsync("cachedUser");
  return user ? JSON.parse(user) : null;
};

export const clearAuthData = async () => {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
  await SecureStore.deleteItemAsync("cachedUser");
};