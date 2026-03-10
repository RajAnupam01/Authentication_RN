import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Screen from '@/components/Screen'
import { AuthContext } from '@/context/AuthContext'
import { LogoutUser } from '@/services/authService'

import { useRouter } from "expo-router";
import { RemoveTokens } from '@/utils/storage'
import { setAuthToken } from '@/services/api'

const setting = () => {
  const { setUser } = useContext(AuthContext)
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await LogoutUser(null);
      await RemoveTokens();
      setAuthToken(null);  
      setUser(null);
      router.replace("/(auth)/SignIn");
    } catch (error) {
      console.log("Logout error:", error);
    }
  }
  return (
    <Screen>
      <Text>Setting</Text>
      <TouchableOpacity onPress={handleLogout} >
        <Text>Logout</Text>
      </TouchableOpacity>
    </Screen>
  )
}

export default setting

const styles = StyleSheet.create({})