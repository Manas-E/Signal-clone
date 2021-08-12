import React, { useLayoutEffect } from 'react'
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native'
import { StatusBar } from "expo-status-bar"
import { Image , Input , Button ,Text } from 'react-native-elements'
import { useState } from 'react'
import { auth, db } from '../firebase'

export default function RegisterScreen({navigation})  {

    const [name,setname]=useState("");
    const [password,setpassword]=useState("")
    const [email,setemail]=useState("");
    const [proURL,setproURL]=useState("");


    useLayoutEffect(() => {

        navigation.setOptions({
            headerBackTitle:"Back to Login",
        });


    },[navigation]);

    const register= ()=>{
        auth.createUserWithEmailAndPassword(email,password)
        .then((authuser)=>{
            console.log(authuser.user,"====",name,proURL)
            const userref =  db.collection("users").doc(authuser.user.email)

           userref.set({uid:authuser.user.email,uname:name,upic: proURL}).then(()=>{
                    console.log("===========================","added")
                }).catch((e)=>{alert(e)});
            
            authuser.user.updateProfile(
                {
                    displayName:name,
                    photoURL: proURL,

                }
                    
              
                ).then(()=>{console.log("updated ................")})
                
        })  
        .catch((e)=>{alert(e)})}
    {
        return (
            <KeyboardAvoidingView behaviour="padding" style={styles.container}>
                <StatusBar style="light"  />

                <Text h3 style={{marginBottom:30,alignSelf:"center"}}>Create Your Account</Text>
                <View style={styles.inputContainer}>

                    <Input placeholder="Full Name" type="text" value={name} autofocus onChangeText={(text)=>{setname(text)}}  />

                    <Input type="password" placeholder="Password" value={password} secureTextEntry                               onChangeText={(text)=>{setpassword(text)}}/> 

                    <Input type="email" placeholder="Email" value={email} onChangeText={(text)=>{setemail(text)}}/>
                    
                    <Input type="text" placeholder="Profile pic URL"
                     value={proURL} onChangeText={(text)=>{setproURL(text)}}  />
                </View>

                <Button title="Register" onPress={register} containerStyle={styles.button }></Button>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white" ,
        padding:10,
      },
    
      
      button :{
        width:200,
        marginTop:10,
        alignSelf:"center",
      },
      inputContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width:300,
      },
  
    });


