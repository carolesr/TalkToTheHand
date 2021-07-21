import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';


import HomeScreen from '../screens/HomeScreen';

const Navigator = createStackNavigator({
    HomeScreen: { screen: HomeScreen, navigationOptions: { header: null} }
});

export default createAppContainer(Navigator);