import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useAsyncStorage } from '../hooks/useAsyncStorage'

export default function AuthProvider({children}) {
    const [token, setToken, clearToken] = useAsyncStorage('token','');
    const [user, setUser, clearUser] = useAsyncStorage('user','');
    useEffect( () => {

    }, []);

    const login = ({
        token,
        user,
    }) => {
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        clearToken();
        clearUser();
    };
  return (
    <AuthContext.Provider value={{ logout, login, token, user }}>
        {children}
    </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({})