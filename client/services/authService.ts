import API from "./api"

export const RegisterUser = (data:any) =>{
    return API.post("/auth/register",data)
}

export const LoginUser = (data:any) =>{
    return API.post("/auth/login",data)
}

export const LogoutUser = (data:any) =>{
    return API.post("/auth/logout")
}

