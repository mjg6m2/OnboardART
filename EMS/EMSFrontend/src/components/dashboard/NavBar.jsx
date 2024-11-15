import React from 'react'
import { useAuth } from '../../context/authContext.jsx'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()                // Clears user session
        navigate('/login')       // Redirects to the login page
    }

    return (
        <div className='flex items-center text-white justify-between h-12 bg-teal-600 px-5'>
            <p>Welcome {user?.name}</p>
            <button 
                onClick={handleLogout} 
                className='px-4 py-1 bg-teal-700 hover:bg-teal-800'
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar
