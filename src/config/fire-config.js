import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FB_KEY,
  authDomain: process.env.FB_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: FB_BUCKET,
  messagingSenderId: FB_SENDING_ID,
  appId: FB_API_ID,
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
