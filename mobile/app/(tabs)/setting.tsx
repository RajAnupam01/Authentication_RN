import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Screen from '@/components/Screent'
import { clearAuthData } from '@/utils/storage'
import { AuthContext } from '@/context/authContext'
import { router } from "expo-router"

const Setting = () => {

  const { setUser } = useContext(AuthContext)
  const handleLogout = async () => {
    try {
      await clearAuthData()
      setUser(null)
      router.replace("/(auth)/login")
    } catch (error) {

    }
  }
  return (
    <Screen>
      <Text style={{marginBottom:20}} >Settings</Text >
      <TouchableOpacity onPress={handleLogout} >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </Screen>
  )
}

export default Setting

const styles = StyleSheet.create({})