import React from 'react';
import { View, StyleSheet, Button, Image, Text, TouchableOpacity } from 'react-native';

const Footer = props => {
    return (
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
                        props.navigation.push('Calibration');
                    }}>
                    <Text style={styles.textButton}>calibrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default Footer