import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import firebase from './src/services/firebase.js'
import Routes from './src/routes/index';

export default function App() {

  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>

  );
}

