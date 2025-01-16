import React from "react";
import { Pressable, Text, TouchableOpacity } from "react-native";

const NewScreen = () => {
  return (
    <>
      <Text>Hello from New Screen</Text>
      <Pressable ><Text>submit</Text> </Pressable>
      <TouchableOpacity><Text>submit</Text></TouchableOpacity>
    </>
  );
};

export default NewScreen;
