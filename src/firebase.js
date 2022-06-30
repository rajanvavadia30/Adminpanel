import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCEl5F1u4npCisnprbcJZ2hx4CZUXHsFV4",
  authDomain: "logintest-f8846.firebaseapp.com",
  projectId: "logintest-f8846",
  storageBucket: "logintest-f8846.appspot.com",
  messagingSenderId: "547206086172",
  appId: "1:547206086172:web:0a65f9bcc65f0296e029d9"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;