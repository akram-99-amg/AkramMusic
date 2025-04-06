import { Navigate, useLocation } from 'react-router-dom'
import useAuth from './useAuth'

const ProtectedRoute = ({children}) => {
    const { user, isLoading } = useAuth()
    const location = useLocation()
    
    if(isLoading){
        return <p className='flex justify-center content-center'>Loading auth ...</p>
    }

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />
    }
    return children
}

export default ProtectedRoute
