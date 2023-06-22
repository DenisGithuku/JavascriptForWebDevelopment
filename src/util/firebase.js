import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDcZ6uhRPkGz95PZsmJ61ZiSvx1YcwEhWs",
    authDomain: "js-firebase-db967.firebaseapp.com",
    projectId: "js-firebase-db967",
    storageBucket: "js-firebase-db967.appspot.com",
    messagingSenderId: "1006497506790",
    appId: "1:1006497506790:web:ee70fc8db118e34a876227",
    measurementId: "G-S0FWMZE7TM"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default db
