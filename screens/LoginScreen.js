import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React from 'react';
import { useState, useEffect } from 'react';
import { defcolors } from '../assets/colors/colors';
import { useNavigation } from '@react-navigation/core';
import firebase from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginClicked, setLoginClicked] = useState(false)
  const navigation = useNavigation()


  // ------------------ Send user straight to home if authenticated ----------------------

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified) {

          navigaton.replace('Home');
        }
      }
    })

    return unsubscribe
  }, [])

//   // ------------------ Login Management using mail and password ----------------------
const auth = getAuth();

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        if (user.emailVerified) {
            navigation.replace('Home');
        } else {
          alert("Please verify your email address.")
          setLoginClicked(false);
        }

      })
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          alert("User not found. Please check your email address.")
          setLoginClicked(false);
        }
        else if (errorCode === "auth/wrong-password") {
          alert("Wrong credentials provided")
          setLoginClicked(false);
        }
        else if (errorCode === "auth/user-disabled") {
          alert("User disabled. Please contact customer support.")
          setLoginClicked(false);
        }
        else if (errorCode === "auth/network-request-failed") {
          alert("Login request failed. Please Check your Internet connection.")
          setLoginClicked(false);
        }
        else if (errorCode === "auth/invalid-email") {
            alert("Not a valid email.");
            setLoginClicked(false);
          }
        else {
          alert(error.message)
          setLoginClicked(false);
        }
      })
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.icon}
          source={require('../assets/icons/user.png')}></Image>

        <Text style={styles.heading}>WELCOME</Text>

        <TextInput
          style={styles.textInput}
          value={email}
          placeholder="Enter Email"
          onChangeText={text => setEmail(text)}>

        </TextInput>


        <TextInput
          style={styles.textInput}
          value={password}
          placeholder="Enter Password"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}>

        </TextInput>

        <TouchableOpacity
          onPress={() => navigation.navigate('PasswordReset')}>
          <Text style={styles.textSmaller}>Forgot Password?</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => {
            setLoginClicked(true)
            handleLogin()
          }}
          style={styles.buttonPrimary}>
          {loginClicked ?
            (<ActivityIndicator color={"#fff"} style={[styles.spinner]} size="large" />) :
            (<Text style={styles.buttonText}>LOGIN</Text>)}


        </TouchableOpacity>



        <TouchableOpacity>
          <Text
            onPress={() => {
              navigation.navigate('Signup')
            }}
            style={styles.textSmaller}>Do not have an account? Tap here to sign up</Text>

        </TouchableOpacity>



      </View>
      <Image style={styles.bottomIcon}
        source={require('../assets/icons/logo.png')}></Image>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defcolors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
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

  textInput: {
    marginTop: 20,
    height: 40,
    width: 250,
    textAlign: 'center',
    borderColor: defcolors.darkBlue,
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 17,
  },

  buttonPrimary: {
    marginTop: 25,
    backgroundColor: defcolors.darkBlue,
    width: 250,
    height: 40,
    borderRadius: 10,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textSmaller: {
    color: defcolors.grey,
    marginTop: 10,
  },

  buttonText: {
    color: defcolors.white,
    fontSize: 17,
  },

  bottomIcon: {
    width: 90,
    height: 90,
    marginBottom: 10,
  }
})
