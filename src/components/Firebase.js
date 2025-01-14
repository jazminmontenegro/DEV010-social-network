// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  doc,
  getFirestore, collection, addDoc, getDocs,
  onSnapshot, deleteDoc, getDoc, updateDoc, arrayUnion, arrayRemove, serverTimestamp,
  query, orderBy,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA1ELajubLUPKuRqd7BO1OL-Doh40emZfQ',
  authDomain: 'prueba-41bf2.firebaseapp.com',
  projectId: 'prueba-41bf2',
  storageBucket: 'prueba-41bf2.appspot.com',
  messagingSenderId: '82399426981',
  appId: '1:82399426981:web:5fda8d509594688dc7d04c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Obtener el objeto de autenticación a partir de la aplicación inicializada
export const auth = getAuth(app);

export const db = getFirestore();
export const post = (textDescription, username) => addDoc(collection(db, 'postSave'), {
  textDescription,
  username,
  email: auth.currentUser.email,
  photoURL: auth.currentUser.photoURL,
  timestamp: serverTimestamp(), // Agrega la marca de tiempo del servidor al objeto del post
});

export const getPost = () => getDocs(collection(db, 'postSave'));
export const onGetPost = (callback) => onSnapshot(query(collection(db, 'postSave'), orderBy('timestamp', 'desc')), callback);
export const deletePost = (id) => deleteDoc(doc(db, 'postSave', id));
export const getEdit = (id) => getDoc(doc(db, 'postSave', id));
export const updatePost = (id, newFields) => updateDoc(doc(db, 'postSave', id), newFields);
export const saveLike = (id, email) => updateDoc(doc(db, 'postSave', id), { like: arrayUnion(email) });
export const unlike = (id, email) => updateDoc(doc(db, 'postSave', id), { like: arrayRemove(email) });
