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

export const loginWithEmailAndPassword = async (email, password) => {
    try{
        const userCredential =await signInWithEmailAndPassword(auth, email, password)
        console.log("Signed in Successfully : ", userCredential.user)
        return userCredential.user
    }catch(err){
        console.log("something went wrong", err.message);
        throw err
    }        
       
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