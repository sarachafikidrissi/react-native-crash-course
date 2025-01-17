import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, SplashScreen, Stack, Tabs } from 'expo-router'
import "../global.css";
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync(); //* keeps the splash screen visible until assets finish loading.
const RootLayout = () => {
  //* useFonts hook is used to loads custom font from the 'assets/font' folder
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  })

  useEffect(() => {
    if (error) throw error;

    //* SplachScreen is the initial screen that appears when a mobile app is launched while assets like fonts, images, or data load in the background.
    if (fontsLoaded) SplashScreen.hideAsync(); //* hideAsync() hides the splash screen when the app is ready.

  }, [fontsLoaded, error])

  if (!fontsLoaded && !error){
    return null;
  }
  return (

    //*stack navigation
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>

    //* <Slot /> for Custom Layout
    // <>
    //   <Text>Header coming from layout</Text>
    //   <Slot />
    //   <Text>Footer coming from layout </Text> 
    // </>
    //* Nested Navigation with Tabs
    // <Tabs>
    //   <Tabs.Screen name='home' options={{ title: 'Home' }}/>
    //   <Tabs.Screen name='profile' options={{ title: 'Profile' }}/>
    // </Tabs>
  )
}

export default RootLayout
