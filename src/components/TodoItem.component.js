import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

export default function TodoItem({
    data,
    no,
    onClickIconDeleteTask,
    onClickIconEditTask
}) {
    
    return (
        <View key={data.id} style={styles.todoItem}>
            <Text style={styles.todoText}>{no}. {data.title}</Text>
            <View style={styles.todoActions}>
                <TouchableOpacity onPress={() => onClickIconEditTask(data)} style={styles.editButton}>
                    <Text style={styles.editButtonText}><FontAwesome name="pencil" size={14} color="white" /></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onClickIconDeleteTask(data)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}><FontAwesome5 name="trash" size={14} color="white" /></Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    todoText: {
        fontSize: 16,
    },
    todoActions: {
        flexDirection: 'row',
    },
    editButton: {
        marginRight: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: '#007bff',
        borderRadius: 4,
    },
    editButtonText: {
        color: '#fff',
    },
    deleteButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: '#dc3545',
        borderRadius: 4,
    },
    deleteButtonText: {
        color: '#fff',
    },
})