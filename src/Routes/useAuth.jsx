import { useState, useEffect } from 'react'
import { auth } from '../Config/firebase'
// import { setPersistence, browserSessionPersistence } from 'firebase/auth'

const useAuth = () => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged( (authUser) => {
            setUser(authUser)
            setIsLoading(false)
        });
        return () => unsubscribe()
    }, [])
    return { user, isLoading }
}

export default useAuth
