import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import InputBox from '@/components/InputBox'
import SelectBox from '@/components/SelectBox'
import DatePicker from '@/components/DatePicker'
import RadioGroup from '@/components/RadioGroup'
import Screen from '@/components/Screent'
import { countryOptions, stateOptions } from '@/constants/locationOptions'
import { Link } from 'expo-router'
import { useContext } from "react"
import { router } from "expo-router"
import { AuthContext } from '@/context/authContext'
import { RegisterUser } from '@/services/authApi'
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';




const Register = () => {
    const { setUser } = useContext(AuthContext)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [dateOfBirth, setDateOfBirth] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<any>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect:[1,1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0]);
    }
  };


  const handleRegister = async () => {
    if (!name || !email || !password || !gender) {
      alert("Name, Email, Password and Gender are required")
      return
    }
    try {
      setLoading(true)
      const res = await RegisterUser({
        name,
        email,
        password,
        gender,
        dateOfBirth: dateOfBirth || null,
        country: country || null,
        state: state || null,
        phone: phone || null
      }, avatar)
      setUser(res.data.user)
      alert(res.message)
      router.replace("/(tabs)")

    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";

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
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>
            Create a new Account
          </Text>
        </View>

        <View style={styles.form}>

          <InputBox
            placeholder="Full Name"
            value={name}
            setValue={setName}
          />

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

          <View style={styles.section}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.field} >
              <RadioGroup
                value={gender}
                setValue={setGender}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Date of Birth</Text>
            <View style={styles.field} >
              <DatePicker
                value={dateOfBirth}
                setValue={setDateOfBirth}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Country</Text>
            <View style={styles.field} >
              <SelectBox
                value={country}
                setValue={setCountry}
                options={countryOptions}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>State</Text>
            <View style={styles.field} >
              <SelectBox
                value={state}
                setValue={setState}
                options={stateOptions}
              />
            </View>
          </View>

          <InputBox
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            setValue={(text) => {
              const cleaned = text.replace(/[^0-9]/g, '')
              setPhone(cleaned)
            }}
          />

        </View>
        <TouchableOpacity
          style={styles.uploadBtn} onPress={pickImage} >
          <Ionicons name="camera-outline" size={20} color="#fff" />
          <Text style={styles.uploadBtnText}>{avatar?"attached..":"choose avatar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitbtn} onPress={handleRegister} >
          <Text style={styles.registertxt} >{loading ? "wait..." : 'Register'}</Text>
        </TouchableOpacity>

        <Link href="/login" style={styles.btmtxt} >
          Already have an account ?<Text style={{ color: '#068ad1', fontWeight: '700' }}> Sign In</Text>
        </Link>
      </ScrollView>

    </Screen>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  header: {
    marginBottom: 10
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111"
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4
  },

  form: {
    gap: 5
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },

  label: {
    fontSize: 14,
    color: "#555",
    flex: 1
  },
  field: {
    flex: 1.2
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
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#068ad1', // match your theme
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  uploadBtnText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 14,
  },
})