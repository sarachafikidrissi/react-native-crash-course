import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full space-x-4 flex-row h-16 bg-black-100 px-4 border-2 border-black-200 rounded-2xl focus:border-secondary items-center">
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />
  
        <TouchableOpacity >
          <Image
            source={icons.search}
            className="h-5 w-5"
            resizeMode="contain"
          />
        </TouchableOpacity>

    </View>
  );
};

export default SearchInput;
