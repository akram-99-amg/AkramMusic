import { Navigate, useLocation } from 'react-router-dom'
import useAuth from './useAuth'

const ProtectedRoute = ({children}) => {
    const { user, isLoading } = useAuth()
    const location = useLocation()
    console.log("ProtectedRoute check → user:", user);
    if(isLoading){
        return <p>Loading auth ...</p>
    }

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />
    }
    return children
}

export default ProtectedRoute
