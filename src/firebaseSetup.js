// Initialize Firebase
import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAhE8YQh7FVqC5f-YKAl4UAo_DBigqK6Wc",
    authDomain: "auth-test-bc11d.firebaseapp.com",
    databaseURL: "https://auth-test-bc11d-default-rtdb.firebaseio.com",
    projectId: "auth-test-bc11d",
    storageBucket: "auth-test-bc11d.appspot.com",
    messagingSenderId: "669004601712",
    appId: "1:669004601712:web:937d803c5d066ee11617b5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseDB = getDatabase(firebaseApp);

export default firebaseDB;