import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'

type DatePickerProps = {
  value: string
  setValue: (value: string) => void
}

const DatePicker = ({ value, setValue }: DatePickerProps) => {

  const [show, setShow] = useState(false)

  return (
    <View>

      <TouchableOpacity
        style={styles.box}
        onPress={() => setShow(true)}
      >
        <Text>{value || "Select Date of Birth"}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShow(false)

            if (selectedDate) {
              setValue(selectedDate.toDateString())
            }
          }}
        />
      )}

    </View>
  )
}

export default DatePicker

const styles = StyleSheet.create({
  box:{
    borderWidth:1,
    borderColor:"#ccc",
    padding:12,
    borderRadius:8,
    marginVertical:8
  }
})