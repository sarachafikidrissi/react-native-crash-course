import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from '../components/CustomButton'
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4 ">
      <Image
        source={images.empty}
        className="w-[270px] h-[216px]"
        resizeMode="contain"
      />
      <Text className="text-xl font-psemibold text-white mt-2">{title}</Text>
      <Text className="text-sm font-pmedium text-gray-100">{subtitle}</Text>

      <CustomButton 
        title="Create a video"
        handlePress={() => router.push('/create')}
        containerStyles='w-full my-5'
      />
    </View>
  );
};

export default EmptyState;
