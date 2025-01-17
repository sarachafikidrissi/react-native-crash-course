import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const submit = () => {
    console.log("submit");
    
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="justify-center min-h-[85vh] w-full px-4 my-6 ">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />
          <Text className="text-white text-2xl font-psemibold text-semibold mt-10">
            Sign Up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyBoardType="username"
            placeholder="Your Unique Username"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyBoardType="email-address"
            placeholder="Enter Your Email"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="Enter Your Password"
          />
          <CustomButton title="Sign In" handlePress={submit} containerStyles="mt-7" />
          <View className="flex-row justify-center items-center pt-5 gap-2">
            <Text className="text-gray-100 font-pregular text-lg">Already have an account?</Text>
            <Link href={'/sign-in'} className="text-secondary font-psemibold text-lg">Sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp