import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  initialQuery,
  ...props
}) => {
  const pathname = usePathname(); //* this returns the current URL pathname

  
  const [query, setQuery] = useState(initialQuery || ""); //* to set the searched word


  return (
    <View className="w-full space-x-4 flex-row h-16 bg-black-100 px-4 border-2 border-black-200 rounded-2xl focus:border-secondary items-center">
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );
          }
          //* No navigation happens, just an update to the query parameter.
          if (pathname.startsWith("/search")) {
            //* User is on /search
            router.setParams({ query }); //* update the URL query parameters without navigating to a new page.
          } else { 
            //* User is NOT on /search , Navigate to the search page
            router.push(`/search/${query}`); //*This changes the screen completely. 
          }
        }}
      >
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
