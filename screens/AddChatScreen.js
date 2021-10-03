import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';

import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Input } from 'react-native-elements/dist/input/Input';
import { auth, db } from '../firebase';

    const AddChatScreen = ({navigation}) => {

        const [input,setinput]=useState("");
        const [chatRoomId,setChatRoomId]=useState();

        const createChat= async ()=>{
            const userinput =  db.collection("users").doc(input)

            const userref =  db.collection("users").doc(auth.currentUser.email)
            await userinput.get().then(
                (doc)=>{
                    console.log(doc.data(),"<-------------- this is added");
                    if(doc.exists)
                    {
                        userref.collection("chats").add({
<<<<<<< HEAD
                            chatName: doc.data().displayName,
=======
                            chatName: doc.data().uname,
>>>>>>> 793232cadca1689852e121fd7ac2f9f3ad95be7f
                        }).then((docref)=>{
                            setChatRoomId(docref.id);
                            console.log(docref.id,"*************************************")
                            userinput.collection("chats").doc(docref.id).set({chatName: auth.currentUser.displayName});
                            navigation.goBack();
                            console.log("===========================","added")
                        }).catch((e)=>{alert(e)});

                    }
                    else{
                        alert("User does not exists! Please enter a valid email");
                    }
                }
            )

        }

    useLayoutEffect(() => {

        navigation.setOptions({

            title:"New Chat",
            headerBackTitle:"Chats",



                }); 




    }, [navigation])

    return (
        <View >
            <Input placeholder="Enter a email"        
            value={input}
            onChangeText={(text)=>{setinput(text)}} 
            leftIcon={<Icon name="wechat" type="antdesign" size={24} color="black" />}/>

            <Button disabled={!input} title="Create new Chat" onPress={createChat} containerStyle={styles.button } />

        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({})
