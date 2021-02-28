import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAq9KmdQs36rX6mAeMTb32kwqzAv_H_xRY",
    authDomain: "datamahasiswa-138b4.firebaseapp.com",
    projectId: "datamahasiswa-138b4",
    storageBucket: "datamahasiswa-138b4.appspot.com",
    messagingSenderId: "191889174095",
    appId: "1:191889174095:web:ea1484c9dc03e8271c843a"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const db = firebaseApp.firestore();
  export const auth = firebaseApp.auth();
