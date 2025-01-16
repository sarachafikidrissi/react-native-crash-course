import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack, Tabs } from 'expo-router'
import "../global.css";

const RootLayout = () => {
  return (
    //* <Slot /> for Custom Layout
    // <>
    //   <Text>Header coming from layout</Text>
    //   <Slot />
    //   <Text>Footer coming from layout </Text> 
    // </>
    
    //*stack navigation
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
    </Stack>

    //* Nested Navigation with Tabs
    // <Tabs>
    //   <Tabs.Screen name='home' options={{ title: 'Home' }}/>
    //   <Tabs.Screen name='profile' options={{ title: 'Profile' }}/>
    // </Tabs>
  )
}

export default RootLayout
