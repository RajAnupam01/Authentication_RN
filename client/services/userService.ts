import API from "./api";

export const getMyProfile = () =>{
    return API.get("/user/me")
}