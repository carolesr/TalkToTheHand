import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Image, Text, TouchableOpacity } from 'react-native';

import Footer from './../components/Footer'

const HomeScreen = props => {

    return (
        <View style={styles.screen}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/logo.png')}
                />
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => {
                            props.navigation.push('Talk');
                        }}>
                        <Text style={styles.textButton}>falar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => {
                            props.navigation.push('Connection');
                        }}>
                        <Text style={styles.textButton}>conectar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: "black",
    },
    image: {
        width: '100%',
        height: '44%',
    },
    imageContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        width: '70%',
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        width: '50%',
    },
    textButton: {
        color: 'white',
        paddingVertical: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: "#300055",
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "white",
    },
});

export default HomeScreen