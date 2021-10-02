import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';

const app = initializeApp({
    apiKey: "AIzaSyD3ZmT30HE47Aw2bvGWwo5dDQN1Cdc54aQ",
    authDomain: "weconnect-dev-de5dc.firebaseapp.com",
    databaseURL: "https://weconnect-dev-de5dc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "weconnect-dev-de5dc",
    storageBucket: "weconnect-dev-de5dc.appspot.com",
    messagingSenderId: "86347457916",
    appId: "1:86347457916:web:7a22397e6de6ec76cfb0f9"
});

export const auth = getAuth(app);
