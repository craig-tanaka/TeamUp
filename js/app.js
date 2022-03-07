// Firebase (database & user authentication) app, api configuration details
const firebaseConfig = {
    apiKey: "AIzaSyBrFyTyoLEkb1utep1c39-r6cxb55jy3Zc",
    authDomain: "teamup-2022.firebaseapp.com",
    projectId: "teamup-2022",
    storageBucket: "teamup-2022.appspot.com",
    messagingSenderId: "945379313472",
    appId: "1:945379313472:web:f9e08ba84acdf95b515ca5"
};

// Initialize Firebase app and database
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();