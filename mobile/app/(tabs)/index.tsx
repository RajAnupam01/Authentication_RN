import Screen from "@/components/Screent"
import { AuthContext } from "@/context/authContext"
import { useContext} from "react"
import { Image, Text } from "react-native"

const Index = () => {
   const {user} =useContext(AuthContext)
   console.log(user)
  return (
    <Screen>
      {user ? (
        <>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Gender: {user.gender}</Text>
          <Image source={{uri:user.avatar}} style={{width:300, height:500}} />
        </>
      ) : (
        <Text>No user data</Text>
      )}
    </Screen>
  )
}

export default Index