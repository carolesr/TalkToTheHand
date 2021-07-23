import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Image, Text, TouchableOpacity } from 'react-native';

const TalkScreen = props => {
    

    return (
        // <View style={styles.background}>
            <View style={styles.screen}>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => {
                            // props.navigation.push('ProductScreen', {products: listProducts});
                            console.log('aaaa');
                            props.navigation.goBack();
                        }}>
                        <Text style={styles.textButton}>Talk</Text>
                    </TouchableOpacity>
            </View>
        // </View>
    )
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white'
    },
    screen: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 150,
        backgroundColor: 'white'
    },
    // button: {
    //     width: '70%',
    //     borderWidth: 4,
    //     borderRadius: 6,
    //     borderColor: "#002c4f"
    // },
    image: {
        width: '100%',
        height: '72%'
    },
    imageContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '80%'
    },
    textButtonContainer: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: '60%',
        // maxHeight: 40,
        // borderWidth: 1,
        // borderRadius: 6,
        // borderColor: "#002c4f",
        // backgroundColor: "#002c4f",
    },
    textButton: {
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 100,
        backgroundColor: "#002c4f",
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#002c4f",
    },
});

export default TalkScreen