import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {

  const { isLoggedIn, isLoading } = useGlobalContext();
  console.log(isLoggedIn);
  

  //^ redirect user to home in case he is already logged in instead of rediricting him to onboading screen 
  if (isLoggedIn && !isLoading) return <Redirect href="/home"/>
  return (
    // <View  className="flex-1 justify-center items-center">
    //   <Text className="text-3xl font-pblack" >Index.js file</Text>
    //   <StatusBar style="auto" />
    //   <Link href={"/home"} style={{ color: 'blue' }}>Go to home</Link>
    // </View>
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center min-h-[85vh] w-full px-4">
          <Image
            source={images.logo}
            className="w-[115px] h-[34.07px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="w-max-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-white text-[30px] font-psemibold leading-[36px] text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-center text-[14px] text-[#CDCDE0] mt-7  font-pregular">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton 
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')} //* router.push allows us to go to next screen  in this case sign-in
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"/> //* when the device is on dark mode it gives the status bar ligh style so stuff on top are visible
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
