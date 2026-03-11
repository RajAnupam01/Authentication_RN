import API from "./api";

export const getMyProfile = async () => {
  
  return API.get("/user/me");
};