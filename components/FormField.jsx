import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import {icons} from '../constants'

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
    const [showPassword, setShowPassword] = useState(false)  
 
  return (
    <View className={`gap-y-2 ${otherStyles}`}>
      <Text className="text-gray-100 text-base font-pmedium">{title}</Text>
      <View className="w-full flex-row h-16 bg-black-100 px-4 border-2 border-black-200 rounded-2xl focus:border-secondary items-center">
        <TextInput 
            className="flex-1 text-white font-semibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
        />
        {(title === 'Password') && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={!showPassword ? icons.eye : icons.eyeHide} className="h-6 w-6" resizeMode="contain"/>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
