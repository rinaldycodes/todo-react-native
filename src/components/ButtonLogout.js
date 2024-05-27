import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { MyColors } from '../constants/MyColors';
import { useAuth } from '../hooks/useAuth';

export default function ButtonLogout() {
    const { logout } = useAuth();
    const handleOnPres = () => {
        logout();
        router.navigate('/login');
    }
    return (
        <TouchableOpacity style={styles.container} onPress={handleOnPres }>
            <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: MyColors.primary,
        padding: 8,
        alignItems: 'center',
        borderRadius: 15,
        width: 100,
        marginBottom: 15,
    },
    text: {
        color: MyColors.onPrimary,
        fontWeight: 'bold',
    }
})