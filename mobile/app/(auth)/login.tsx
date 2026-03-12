import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import InputBox from '@/components/InputBox'
import Screen from '@/components/Screent'
import { Link } from "expo-router";
import { AuthContext } from '@/context/authContext';
import { router } from "expo-router"
import { LoginUser } from '@/services/authApi';

const Login = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const { setUser } = useContext(AuthContext);


  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and Password are requried.")
      return
    }
    try {
      setLoading(true)
      const res = await LoginUser({
        email,
        password
      })
      setUser(res.data.user)
      alert(res.message)
      router.replace("/(tabs)")
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed";

      alert(message);

    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >

        <View style={styles.header}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>
            Login to your account
          </Text>
        </View>

        <View style={styles.form}>

          <InputBox
            placeholder="Email Address"
            keyboardType="email-address"
            value={email}
            setValue={setEmail}
          />

          <InputBox
            placeholder="Password"
            secureTextEntry
            value={password}
            setValue={setPassword}
          />


        </View>
        <TouchableOpacity style={styles.submitbtn} onPress={handleLogin} >
          <Text style={styles.registertxt} >{loading ? "wait..." : "Login"}</Text>
        </TouchableOpacity>
        <Link href="/register" style={styles.btmtxt}  >Don't have an account ?<Text style={{ color: '#068ad1', fontWeight: '700' }}> Sign Up</Text>
        </Link>
      </ScrollView>

    </Screen>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 20
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111"
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 10
  },

  form: {
    gap: 5
  },

  submitbtn: {
    backgroundColor: '#068ad1',
    paddingVertical: 12,
    borderRadius: 5,
    marginVertical: 8
  },
  registertxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  },
  btmtxt: {
    textAlign: 'center'
  }
})