import { getTokens, removeTokens, storeToken } from "@/utils/storage"
import axios from "axios"

const BASE_URL = "http://10.192.15.197:3000/api"

const axiosInstance = axios.create({
  baseURL: BASE_URL
})

// Attach access token
axiosInstance.interceptors.request.use(async (config) => {
  const { accessToken } = await getTokens()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

// Handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest: any = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/register")
    ) {

      originalRequest._retry = true

      try {

        const { refreshToken } = await getTokens()

        if (!refreshToken) throw new Error("No refresh token")

        // 🔹 Call correct endpoint
        const res = await axios.get(
          `${BASE_URL}/regenerate-access-token`,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`
            }
          }
        )

        const newAccessToken = res.data.data.accessToken

        // 🔹 store new access token
        await storeToken(newAccessToken, refreshToken)

        // 🔹 retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return axiosInstance(originalRequest)

      } catch (err) {

        // 🔹 logout user if refresh fails
        await removeTokens()

        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance