import Screen from "@/components/Screent"
import { AuthContext } from "@/context/authContext"
import { useContext} from "react"
import { Text } from "react-native"

const Index = () => {
   const {user} =useContext(AuthContext)
  return (
    <Screen>
      {user ? (
        <>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Gender: {user.gender}</Text>
        </>
      ) : (
        <Text>No user data</Text>
      )}
    </Screen>
  )
}

export default Index