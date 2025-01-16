import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const RootLayout = () => {
  return (
    // <>
    //   <Text>Header coming from layout</Text>
    //   <Slot />
    //   <Text>Footer coming from layout </Text> 
    // </>

    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
    </Stack>
  )
}

export default RootLayout
