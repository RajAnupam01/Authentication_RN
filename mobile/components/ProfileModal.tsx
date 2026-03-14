import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type ProfileMoadlProps = {
    visible: boolean,
    onclose: () => void,
    user?: {
        name?: string,
        email?: string,
        gender?: string,
        avatar?: string,
        country?: string,
        dateOfBirth?: string,
        state?: string,
        phone?: string
    }
}

const ProfileModal = ({ visible, onclose, user }: ProfileMoadlProps) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType='fade'
        >
            <View style={styles.container} >
                <Pressable
                    style={styles.overlay}
                    onPress={onclose}
                >
                </Pressable>
                <View style={styles.card} >
                    {user?.avatar ? <Image source={{ uri: user.avatar }} style={styles.avatar} /> : <Image source={{ uri: "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_rp_progressive&w=740&q=80" }} style={styles.avatar} />}
                    <Text>Name: {user?.name}</Text>
                    <Text>Email: {user?.email}</Text>
                    <Text>Gender: {user?.gender}</Text>
                    {user?.dateOfBirth && <Text>DOB: {user.dateOfBirth}</Text>}
                    {user?.country && <Text>Country: {user.country}</Text>}
                    {user?.state && <Text>State: {user.state}</Text>}
                    {user?.phone && <Text>Phone: {user.phone}</Text>}
                </View>
            </View>
        </Modal>
    )
}
export default ProfileModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)"
  },

  card: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8
  },

  avatar: {
    width: 280,
    height: 280,
    borderRadius: 50,
    marginBottom: 15
  },

  name: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 4
  },

  email: {
    fontSize: 14,
    color: "gray",
    marginBottom: 15
  },

  infoRow: {
    width: "100%",
    marginTop: 6
  },

  label: {
    fontWeight: "600"
  }
})