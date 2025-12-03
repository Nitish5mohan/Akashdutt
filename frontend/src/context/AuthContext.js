import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    // Check if user is logged in
    const checkUserLoggedIn = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            // Check if token exists in localStorage (optional, but good for quick check)
            // Ideally rely on httpOnly cookie, but for this setup we might need to store token in localStorage for easy access in headers
            // Let's assume we store token in localStorage for simplicity in this MERN setup
            const token = localStorage.getItem('token');

            if (token) {
                const res = await fetch(`${API_URL}/api/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();

                if (data.success) {
                    setUser(data.data);
                } else {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
        } catch (error) {
            console.error(error);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Register user
    const register = async (user) => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                router.push('/');
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            return { success: false, error: 'Something went wrong' };
        }
    };

    // Login user
    const login = async ({ email, password }) => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                router.push('/');
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            return { success: false, error: 'Something went wrong' };
        }
    };

    // Logout user
    const logout = async () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
