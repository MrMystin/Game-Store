import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import ProfileScreen from './src/screens/accountScreen';

export default function App() {
  return (
    <ProfileScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
;