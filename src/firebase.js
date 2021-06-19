import firebase from 'firebase' 

const firebaseConfig = {
    apiKey: "AIzaSyDqWOnw0BAGl9ACSjlbDVyy6bDhsivAO-Q",
    authDomain: "chat-app-91a2d.firebaseapp.com",
    databaseURL: "https://chat-app-91a2d-default-rtdb.firebaseio.com",
    projectId: "chat-app-91a2d",
    storageBucket: "chat-app-91a2d.appspot.com",
    messagingSenderId: "24591466847",
    appId: "1:24591466847:web:4694c81de70037e9d876ea",
    measurementId: "G-YCE5ZE5K7F"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  export {db,auth};

