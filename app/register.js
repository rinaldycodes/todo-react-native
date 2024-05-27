import { MyColors } from '@/src/constants/MyColors';
import { MyConstants } from '@/src/constants/MyConstants';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        name: '',
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        console.log('formDta', formData)
        setIsLoading(true);
        try {
            const response = await fetch(MyConstants.APP_API_URL + '/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const res = await response.json();

            console.log('response json login', res.code);

            if (res.code === 200) {
                alert(res.message);
                setFormData({
                    email: '',
                    password: '',
                    phoneNumber: '',
                    name: '',
                });
                router.navigate('/login');
            } else {
                alert(res.message);
            }
            console.log('Registration successful');
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Register</Text>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        value={formData.name}
                        style={styles.input}
                        placeholder="Name"
                        onChangeText={(text) => handleChange('name', text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
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
                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                        value={formData.phoneNumber}
                        style={styles.input}
                        placeholder="Phone Number (+628829986)"
                        keyboardType="phone-pad"
                        onChangeText={(text) => handleChange('phoneNumber', text)}
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
                <Text style={styles.loginLink} onPress={() => router.navigate('/login')}>
                    Have an account? <Text style={styles.link}>Login</Text>
                </Text>
            </View>
        </SafeAreaView>
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
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    loginLink: {
        marginTop: 10,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        color: '#007bff',
        textDecorationLine: 'underline',
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
});
