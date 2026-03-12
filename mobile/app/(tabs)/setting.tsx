import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Screen from '@/components/Screent'
import { AuthContext } from '@/context/authContext'
import { router } from "expo-router"

const Setting = () => {

  const { logout} = useContext(AuthContext)

  const handleLogout = async () => {
    await logout()
    router.replace("/(auth)/login")
  }

return (
  <Screen>
    <Text style={{ marginBottom: 20 }} >Settings</Text >
    <TouchableOpacity onPress={handleLogout} >
      <Text>Log Out</Text>
    </TouchableOpacity>
  </Screen>
)
}

export default Setting

const styles = StyleSheet.create({})