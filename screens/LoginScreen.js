import React, { useEffect } from 'react'
import {StyleSheet, View, Text ,KeyboardAvoidingView} from 'react-native'
import { StatusBar } from "expo-status-bar"
import { Image , Input , Button } from 'react-native-elements'
import { useState } from 'react'
import { auth } from '../firebase'

const LoginScreen = ({navigation}) => {


const [email,setemail]=useState("");
const [password,setpassword]=useState("");

useEffect(()=>{
  const unsubscribe = auth.onAuthStateChanged((authuser)=>{
    console.log(authuser);
    

        if(authuser){
          navigation.replace("Home");
        }
    
  });

return unsubscribe;  
},[]);


const signin =()=>{
  auth.signInWithEmailAndPassword(email,password).catch((e)=>{alert(e)});
}


    return (
        <View behavior="padding" style={styles.container}>
            <StatusBar style="light"  />
            <Image source={{uri: "https://img-premium.flaticon.com/png/128/560/premium/560860.png?token=exp=1633290926~hmac=f359aca69f9c8f540ba56580f0d25500"}}
            style={{width:120,height:120,marginTop:40,
            }} />
        
        
          <View style={styles.inputContainer}>
          <Input type="email" placeholder="Email" value={email}  autoFocus onChangeText={(text)=>{setemail(text)}}/>
          <Input type="password" placeholder="Password" value={password} secureTextEntry onChangeText={(text)=>{setpassword(text)}}/>  

          </View>
          <Button  color="#ff5c5c" title="Login" containerStyle={styles.button} onPress={signin}/>
          <Button title="Register" onPress={()=>{navigation.navigate("Register")}} containerStyle={styles.button } type="outline"></Button>
          <View style={{height:10}}></View>
        </View>
        
    )
}



const styles = StyleSheet.create({

  container:{
    flex: 1,
    alignItems: 'center',
   
    justifyContent:"center",
    backgroundColor:"white" ,
    padding:10,
  },
  

    inputContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width:300,


    },

    button :{
      width:200,
      marginTop:10,
    },

  });

export default LoginScreen
