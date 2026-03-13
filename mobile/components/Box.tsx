import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo'

type Boxitem = {
  size: number,
  color: string,
  icon: string,
  iconLib: React.ElementType,
  title: string,
  subtitle: string
}

const Box = ({ size, color, icon, iconLib: IconLib, title, subtitle }: Boxitem) => {
  return (
    <View style={styles.box}>
      <View style={styles.subBox}>
        
        <IconLib name={icon} size={size} color={color} />

        <View>
          <Text style={styles.boxTitle}>{title}</Text>
          <Text style={styles.boxSub}>{subtitle}</Text>
        </View>
      </View>

      <Entypo name="chevron-right" size={22} color="gray" />
    </View>
  )
}

export default Box

const styles = StyleSheet.create({
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