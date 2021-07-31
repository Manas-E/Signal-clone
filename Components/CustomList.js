import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

import { useEffect, useState } from 'react'


import { auth, db } from '../firebase'








const CustomListItem = ({id,chatName,enterChat}  )=>{

    const [chatmessages,setchatmessages] =useState([]);
    const userref =  db.collection("users").doc(auth.currentUser.email)


    useEffect(()=>{
            const unsubscribe = userref.collection("chats").doc(id).collection("messages").orderBy("timestamp","desc")
            .onSnapshot(snapshot =>{
                setchatmessages(snapshot.docs.map((doc)=>doc.data()))

            }

            )

            return unsubscribe;
    },[])
    console.log(chatName,"==========================");

        return (
            <ListItem key={id} onPress={()=>enterChat({id,chatName})} style={{backgroundColor:undefined}} bottomDivider>
                <Avatar  rounded source={{
                    uri: chatmessages[0]?.photoURL         || "https://i.picsum.photos/id/404/200/300.jpg?hmac=1i6ra6DJN9kJ9AQVfSf3VD1w08FkegBgXuz9lNDk1OM"
                }} />

        <ListItem.Content>
        <ListItem.Title style={{fontWeight:"800"}}>{chatmessages[0]?.displayName}</ListItem.Title>
       <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">{chatmessages[0]?.displayName} : {chatmessages[0]?.message}</ListItem.Subtitle>
        </ListItem.Content>    

        </ListItem>
        )
    
}

export default CustomListItem
