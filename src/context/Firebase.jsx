import React, { useContext, createContext, useEffect, useState } from "react";
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged
} from 'firebase/auth'
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
const FirebaseContext = createContext(null);


//! useContext(any react Hook) can't be called outside the react functional component
//* Hence to use it(custom ) we need to use custom react hook component

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPOkeWoAkGWiilYtD4DH2E1aSFWp1Tj3o",
    authDomain: "bookify-6b518.firebaseapp.com",
    projectId: "bookify-6b518",
    storageBucket: "bookify-6b518.appspot.com",
    messagingSenderId: "1051714719008",
    appId: "1:1051714719008:web:da27974fc43cfd0ceb9b45"
};

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => {
    const firebaseContext = useContext(FirebaseContext);
    if (firebaseContext === null) {
        throw new Error("useFirebase must be used within a FirebaseProvider");
    }
    return firebaseContext;
};

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            if (user) setUser(user);
            else setUser(null);
        })

    }, [])

    const signupUserWithEmailandPassword = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
    }
    const loginUserWithEmailAndPassword = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
    }
    const signInWithGoogle = (email, password) => {
        signInWithPopup(firebaseAuth, googleProvider);
    }
    const handleCreateNewListing = async (name, isbn, price, cover) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult = await uploadBytes(imageRef, cover);
        return await addDoc(collection(firestore, "books"), {
            name,
            isbn,
            price,
            imageURL: uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        });
    };

    const listAllBooks = () => {
        return getDocs(collection(firestore, "books"))
    }

    const getBookById = async (id) => {
        const docRef = doc(firestore, 'books', id);
        const result = await getDoc(docRef);
        return result;

    }

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path))
    }

    const placeOrder = async (bookId, qty) => {
        const collectionRef = collection(firestore, "books",
            bookId, "orders");

        const result = await addDoc(collectionRef, {
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty,
        })
        return result;
    }
    // console.log(user.email);

    const fetchMyOrders = async (userID) => {
        const collectionRef = collection(firestore, "books")
        const q = query(collectionRef, where("userID", "==", userID));
        const result = await getDocs(q);
        return result;
    }

    const getOrders = async (bookId) => {
        const collectionRef = collection(firestore, "books", bookId, 'orders')
        const result = await getDocs(collectionRef)
        return result
    }
    const isLoggedIn = user ? true : false;
    return (
        <FirebaseContext.Provider
            value={{
                signupUserWithEmailandPassword,
                loginUserWithEmailAndPassword,
                signInWithGoogle,
                isLoggedIn,
                handleCreateNewListing,
                listAllBooks,
                getImageURL,
                getBookById,
                placeOrder,
                fetchMyOrders,
                user,
                getOrders
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
};
