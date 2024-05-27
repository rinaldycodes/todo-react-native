import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { MyConstants } from '../../src/constants/MyConstants';
import { useAsyncStorage } from '../../src/hooks/useAsyncStorage';
import { router, useFocusEffect } from 'expo-router';
import TodoList from '../../src/components/TodoList.component';
import ButtonLogout from '../../src/components/ButtonLogout';
import Loading from '../../src/components/Loading.component';
import { TaskApi } from '@/src/api/TaskApi';
import { useAuth } from '@/src/hooks/useAuth';

export default function Dashboard() {
    const { user, token } = useAuth();
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let no = 1;

    useFocusEffect(
        React.useCallback(() => {
            getTasks();
        }, [])
    );


    const onClickAddNew = () => {
        router.navigate('NewTodo');
    }

    const onClickIconDeleteTask = (data) => {
        deleteTask(data.id);
    }

    const onClickIconEditTask = (data) => {
        console.log('dataid'+data.id);
        router.navigate({
            pathname: '/edit-todo',
            params: {
                id: data.id,
            }
        });
    }

    const getTasks = async () => {
        try {
            setIsLoading(true);
            setTodos([]);

            const res = await TaskApi.getTasks({
                token
            });

            if (res.code === 200) {
                setTodos(res.data);
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error('error',error)
            
        } finally {
            setIsLoading(false)
        }
    };

    const deleteTask = async (ID) => {
        setIsLoading(true);
        try {
            const response = await fetch(MyConstants.APP_API_URL + '/tasks/' + ID, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            const res = await response.json();

            console.log('response json', res);

            if (res.code === 200) {
                Alert.alert('Success', res.message);
                getTasks();
            } else {
                Alert.alert('Error', res.message);
            }
        } catch (error) {
            console.error('error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (<Loading />)
    }


    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Halo, <Text style={styles.bold}>{user.name}</Text></Text>
            <ButtonLogout />
            <TodoList
                no={no}
                todos={todos}
                isLoading={isLoading}
                onClickAddNew={onClickAddNew}
                onClickIconDeleteTask={onClickIconDeleteTask}
                onClickIconEditTask={onClickIconEditTask}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    greeting: {
        fontSize: 18,
        marginBottom: 16,
    },
    bold: {
        fontWeight: 'bold',
    },

});
