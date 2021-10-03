import React, { useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements';

import  {AntDesign,SimpleLineIcons} from "@expo/vector-icons";
import FontAwesome from 'react-native-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight, faCoffee, faPaperPlane, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons'

import IonIcon from 'react-native-ionicons';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TextInput } from 'react-native';
import { auth, db } from '../firebase';
import { TouchableWithoutFeedback } from 'react-native';
import { TouchableWithoutFeedbackComponent } from 'react-native';
import { Keyboard } from 'react-native';

import * as firebase from 'firebase';





const ChatScreen = ({navigation,route}) => {

    const [input,setinput] =useState("");
    const [message,setmessage]=useState([]);
    const messageorientation = "desc";
    const userref =  db.collection("users").doc(auth.currentUser.email)
    const userinput = db.collection("users").doc(route.params.chatName);


    console.log(route.params)



    
const  sendMessage= ()=>{

    userref.collection("chats").doc(route.params.id).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message:input,
        displayName:auth.currentUser.displayName,
        email:auth.currentUser.email,
        photoURL:auth.currentUser.photoURL,


    }).then(
    
        (docref)=>{
            console.log( ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<",route.params.id)
            userinput.collection("chats").doc(route.params.id).collection("messages").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message:input,
                displayName:auth.currentUser.displayName,
                email:auth.currentUser.email,
                photoURL:auth.currentUser.photoURL,
        
        
            }).then(console.log("done................................"))
         }
    )

    setinput("");

}


    useLayoutEffect(() => {
       const unsubscribe=userref.collection("chats")
       .doc(route.params.id)
       .collection("messages")
       .orderBy("timestamp",messageorientation)
       .onSnapshot((snapshot)=>setmessage(

        snapshot.docs.map(doc=>({
            id:doc.id,  
            data: doc.data(),

        }))

    ))
    }, [route])
    useLayoutEffect(() => {
        
        navigation.setOptions({
            title:"Chat",
            headerBackTitleVisible  :false,
            headerTitleAlign: "left",
            headerTitle: () =>(
                <View style={{ flexDirection:"row",alignItems:"center"}}>
<<<<<<< HEAD
                        <Avatar rounded source={{uri: route.params?.photoURL && "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTogFMFhYeEuZAYDnkc-jLsGknBtkMjh9KdQ&usqp=CAU"}} />


                        {/* <Text style={{color:"white", fontweight:"700",marginLeft:10}}>{route.params.chatName}</Text>  */}
                        <Text style={{color:"white", fontWeight:"700",marginLeft:10,fontSize:20}}>{route.params.chatName}</Text> 
=======
                        <Avatar rounded source={{uri:route.params.upic}} />


                        {/* <Text style={{color:"white", fontweight:"700",marginLeft:10}}>{route.params.chatName}</Text>  */}
                        <Text style={{color:"white", fontWeight:"700",marginLeft:10,fontSize:20}}>{route.params.displayName}      </Text> 
>>>>>>> 793232cadca1689852e121fd7ac2f9f3ad95be7f
                </View>
            ),
            headerLeft: ()=>(
                <TouchableOpacity>

                    <AntDesign name="arrowleft" size={24} color="white" onPress={navigation.goBack}  style={{marginLeft:10}}  />
                </TouchableOpacity>    
            ),
            headerRight:()=>(
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:80,
                    marginRight:20

                                          

                }}>
                    <TouchableOpacity>

                      <FontAwesomeIcon icon={faVideo} size={24} color="white" />
                    </TouchableOpacity> 
                    
                    <TouchableOpacity>

                        <FontAwesomeIcon icon={faPhone} size={24} color="white" />

                    </TouchableOpacity> 
                </View>
            )

        });
        
    }, [navigation])
    return (
    <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
            <StatusBar style="light"/>
                <KeyboardAvoidingView keyboardVerticalOffset={90} behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={{paddingTop:15}} > 
                        
                        {
                           }
                            {

                         message.map(({id,data})=>(
    
                            <View key={id}>
                                {(data.email === auth.currentUser.email) ?
                                <View  style={styles.receiver}>
                                    <Avatar source={{uri: data.photoURL}} rounded size={20}
                                            position="absolute" bottom={-15} right={-5}
                                        containerStyle={{position:"absolute", bottom:-15,right: -5}} />
                                    <Text style={styles.receiverText} >{data.message}</Text>
                                </View> : <View  style={styles.sender}> 
                                <Avatar source={{uri: data.photoURL}} rounded size={20}
                                            position="absolute" bottom={-15} left={-5}
                                        containerStyle={{position:"absolute", bottom:-15,left: -5}}   />
                                    <Text style={styles.senderText} >{data.message}</Text>
                                </View>

                                }
                            </View>    
                        )) }




                    </ScrollView>
                    </TouchableWithoutFeedback>


                    <View style={styles.footer}>
                        <TextInput onChangeText={(text)=>{setinput(text)}}
                        value={input}
                        style={styles.textInput}
                        onSubmitEditing={sendMessage}
                        placeholder="New Message" />

                        <TouchableOpacity activeOpacity={0.5}>
                            <FontAwesomeIcon icon={faPaperPlane} size={24} onPress={sendMessage} color="blue"  />
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        marginBottom:10,
        
    },

    textInput:{
        color:"black",
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:"transparent",
        backgroundColor:"#ECECEC",
        borderWidth:1,
        padding:10,
        color:"gray",
        borderRadius:30,

        
    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:10,
        paddingBottom:20,
    },
    receiverText:{ 

    color:"black",
    marginLeft:15,
    marginBottom:15,
    fontWeight:"500",
    fontSize:15},

    senderText:{
        color:"white",
        marginLeft:15,
        marginBottom:15,
        fontWeight:"500",
        fontSize:15
    },
    receiver:{
        padding:10,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    sender:{
        padding:10,
        backgroundColor:"#2868E6",
        alignSelf:"flex-start",
        borderRadius:20,
        marginLeft:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    senderName:{
        left:10,
        paddingRight:10,
        color:"white",
        fontSize:10
    },

})
