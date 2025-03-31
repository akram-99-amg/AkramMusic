import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../Config/firebase";


export const signUpWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("Signed in Successfully : ", user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Something went wrong", errorCode, errorMessage)
        });
}

export const loginWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Signed in Successfully : ", user)

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Something went wrong", errorCode, errorMessage)
        });
} 

export const logOut =()=>{
    signOut(auth).then(() => {
        console.log ("successfully signed out")
      }).catch((error) => {
        const errorCode= error.code;
        const errorMessage=error.message
        console.log("something went wrong",errorCode, errorMessage)
      });
}