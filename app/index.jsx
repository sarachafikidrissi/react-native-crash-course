import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router'

export default function App() {
  return (
    <View  className="flex-1 justify-center items-center">
      <Text >Index.js file</Text>
      <StatusBar style="auto" />
      <Link href={"/profile"} style={{ color: 'blue' }}>Go to profile</Link>
    </View>
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
