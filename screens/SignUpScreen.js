import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import { buttonStyles } from '../assets/styles/button';
import { textStyles } from '../assets/styles/text';
import { defcolors } from '../assets/colors/colors';
import React from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'


const SignUpScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation()

    const validateFormData = () => {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            alert("Invalid Email entered!")
        }
        else if (password !== confPassword) {
            alert("Your Passwords do not match!")
        }
        else if (password.length < 6) {
            alert("Your Password is too short. It must be at least 8 characters long!")
        }
        else if (nickname.length === 0) {
            alert("No Nickname given!")
        }
        else {
            handleSignUp()
        }
    }

    const handleSignUp = () => {
        const auth = getAuth();
        //setup user signup using firebase email and verify email address of user by sending a link
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                sendEmailVerification(user);
                alert("Please check your email for verification link.");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === "auth/email-already-in-use") {
                    alert("Email already in use!")
                } else {
                    alert(errorMessage);
                }
            });
    }


    return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={styles.icon}
                        source={require('../assets/icons/user.png')}></Image>

                    <Text style={styles.heading}>HI THERE!</Text>
                    <Text style={styles.subheading}>LET'S CREATE AN ACCOUNT FOR YOU</Text>
                    <TextInput
                        style={textStyles.textInput}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        placeholder="Enter Email">

                    </TextInput>
                    <TextInput
                        style={textStyles.textInput}
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}>

                    </TextInput>
                    <TextInput
                        style={textStyles.textInput}
                        placeholder="Confirm Password"
                        value={confPassword}
                        onChangeText={text => setConfPassword(text)}
                        secureTextEntry={true}></TextInput>
                    <TextInput
                        style={textStyles.textInput}
                        placeholder="Name"
                        value={nickname}
                        onChangeText={text => setNickname(text)}

                    ></TextInput>
                    {isLoading ? (
                        <View
                            style={[buttonStyles.buttonPrimary, { backgroundColor: defcolors.white }]}>
                            <ActivityIndicator color={defcolors.darkBlue} style={[styles.spinner]} size="large" />
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={validateFormData}
                            style={buttonStyles.buttonPrimary}>
                            <Text style={buttonStyles.buttonText}>SIGN UP</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity>
                        <Text
                            onPress={() => navigation.navigate('Login')}
                            style={textStyles.textSmaller}>Already have an account? Tap here to log in</Text>
                    </TouchableOpacity>
                </View>
            <Image style={styles.bottomIcon}
                source={require('../assets/icons/logo.png')}></Image>
        </View >
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defcolors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    header: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 0,
        //backgroundColor: defcolors.lightBlue,
    },

    icon: {
        width: 100,
        height: 100.
    },

    heading: {
        marginTop: 20,
        fontSize: 35,
        color: defcolors.darkBlue,
    },

    subheading: {
        color: defcolors.grey,
        fontSize: 17,
    },

    bottomIcon: {
        width: 90,
        height: 90,
        marginBottom: 10,
    },
})

