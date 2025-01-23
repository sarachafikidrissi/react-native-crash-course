import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";


const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {

    if(!form.username || !form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
       // set it to globale state using context
      setUser(result)
      setIsLoggedIn(true)
       //^ after sign up let user go to home screen
       router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false);
    }
    createUser();
    
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
            value={form.username}
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
          <CustomButton title="Sign Up" handlePress={submit} containerStyles="mt-7" />
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