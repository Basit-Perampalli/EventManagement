
import React, { createContext, useState, useEffect } from 'react';
export const UserContext = createContext();


export const UserProvider = ({ children }) => {
    // const [user, setUser] = useState(null); // { name: '', role: 'organizer' | 'user' }
    // const [loading, setLoading] = useState(true);

    
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             // Replace with actual API call
    //             const response = await fetch('http://127.0.0.1:8000/api/user/', {
    //                 credentials: 'include', 
    //             });
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setUser(data);
    //             } else {
    //                 setUser(null);
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch user:', error);
    //             setUser(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchUser();
    // }, []);

    // const login = (userData) => {
    //     setUser(userData);
    // };

    // const logout = () => {
    //     setUser(null);
    // };

    return (
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    );
};
