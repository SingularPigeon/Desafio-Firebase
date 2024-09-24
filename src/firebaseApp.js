// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDIXYBr8cmTKsTzJV-ZXRX5m1PBpasTITE',
  authDomain: 'crud-usuarios-bfaa1.firebaseapp.com',
  projectId: 'crud-usuarios-bfaa1',
  storageBucket: 'crud-usuarios-bfaa1.appspot.com',
  messagingSenderId: '345656914566',
  appId: '1:345656914566:web:8155f1281bea6b73f55707'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }
