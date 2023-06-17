import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator, Switch } from 'react-native'
import React from 'react';
import { useState, useEffect } from 'react';
import { buttonStyles } from '../assets/styles/button';
import { textStyles } from '../assets/styles/text';
import { defcolors } from '../assets/colors/colors';
import { pageLayouts } from '../assets/styles/pageLayouts';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

var taskArray = [];
const HomeScreen = () => {


    const user_email = "sankha.b21@gmail.com";

    taskArray = [
        {
            id: 1,
            taskTitle: 'Go to market',
            taskDescription: 'Buy vegetables, meat and bread',
            taskStatus: false
        },
        {
            id: 2,
            taskTitle: 'Homework',
            taskDescription: 'Mathematics and science',
            taskStatus: false
        },
        {
            id: 3,
            taskTitle: 'Meet dentist',
            taskDescription: 'Inform about toothache',
            taskStatus: true
        },
    ]

    
    const [tasks, setTasks] = useState([...taskArray]);

    const toggleSwitch = (id) => {
        for (let task of taskArray) {
            if (task.id == id) {
                task.taskStatus = !task.taskStatus;
            }
        }
        setTasks([...taskArray]);
    }

    const renderTasks = (task) => {
        return (
            <TouchableOpacity
                style={styles.taskContainer} key={task.id}>
                <View
                    style={styles.leftPane}>
                    <Text
                        style={styles.taskTitle}>
                        {task.taskTitle}
                    </Text>
                    <Text
                        style={styles.taskDescription}>
                        {task.taskDescription}
                    </Text>
                </View>
                <View
                    style={styles.rightPane}>
                    <Switch
                        trackColor={defcolors.darkBlue}
                        thumbColor={task.taskStatus ? defcolors.lightBlue : defcolors.darkBlue}
                        ios_backgroundColor="#3e3e3e"
                        value={task.taskStatus}
                        >
                    </Switch>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.pageHeader}>
                <View style={[styles.iconContainer]}>
                    <View>
                        <Image style={styles.icon} source={require('../assets/icons/logo.png')} />
                    </View>
                </View>
                <Text style={styles.heading}>
                    My-ToDo
                </Text>
            </View>
            <View style={styles.curvedBody}>
                <View style={styles.addNewContainer}>
                    <View style={styles.panelHeadingContainer}>
                        <Image style={styles.panelHeadingIcon} source={require('../assets/icons/add.png')} />
                        <Text style={styles.panelHeading}>
                            Add New Task
                        </Text>
                    </View>
                    <Text style={styles.labelText}>Task Title</Text>
                    <TextInput
                        style={styles.bodyTextInput}
                        placeholder="Enter task title...">
                    </TextInput>
                    <Text style={[styles.labelText, { marginTop: 10 }]}>Task Description</Text>
                    <TextInput
                        style={[styles.bodyTextInput, { height: 60 }]}
                        placeholder="Enter task description..."
                        multiline>
                    </TextInput>
                    <TouchableOpacity
                        style={[buttonStyles.buttonPrimary, { width: '95%', marginTop: 10 }]}>
                        <Text style={buttonStyles.buttonText}>
                            Add Task
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tasksPanel}>
                    <Text style={[styles.panelHeading, { marginBottom: 15, fontWeight: 'bold', marginTop: 10 }]}>
                        Current Tasks
                    </Text>
                    {tasks.map(renderTasks)}
                </View>
            </View>
        </View>
    );

}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },

    pageHeader: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        paddingHorizontal: 20,
        backgroundColor: defcolors.white,
        width: '100%',
        height: 100,
        marginTop: 50,
    },

    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        width: 80,
        height: 80,
    },

    heading: {
        flex: 1,
        fontSize: 25,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        marginTop: -15,
        color: defcolors.darkBlue,
    },

    curvedBody: {
        alignItems: 'center',
        width: '100%',
        flexGrow: 1,
        backgroundColor: defcolors.lightGrey,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 0,
        flexDirection: 'column',
    },

    addNewContainer: {
        width: '95%',
        backgroundColor: defcolors.transparent,
        borderRadius: 20,
        borderColor: defcolors.darkBlue,
        borderWidth: 1,
        marginTop: 10,
        padding: 15,
    },

    panelHeadingContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },

    panelHeadingIcon: {
        width: 20,
        height: 20
    },

    panelHeading: {
        color: defcolors.grey,
        fontSize: 20,
        marginLeft: 10,
    },

    labelText: {
        color: defcolors.black,
        fontWeight: 'bold',
        fontSize: 17,
    },

    bodyTextInput: {
        marginTop: 10,
        height: 40,
        width: '100%',
        textAlign: 'left',
        paddingHorizontal: 10,
        borderColor: defcolors.darkBlue,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 17,
        backgroundColor: defcolors.white,
    },

    tasksPanel: {
        width: '95%',
        backgroundColor: defcolors.transparent,
        marginTop: 10,
    },

    taskContainer: {
        width: '100%',
        backgroundColor: defcolors.white,
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
    },

    taskTitle: {
        color: defcolors.darkBlue,
        fontSize: 17,
        fontWeight: 'bold',
    },

    taskDescription: {
        color: defcolors.grey,
        fontSize: 15,
        marginTop: 5,
    },

    leftPane: {
        width: '75%',
        paddingRight: 10,
    },

    rightPane: {
        width: '25%',
    }

})

const getData = async (taskArray, setTasks,db, user_email) => {
    try {
        taskArray = [];
        const querySnapshot = await getDocs(collection(db, user_email));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            taskArray.push(doc.data());
        });
        //setTasks([...taskArray]);
    } catch (e) {
        console.log(e);
        alert("Error fetching data from database");
    }
}