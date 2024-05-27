import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Stack, router } from 'expo-router'
import { useAsyncStorage } from '../../src/hooks/useAsyncStorage'
import Loading from '../../src/components/Loading.component';
import { MyColors } from '@/src/constants/MyColors';
import { useAuth } from '@/src/hooks/useAuth';

export default function _layout() {
    const { token } = useAuth();

    if (!token) {
        return <Redirect href={'/login'} />
    }


    return (
        <Stack
            screenOptions={{
                headerTintColor: MyColors.primary
            }}
        >
            <Stack.Screen
                name='dashboard'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='new-todo'
                options={{
                    title: 'New todo'
                }}
            />
            <Stack.Screen
                name='edit-todo'
                options={{
                    title: 'Edit todo'
                }}
            />
        </Stack>
    )
}

const styles = StyleSheet.create({})