import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React from 'react';
import { useState, useEffect } from 'react';
import { defcolors } from '../assets/colors/colors';
import { useNavigation } from '@react-navigation/core';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";


const LoginScreen = () => {




  return (
    <View style={styles.container}>
      <View style={styles.header}>
        

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


//Save user email on local storage

const saveUserEmail = async (email) => {
  try {
    await AsyncStorage.setItem('userEmail', email);
    //console.log('User name saved successfully!');
  } catch (error) {
    console.log('Error saving user name:', error);
    setLoginClicked(false);
  }
};

async function getUserDetails(db, email, setLoginClicked) {


  user_email = email;
  globalData.setEmail(user_email);
  favourites = await globalData.getFavourites(db);
  
  if (base_error != null) {
    console.log("base_error");
    setLoginClicked(false);
    return;
  }

  devices = await globalData.getDevices(db);

  if (base_error != null) {
    setLoginClicked(false);
    return;
  }

  main_settings = await globalData.getMainSettings(db);

  if (base_error != null) {
    setLoginClicked(false);
    return;
  }

  globalData.setGlobalDataLogin(favourites, devices, main_settings);

  console.log('run1');
  try {
    await globalData.processFavourites();
  } catch (error) {
    console.log(error);
    alert(error);
    setLoginClicked(false);
  }

  console.log('run2');
  navigation.replace('Home');
}

// Retrieving user favourites from firebase
async function getFavourites(db) {
  let favourites = [];
  let currentFavourite = [];
  try {
    const querySnapshot = await getDocs(collection(db, user_email + '/settings/favourites/'));
    querySnapshot.forEach((doc) => {
      if (doc.id != "sample_favourite") {
        currentFavourite = [];
        currentFavourite.push(doc.id);
        currentFavourite.push(doc.data());
        favourites.push(currentFavourite);
      }

    });
  } catch (ex) {
    //firebase_error = ex;
    //console.log('ex');
    console.log(ex);
    base_error = "bE004 : Error occured getting parameter details. App will now close."
  }

  //console.log(favourites);
  return favourites;
}

// Retrieving devices that the client subscribed to from firebase
async function getDevices(db) {
  console.log("getDevices");
  let devices = [];
  let currentDevice;
  try {
    const querySnapshot = await getDocs(collection(db, user_email + '/settings/devices/'));
    querySnapshot.forEach((doc) => {
      if (doc.id != "sample_device") {
        currentDevice = [];
        currentDevice.push(doc.id);
        currentDevice.push(doc.data());
        devices.push(currentDevice);
      }
    });
  } catch (ex) {
    firebase_error = ex;
    base_error = "bE006 : Error occured getting parameter details. App will now close."
  }

  //console.log(devices);
  return devices;
}

// Retrieving user main settings from firebase
async function getMainSettings(db) {
  let settings = [];
  try {
    const querySnapshot = await getDocs(collection(db, user_email + '/settings/main_settings/'));
    querySnapshot.forEach((doc) => {
      settings.push(doc.id);
      settings.push(doc.data());
    });
  } catch (ex) {
    firebase_error = ex;
    base_error = "bE005 : Error occured getting parameter details. App will now close."
  }

  //console.log(settings);
  return settings;
}

const getAsyncValue = async (key, type) => { // type --> 0-lower, 1-upper
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      console.log("Async retrieve success" + value);
      return value;
    } else {
      return null;
    }
  } catch (e) {
    console.log("Async retrieve error" + e);
  }
}