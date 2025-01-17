import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress} 
      activeOpacity={0.7} //* adjust opacity of button once it's pressed
      disabled={isLoading} //* when loading is true the button will be disabled 
      className={`bg-secondary rounded-xl min-h-[62px] items-center justify-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
