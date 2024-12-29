import firebase from 'firebase' 
const firebaseConfig ={
    /*apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID*/
  /*apiKey: "AIzaSyBaq-PKKfOFX8X1fwiZALIVddjyge1CKt8",
  authDomain: "ea360app.firebaseapp.com",
  projectId: "ea360app",
  storageBucket: "ea360app.appspot.com",
  messagingSenderId: "212189404266",
  appId: "1:212189404266:web:bd88efc25bc8c0b7d13e13"*/
  /*apiKey: "AIzaSyB3SWMhD-PEMSylW3Wp-5qiaNVoZXonkgw",
  authDomain: "healhaitiproject.firebaseapp.com",
  databaseURL: "https://healhaitiproject-default-rtdb.firebaseio.com",
  projectId: "healhaitiproject",
  storageBucket: "healhaitiproject.appspot.com",
  messagingSenderId: "184199980189",
  appId: "1:184199980189:web:fae180f4dbfd6d4b272074",
  measurementId: "G-CESBTXN93J"*/
  /*apiKey: "AIzaSyAKowpDs2LNmPx5Ee6D7NZ4fkP8lsFY6_8",
  authDomain: "ramtournamentweb.firebaseapp.com",
  projectId: "ramtournamentweb",
  storageBucket: "ramtournamentweb.firebasestorage.app",
  messagingSenderId: "232005958535",
  appId: "1:232005958535:web:8fa9010558eb89e0d1f122",
  measurementId: "G-7Y9LRY0QH4"*/
  apiKey: "AIzaSyDgGbJWBJS9fSxbcyqSr9Geu0_XLbA2h_4",
  authDomain: "ramtournamentsweb.firebaseapp.com",
  databaseURL: "https://ramtournamentsweb-default-rtdb.firebaseio.com",
  projectId: "ramtournamentsweb",
  storageBucket: "ramtournamentsweb.firebasestorage.app",
  messagingSenderId: "555460420523",
  appId: "1:555460420523:web:b1883958b636a6b4ad68ee",
  measurementId: "G-BB7RGVWESE"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  export default firebase;