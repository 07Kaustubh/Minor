import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserById, setAuthToken } from './api'; // Import getUserById function from api.js

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null); // State to store user ID
    const [userData, setUserData] = useState(null); // State to store user data

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isLoggedIn) {
                    const token = localStorage.getItem('token');
                    console.log('Token:', token); // Log the token for verification
                    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token
                    console.log('Decoded Token:', decodedToken); // Log the decoded token for verification
                    const { userId } = decodedToken; // Extract the user ID from the decoded token
                    console.log('User ID:', userId); // Log the user ID for verification
                    setUserId(userId); // Set the user ID state
                    const response = await getUserById(userId); // Fetch user data using the user ID
                    setUserData(response); // Set the user data state
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [isLoggedIn]);

    const login = (token, userId) => {
        setIsLoggedIn(true);
        setUserId(userId); // Set the user ID when logging in
//        localStorage.setItem('token', token);
  //      setAuthToken(token);
    };

    const logout = () => {
        // Perform logout logic here
        setIsLoggedIn(false); // Set isLoggedIn state to false
        setUserId(null); // Clear user ID on logout
        localStorage.removeItem('token'); // Remove token from localStorage on logout
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userId, userData }}>
            {children}
        </AuthContext.Provider>
    );
};
