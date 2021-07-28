import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Footer from './../components/Footer'

const TalkScreen = props => {

    const [text, setText] = useState('');
    const [word, setWord] = useState('');
    
    return (
        <View style={styles.screen}>

            <View style={styles.container}>

                <View style={styles.connectionContainer}>
                    <Icon name="circle" size={10} color="#15810B" />
                    <Text style={styles.connection}> conectado</Text>
                </View>

                <View style={styles.textArea}>
                    <TextInput
                        multiline={true}
                        style={styles.text}
                        value={text}
                        onChangeText={t => setText(t)}
                    />
                </View>

                <View style={styles.icon}>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => {
                            console.log('a')
                            setWord(word + 'a')
                        }}>
                        <Icon name="volume-up" size={30} color="#300055" />
                    </TouchableOpacity>
                </View>

                <View style={styles.wordArea}>
                    <TextInput
                        style={styles.word}
                        value={word}
                        onChangeText={w => setWord(w)}
                    />
                </View>

                <View>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => {
                            setText('')
                        }}>
                        <Text style={styles.textButtonNegative}>limpar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => {
                            props.navigation.pop();
                        }}>
                        <Text style={styles.textButton}>voltar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => {
                            // props.navigation.push('Calibration');
                            setText(text + ' ' + word)
                        }}>
                        <Text style={styles.textButton}>calibrar</Text>
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
        borderWidth: 1,
        borderColor: "#15810B",
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    connectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    connection: {
        color: '#15810B',
        paddingVertical: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    textArea: {
        borderWidth: 2,
        borderColor: '#300055',
        backgroundColor: 'rgba(245,233,254,0.3)',
        width: '80%',
        height: '40%',
    },
    text: {
        color: '#300055',
        fontSize: 18,
    },
    wordArea: {
        borderBottomWidth: 2,
        borderColor: '#300055',
        backgroundColor: 'rgba(245,233,254,0.3)',
        textAlign: 'center',
        width: '70%',
        height: '8%',
        margin: 20
    },
    word: {
        color: '#300055',
        fontSize: 24,
        textAlign: 'center',
    },
    icon: {
        margin: 30
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
    textButtonNegative: {
        color: '#300055',
        paddingVertical: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default TalkScreen