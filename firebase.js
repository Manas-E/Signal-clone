
import * as firebase from 'firebase'

import "firebase/auth";
import "firebase/database";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDd-72sPLupD0fHBSxUDJE1i7OMNGUvnqY",
    authDomain: "signal-clone-da27d.firebaseapp.com",
    projectId: "signal-clone-da27d",
    storageBucket: "signal-clone-da27d.appspot.com",
    messagingSenderId: "162990650019",
    appId: "1:162990650019:web:e0eaaeb250cbc87ffe4516"
  };



  if(firebase?.apps?.length===0){

    app=firebase.initializeApp(firebaseConfig);

  }
  else{
    app=firebase.app();
  }
  

  const db = firebase.firestore();
  const auth = firebase.auth();

  export {db,auth};
  
