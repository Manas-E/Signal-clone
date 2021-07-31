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
            <Image source={{uri: "data:image/jpeg;base64,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"}}
            style={{width:120,height:120,marginTop:10,
            }} />
        
        
          <View style={styles.inputContainer}>
          <Input type="email" placeholder="Email" value={email}  autoFocus onChangeText={(text)=>{setemail(text)}}/>
          <Input type="password" placeholder="Password" value={password} secureTextEntry onChangeText={(text)=>{setpassword(text)}}/>  

          </View>
          <Button title="Login" containerStyle={styles.button} onPress={signin}/>
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
