import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Screen from '@/components/Screen'
import InputBox from '@/components/form/InputBox'
import SelectBox from '@/components/form/SelectBox'
import DatePicker from '@/components/form/DatePicker'
import RadioGroup from '@/components/form/RadioGroup'
import { countryOptions, stateOptions } from '@/constants/locationOptions'
import { Link, useRouter } from "expo-router";
import { RegisterUser } from '@/services/authService'
import { SaveTokens} from '@/utils/storage'
import { AuthContext } from '@/context/AuthContext'
import { setAuthToken } from '@/services/api'

const SignUp = () => {

  const { setUser } = useContext(AuthContext)
  const router = useRouter();

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [dateOfBirth, setDateOfBirth] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleRegister = async () => {
    if (!name || !email || !password || !gender) {
      alert("Name, Email, Password and Gender are required")
      return
    }
    try {
      setLoading(true)
      const response = await RegisterUser({
        name,
        email,
        password,
        gender,
        dateOfBirth: dateOfBirth || null,
        country: country || null,
        state: state || null,
        phone: phone || null
      })
      const { user, accessToken, refreshToken } = response.data.data
      const message = response.data.message
      setUser(user)
      await SaveTokens(accessToken, refreshToken)
      setAuthToken(accessToken); 
      router.replace('/(tabs)/Index');
      alert(message)

    } catch (error: any) {
      const message = error?.response?.data?.message || "Registration failed"

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
        <TouchableOpacity style={styles.submitbtn} onPress={handleRegister} >
          <Text style={styles.registertxt} >{loading ? "wait..." : 'Register'}</Text>
        </TouchableOpacity>
        <Link href="/SignIn" style={styles.btmtxt} >
          Already have an account ?<Text style={{ color: '#068ad1', fontWeight: '700' }}> Sign In</Text>
        </Link>
      </ScrollView>

    </Screen>
  )
}

export default SignUp

const styles = StyleSheet.create({

  container: {
    padding: 20,
    paddingBottom: 40
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
  }
})