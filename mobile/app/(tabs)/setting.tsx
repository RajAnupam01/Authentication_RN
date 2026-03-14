import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Screen from '@/components/Screent'
import { AuthContext } from '@/context/authContext'

import InputBox from '@/components/InputBox'
import SelectBox from '@/components/SelectBox'
import DatePicker from '@/components/DatePicker'
import RadioGroup from '@/components/RadioGroup'
import { countryOptions, stateOptions } from '@/constants/locationOptions'
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { UpdateUser } from '@/services/authApi'
import { router } from "expo-router"

const Setting = () => {

  const { user, setUser, } = useContext(AuthContext)

  const [name, setName] = useState<string>(user.name)
  const [email, setEmail] = useState<string>(user.email)
  const [gender, setGender] = useState<string>(user.gender)
  const [dateOfBirth, setDateOfBirth] = useState<string>(user.dateOfBirth || "")
  const [country, setCountry] = useState<string>(user.country || "")
  const [state, setState] = useState<string>(user.state || "")
  const [phone, setPhone] = useState<string>(user.phone || "")
  const [loading, setLoading] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<any>(null);
  

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.7,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0]);
    }
  };

  const hasChanges = () => {
    return (
      name !== user.name ||
      email !== user.email ||
      gender !== user.gender ||
      dateOfBirth !== user.dateOfBirth ||
      country !== (user.country || "") ||
      state !== (user.state || "") ||
      phone !== (user.phone || "") ||
      avatar !== null
    )
  }



  const handleUpdate = async () => {
    if (!hasChanges()) {
      alert("No changes to update!");
      return; 
    }

    try {
      setLoading(true)
      const res = await UpdateUser({
        name,
        email,
        gender,
        dateOfBirth,
        country,
        state,
        phone
      }, avatar)

      setUser(res.data)
      alert(res.message)
      router.replace("/(tabs)")

    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Update failed";

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
          <Text style={styles.title}>Update Your Profile</Text>

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
          <Text style={styles.uploadBtnText}>{avatar ? "attached.." : "update avatar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.submitbtn,!hasChanges() && {opacity:0.5}]} onPress={handleUpdate} disabled={!hasChanges} >
          <Text style={styles.registertxt} >{loading ? "wait..." : 'Update'}</Text>
        </TouchableOpacity>

      </ScrollView>

    </Screen>
  )
}

export default Setting

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  header: {
    marginBottom: 10,
    marginTop:25
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111"
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