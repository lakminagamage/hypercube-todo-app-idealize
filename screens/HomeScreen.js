import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React from 'react';
import { useState, useEffect } from 'react';
import { defcolors } from '../assets/colors/colors';
import { useNavigation } from '@react-navigation/core';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";


const HomeScreen = () => {

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
                    <View style={styles.panelHeading}>

                    </View>
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
        padding: 10,
    },

    panelHeading: {
        display: 'flex',
        flexDirection: 'row',
        
    }

})
