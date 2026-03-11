import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

type InputBoxType = {
    value: string,
    setValue: (text: string) => void
    placeholder?: string
    keyboardType?: any,
    secureTextEntry?: any

}


const InputBox = ({ keyboardType, secureTextEntry, value, placeholder, setValue }: InputBoxType) => {
    return (
        <View>
            <TextInput
                style={styles.inputbox}
                autoCorrect={false}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={(text => setValue(text))}
                placeholder={placeholder}
            />
        </View>
    )
}

export default InputBox

const styles = StyleSheet.create({
    inputbox: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        marginVertical: 6
    }
})