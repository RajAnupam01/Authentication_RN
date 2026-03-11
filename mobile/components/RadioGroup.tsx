import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

type GenderBoxProps = {
  value: string
  setValue: (value: string) => void
}

const RadioGroup = ({ value, setValue }: GenderBoxProps) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() => setValue("male")}
      >
        <Text>{value === "male" ? "🔵 Male" : "⚪ Male"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setValue("female")}
      >
        <Text>{value === "female" ? "🔵 Female" : "⚪ Female"}</Text>
      </TouchableOpacity>

    </View>
  )
}

export default RadioGroup

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    gap:20,
    marginVertical:8
  }
})