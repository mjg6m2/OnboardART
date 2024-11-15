import React from 'react'
import { useAuth } from '../../context/authContext.jsx'

const Navbar = () => {
      const {user, loading} = useAuth();
    return (
        <div className = 'flex items-center text-white justify-between h-12 bg-teal-600 px-5'>
            {loading ? (
                <p>Loading...</p> // Display loading text while user data is loading
            ) : (
                <p>Welcome {user?.name || 'Guest'}</p> // Default to 'Guest' if user or user.name is undefined
            )}
            <button className='px-4 py-1 bg-teal-700 hover:bg-teal-800'>Logout</button>
        </div>
    )
}

export default Navbar;