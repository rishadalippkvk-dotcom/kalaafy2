import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setUser({ token });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('adminToken', token);
        setUser({ token });
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
