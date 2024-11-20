import React from 'react';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between h-16 px-5 bg-gradient-to-r from-[#58536E] via-[#4B4E6D] to-[#3A3A58] text-white shadow-md border-b-2 border-[#B8C0D6]">
      <p className="font-semibold text-lg">Welcome {user.name}</p>
      
      <button
        className="px-4 py-2 bg-[#FF4D4D] hover:bg-[#FF1F1F] text-white rounded transition duration-200 ease-in-out transform hover:scale-105"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
