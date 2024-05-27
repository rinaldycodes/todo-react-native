import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAsyncStorage } from '../src/hooks/useAsyncStorage'
import AuthProvider from '@/src/providers/AuthProvider'

export default function _layout() {
    return (
        <AuthProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name='index'
                />
                <Stack.Screen
                    name='login'
                />
                <Stack.Screen
                    name='register'
                />
                <Stack.Screen
                    name='(app)'
                />
            </Stack>
        </AuthProvider>
    )
}

const App = () => {
    return (
        <AuthProvider>

        </AuthProvider>
    )
}

const styles = StyleSheet.create({})