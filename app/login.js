import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MyConstants } from '../src/constants/MyConstants';
import { useAsyncStorage } from '../src/hooks/useAsyncStorage';
import Loading from '../src/components/Loading.component';
import { MyColors } from '../src/constants/MyColors';
import { Redirect, router } from 'expo-router';
import { useAuth } from '@/src/hooks/useAuth';

export default function Login() {
    const { token, user, login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    if ( token ) {
        return <Redirect href={'/dashboard'} />
    }

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {

        setIsLoading(true);
        try {
            const response = await fetch(MyConstants.APP_API_URL + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const res = await response.json();

            console.log('response json login', res.code);

            if (res.code === 200) {
                console.log('redirect to dashboard');
                Alert.alert('Success', res.message);
                login({
                    token: res.data.token,
                    user: res.data.user
                });

                router.push('/dashboard'); 
            } else {
                Alert.alert('Error', res.message);
            }
            console.log('Login successful');
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter email"
                        value={formData.email}
                        onChangeText={(value) => handleChange('email', value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={formData.password}
                        onChangeText={(value) => handleChange('password', value)}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <View style={styles.register}>
                    <Text>Doesn't have an account? <Text style={styles.link} onPress={() => router.navigate({
                        pathname: '/register'
                    })}>Register here</Text></Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    card: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: MyColors.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: MyColors.onPrimary,
        fontSize: 16,
    },
    register: {
        marginTop: 10,
        alignItems: 'center',
    },
    link: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
});
