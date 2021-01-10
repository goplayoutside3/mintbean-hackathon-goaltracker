import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FB_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.NEXT_PUBLIC_FB_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: `${process.env.NEXT_PUBLIC_FB_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_SENDING_ID,
  appId: process.env.NEXT_PUBLIC_FB_API_ID,
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}
const fire = firebase;

export default fire;
