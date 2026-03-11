import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Picker } from "@react-native-picker/picker"

type SelectBoxProps = {
    value: string
    setValue: (value: string) => void
    options: { label: string; value: string }[]
}


const SelectBox = ({ value, setValue, options }: SelectBoxProps) => {
    return (
        <View style={styles.container}>
            <Picker
                selectedValue={value}
                onValueChange={(itemValue) => setValue(itemValue)}
            >

                {options.map((item, index) => (
                    <Picker.Item
                        key={index}
                        label={item.label}
                        value={item.value}
                    />
                ))}

            </Picker>
        </View>
    )
}

export default SelectBox

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
    }
})