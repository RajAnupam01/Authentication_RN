import Screen from "@/components/Screent"
import { AuthContext } from "@/context/authContext"
import { getMyProfile } from "@/services/userApi"
import { useContext, useEffect, useState } from "react"
import { Text } from "react-native"

const Index = () => {
  const { setUser } = useContext(AuthContext)
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile()  // calls /user/me
        console.log("Profile Data:", res.data)
        setProfile(res.data.data)         // adjust according to your backend response
        setUser(res.data.data)            // update context user if needed
      } catch (err: any) {
        console.log("API error:", err.response?.data || err.message)
        setError(err.response?.data?.message || "Failed to fetch profile")
      }
    }

    fetchProfile()
  }, [])

  return (
    <Screen>
      {profile ? (
        <>
          <Text>Name: {profile.name}</Text>
          <Text>Email: {profile.email}</Text>
          <Text>Gender: {profile.gender}</Text>
        </>
      ) : (
        <Text>{error || "Loading..."}</Text>
      )}
    </Screen>
  )
}

export default Index