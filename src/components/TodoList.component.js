import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TodoItem from './TodoItem.component'
import ButtonAddNew from './ButtonAddNew'

export default function TodoList({
    isLoading,
    todos,
    no,
    onClickAddNew,
    onClickIconDeleteTask,
    onClickIconEditTask
}) {
    return (
        <View style={styles.todoContainer}>
            {todos.length > 0 && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Todo List</Text>
                    <ButtonAddNew />
                </View>
            )}

            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                todos.length > 0 ? (
                    <ScrollView>
                        {todos.map((v, i) => (
                            <TodoItem key={i} no={no++} data={v}
                                onClickIconDeleteTask={onClickIconDeleteTask}
                                onClickIconEditTask={onClickIconEditTask}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <View style={styles.noDataContainer}>
                        <Image source={require('../../assets/images/no_data.png')} style={styles.noDataImage} />
                        <Text>No Todo</Text>
                        <View style={{ marginTop: 15 }}/>
                        <ButtonAddNew />
                    </View>
                )
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    todoContainer: {
        flex: 1,
    },
    noDataContainer: {
        alignItems: 'center',
    },
    noDataImage: {
        width: 200,
        height: 200,
        marginBottom: 16,
    },
})