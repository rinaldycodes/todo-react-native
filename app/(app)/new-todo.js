import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import {Picker} from '@react-native-picker/picker';
import { MyConstants } from '../../src/constants/MyConstants';
import { useAsyncStorage } from '../../src/hooks/useAsyncStorage';
import Loading from '../../src/components/Loading.component';
import { MyColors } from '@/src/constants/MyColors';

export default function TaskNew() {
    const [token, setToken] = useAsyncStorage('token');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        status: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getCurrentDate();
    }, []);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleBack = () => {
        router.dismiss(-1);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(MyConstants.APP_API_URL + '/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify(formData)
            });

            const res = await response.json();

            console.log('response json task', res);

            if (res.code === 200) {
                Alert.alert('Success', res.message);
                setFormData({
                    title: '',
                    description: '',
                    startDate: '',
                    status: ''
                });
            } else {
                Alert.alert('Error', res.message);
            }
        } catch (error) {
            console.error('error:', error);
            Alert.alert('Error', 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');

        setFormData({ ...formData, 'startDate': `${year}-${month}-${day}` });

        return `${year}-${month}-${day}`;
    };

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.formGroup}>
                <Text style={styles.label} htmlFor="title">Title</Text>
                <TextInput
                    style={styles.input}
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChangeText={(value) => handleChange('title', value)}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label} htmlFor="description">Description</Text>
                <TextInput
                    style={styles.input}
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    value={formData.description}
                    onChangeText={(value) => handleChange('description', value)}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label} htmlFor="startDate">Status</Text>
                <Picker
                    selectedValue={formData.status}
                    style={styles.picker}
                    onValueChange={(value) => handleChange('status', value)}
                >
                    <Picker.Item label="- SELECT -" value="" />
                    <Picker.Item label="ON GOING" value="ON GOING" />
                    <Picker.Item label="COMPLETE" value="COMPLETE" />
                </Picker>
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
                    <Text style={styles.btnSubmitText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 16,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 4,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnSubmit: {
        backgroundColor: MyColors.primary,
        padding: 15,
        flex: 1,
        alignItems: 'center',
        borderRadius: 15,
    },
    btnSubmitText: {
        fontWeight: 'bold',
        color: MyColors.onPrimary,
        fontSize: 16,
    }
});
