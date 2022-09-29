import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDR3DxGGKxn1eUxmsjH8b0-FNWD8qcNnDk',
  authDomain: 'cooking-buja-site.firebaseapp.com',
  projectId: 'cooking-buja-site',
  storageBucket: 'cooking-buja-site.appspot.com',
  messagingSenderId: '1055317050171',
  appId: '1:1055317050171:web:458c2126c847eceabded1e',
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();

export { projectFirestore };
