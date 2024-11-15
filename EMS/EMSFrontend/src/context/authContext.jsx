import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get("http://localhost:3000/api/auth/verify", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.data.success) {
                        setUser(response.data.user);
                    } else {
                        setUser(null);
                    }
                }
            } catch (error) {
                console.log(error);
                setUser(null);
            } finally {
                setLoading(false); // Ensure loading is set to false
            }
        };
        verifyUser();
    }, []);

    const login = (user) => {
        setUser(user);
        localStorage.setItem("token", user.token); // Store token after successful login
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token"); // Remove token from storage on logout
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children} {/* Render children only when loading is false */}
        </UserContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(UserContext);

export default AuthProvider;
