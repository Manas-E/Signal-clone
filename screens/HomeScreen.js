import React, { Component, useEffect, useLayoutEffect } from 'react'
import { SafeAreaView,TouchableOpacity } from 'react-native';
import {StyleSheet, ScrollView, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements';
import CustomListItem from '../Components/CustomList';
import { auth, db } from '../firebase'

import  {AntDesign,SimpleLineIcons} from "@expo/vector-icons";
import { useState } from 'react';




export default function HomeScreen({navigation}) {

    const [chats,setchats]= useState([]);
    const userref =  db.collection("users").doc(auth.currentUser.email)

    const signOut =()=>{
        auth.signOut().then(
        navigation.replace("Login") )

    
    }
    
    useEffect(() => {
        const unsubscribe = userref.collection("chats").onSnapshot((snapshots)=>{

            setchats(snapshots.docs.map((doc)=>({
                id:doc.id,
                data:doc.data(),
            })))

            })
        
        return unsubscribe;
    }, [navigation])

const enterChat =({id,chatName})=>{
  
    navigation.navigate("Chat",{
        id:id,
        chatName:chatName,
        displayName:auth.currentUser.displayName,
    })

}


useLayoutEffect(()=>{

    navigation.setOptions({
        title:"Signal",
        headerStyle:{backgroundColor:"#fff"},
        headerTitleStyle: {color: "black", alignSelf:"center"},
        headerTintColor: "black",
        headerLeft: ()=>(
            <View style={{marginLeft:20,backgroundColor:undefined}}>
                    <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
                    <Avatar  rounded  source={{uri:  auth?.currentUser.photoURL || "https://i.picsum.photos/id/404/200/300.jpg?hmac=1i6ra6DJN9kJ9AQVfSf3VD1w08FkegBgXuz9lNDk1OM"}} />
                    </TouchableOpacity>
            </View>  
        ),
        headerRight: ()=>(
            <View style={{flexDirection:"row",marginRight:20,justifyContent:"space-between",width:80}}>
            <TouchableOpacity>
                <AntDesign name="camerao" size={24} color="black" /> 
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate("AddChat")}}>
                <SimpleLineIcons name="pencil" size={24} color="black" />
            </TouchableOpacity>
            </View> 
        ),
   });

},[]);

console.log("=====================*********************",chats);

        return (
            <SafeAreaView>
                <ScrollView>

                    {chats.map(({id,data:{chatName}}) =>(
      
                    <CustomListItem key={id} id={id} chatName={chatName} style={styles.container} enterChat= {enterChat} />
                    )

                    )}
                </ScrollView>
            </SafeAreaView>
        )
}


const styles = StyleSheet.create({
    container:{
        height:"100%",

    }
})
