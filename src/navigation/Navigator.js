import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import HomeScreen from './../screens/HomeScreen'
import TalkScreen from './../screens/TalkScreen'
import CalibrationScreen from './../screens/CalibrationScreen'


const Navigator = () => {
    
  const Stack = createStackNavigator();
  
  const AppTheme = {
    colors: {
      background: 'white',
      // text: 'white',
      // card: '#300055',
      // border: '#300055'
    },
  };

  const screenOptions = (title) => {
    return {
        title: title,
        headerStyle: {
        backgroundColor: '#300055',
        height: 80
        },
        headerTintColor: 'white',
        headerTitleStyle: {
        alignSelf: 'center'
        },
        headerLeft: null //desabilita back button
    }
  }

    return (
        <NavigationContainer theme={ AppTheme } >
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home"
            component={HomeScreen}
            options={screenOptions('home')}
          />
          <Stack.Screen
            name="Talk"
            component={TalkScreen}
            options={screenOptions('falar')}
          />
          <Stack.Screen
            name="Calibration"
            component={CalibrationScreen}
            options={screenOptions('calibrar')}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
};

export default Navigator;