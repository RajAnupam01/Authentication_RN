import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Screen from '@/components/Screent'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { AuthContext } from '@/context/authContext'
import Box from '@/components/Box'
import ProfileModal from '@/components/ProfileModal'
import { Alert } from 'react-native'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { router } from "expo-router"

const Index = () => {

  const { user,logout } = useContext(AuthContext)

  const title = user?.gender === "female" ? "Miss" : "Mr"

  const [isModalOpen, setModalOpen] = useState(false)

  const openProfileModal = () =>{
    setModalOpen(true)
  }

  const openMsg = () =>{
    Alert.alert("This feature is coming soon.")
  }

    const handleLogout = async () => {
      await logout()
      router.replace("/(auth)/login")
    }
  return (
    <Screen>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Home</Text>

          <View style={styles.headerIcon}>
            <FontAwesome name="bell-o" size={22} color="white" />
           <TouchableOpacity onPress={handleLogout} >
            <SimpleLineIcons name="logout" size={24} color="white" />
           </TouchableOpacity>
          </View>
        </View>

        {/* MAIN CARD */}
        <View style={styles.card}>

          <Text style={styles.cardMainTxt}>Welcome 👋</Text>

          {/* USER INFO */}
          <View style={styles.userSection}>

            {user?.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarLetter}>
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </Text>
              </View>
            )}

            <View>
              <Text style={styles.userName}>
                {user?.gender === "female" ? "Miss" : "Mr"} {user?.name}
              </Text>

              <Text style={styles.userEmail}>
                {user?.email}
              </Text>
            </View>

          </View>

          {/* BACKGROUND IMAGE */}
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/blue-mountains-landscape_23-2148279561.jpg",
            }}
            style={styles.bgImg}
          />

          {/* MENU OPTIONS */}

    

            <Box
            iconLib={FontAwesome}
            icon="user-circle-o"
            color="#068ad1"
            size={28}
            title="My Profile"
            subtitle="View and edit profile"
            onPress = {openProfileModal}
            />
            <ProfileModal visible={isModalOpen} onclose={()=>setModalOpen(false)} user={user} />


            <Box
            iconLib={FontAwesome}
            icon="bell"
            color="#e8cb27"
            size={28}
            title="Notifications"
            subtitle="Check the latest update"
            onPress={openMsg}
            />

            <Box
            iconLib={FontAwesome}
            icon="search"
            color="#068ad1"
            size={28}
            title="Explore"
            subtitle="Discover the new"
            onPress={openMsg}
            />


        </View>
      </View>
    </Screen>
  )
}

export default Index

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#068ad1",
  },

  header: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTxt: {
    fontSize: 24,
    color: "white",
    fontWeight: "700",
  },

  headerIcon: {
    flexDirection: "row",
    gap: 15,
  },

  card: {
    flex: 1,
    backgroundColor: "#faf8f8",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  cardMainTxt: {
    fontSize: 30,
    fontWeight: "800",
  },

  userSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    gap: 15,
  },

  avatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "#068ad1",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarLetter: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  userName: {
    fontSize: 20,
    fontWeight: "700",
  },

  userEmail: {
    fontSize: 14,
    color: "gray",
  },

  bgImg: {
    marginVertical: 20,
    height: 150,
    width: "100%",
    borderRadius: 15,
  },

  box: {
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "white",
    elevation: 2,
  },

  subBox: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  boxTitle: {
    fontWeight: "600",
    fontSize: 16,
  },

  boxSub: {
    fontSize: 12,
    color: "gray",
  },

})