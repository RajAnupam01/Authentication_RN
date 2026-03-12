import API from "./api";

export const getMyProfile = async () => {
  const res = await API.get("/user/me");
  return res.data.data
};