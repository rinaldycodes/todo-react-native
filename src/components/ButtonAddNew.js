import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAsyncStorage } from '../hooks/useAsyncStorage';
import { router } from 'expo-router';
import { MyColors } from '../constants/MyColors';
import { FontAwesome } from '@expo/vector-icons';

export default function ButtonAddNew() {
    const [token, setToken, clearToken] = useAsyncStorage('token','');
    const [user, setUser, clearUser] = useAsyncStorage('user','');
    const handleOnPress = () => {
        router.navigate('/new-todo');
    }
    return (
        <TouchableOpacity style={styles.container} onPress={handleOnPress }>
            <FontAwesome name="plus" size={14} color="white" style={{ marginRight: 5, }}/>
            <Text style={styles.text}>Add new</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: MyColors.primary,
        padding: 8,
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 15,
        flexDirection: 'row',
    },
    text: {
        color: MyColors.onPrimary,
        fontWeight: 'bold',
    }
})