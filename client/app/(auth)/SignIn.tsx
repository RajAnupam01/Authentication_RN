import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Screen from '@/components/Screen'
import InputBox from '@/components/form/InputBox'
import { Link} from "expo-router";
import { Router } from 'expo-router';

const SignIn = () => {


  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = () => {

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
            <Text style={styles.registertxt} >Login</Text>
          </TouchableOpacity>
          <Link href="/SignUp" style={styles.btmtxt}  >
            Don't have an account ?<Text style={{color:'#068ad1', fontWeight:'700'}}> Sign Up</Text>
          </Link>
      </ScrollView>

    </Screen>
  )
}

export default SignIn

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