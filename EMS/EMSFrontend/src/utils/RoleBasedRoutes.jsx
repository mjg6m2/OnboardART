import React from 'react'
import { useAuth } from '../context/authContext'

const RoleBasedRoutes = ({children, requiredRole}) => {
    const {user, loading} = useAuth()

    if(loading) {
        <div>Loading...</div>
    }
    
    if(!requiredRole.includes(user.role)) {
        <Navigate to="./unauthorized"/>
    }

    return user ? children : <Navigate to="/login"/>

}

export defualt RoleBasedRoutes