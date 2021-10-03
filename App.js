import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

export default function App() {
  
const Stack = createStackNavigator();

const globalScreenOptions={
  headerStyle:{backgroundColor:"#F34573"},
  headerTitleStyle:{color:"white",alignSelf: 'center' },
  headerTintColor:"white",
  
}

  return (
<NavigationContainer style={styles.container}>
<Stack.Navigator initialRouteName="Login"      screenOptions={globalScreenOptions}>
  
  <Stack.Screen name="Login" component={LoginScreen}  style={{flex:1,alignItems:"center",justifyContent:"center"}}  />
  
  <Stack.Screen name="Register" component={RegisterScreen}  style={{alignItems:"center",justifyContent:"center"}}  />
  <Stack.Screen name="Home" component={HomeScreen}  style={{alignItems:"center",justifyContent:"center"}}  />
  <Stack.Screen name="AddChat" component={AddChatScreen}  style={{alignItems:"center",justifyContent:"center"}}  />
  <Stack.Screen name="Chat" component={ChatScreen}  style={{alignItems:"center",justifyContent:"center"}}  />

    

</Stack.Navigator>
</NavigationContainer>  );
}

const styles = StyleSheet.create({
  container: {
  
    alignItems: 'center',
    justifyContent: 'center',
   
  },
});
