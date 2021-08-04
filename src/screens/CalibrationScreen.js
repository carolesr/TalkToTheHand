import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../assets/colors'

import BluetoothSerial from "react-native-bluetooth-serial";

const CalibrationScreen = props => {
    
    const [connected, setConnected] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [instructionMessage, setInstructionMessage] = useState('aqui você ajusta os sensores à sua mão');
    const [progressMessage, setProgressMessage] = useState('calibragem finalizada com sucesso :)');
    const [messageColor, setMessageColor] = useState(colors.success);
    const [showButton, setShowButton] = useState(true);
    const [buttonText, setButtonText] = useState('voltar');
    
    const btManager = BluetoothSerial;

    useEffect(() => {
        connectToGlove();
        lostConnection();
    }, [])

    const connectToGlove = async () => {
        console.log('connect to glove')
        // const hc = await btManager.connect('3C:61:05:12:67:32') //ESP
        const hc = await btManager.connect('98:D3:71:FD:5A:D7') //HC06
            .then(res => {
                console.log('Conectado com sucesso! ' + res.message)    
                setConnected(true); 
                setErrorMessage(res.message)
            })
            .catch(err => {
                console.log('Deu ruim pra conectar! ' + err.message)
                setConnected(false)
                setErrorMessage(err.message)
            }) 
    };
    
    const lostConnection = async () => {
        console.log('subscribe to lost connection')
        btManager.on('connectionLost', e => {
            console.log("deconectou " + e)
            setConnected(false)
            setErrorMessage(e.message)
        });
        btManager.on('error', (err) => {
            console.log(`Error: ${err.message}`)
            // setConnected(false)
            // setErrorMessage(err.message)
        })
    }
    
    const writeMessages = async message => {
        btManager.write(message)
        .then((res) => {
            console.log('Successfuly wrote to device: ' + message)
        })
        .catch((err) => console.log(err.message))
    }

    return (
        <View style={styles.screen}>

            <View style={styles.container}>

                <View style={styles.connectionContainer}>
                        <View style={styles.messageContainer}>
                            <Icon 
                                name="circle" 
                                size={10} 
                                color={connected ? colors.success : colors.error} 
                                // style={connected ? {marginVertical: 30} : {marginTop: 25}}
                            />
                            <Text style={connected ? styles.connected : styles.disconnected}> {connected ? 'conectado' : 'desconectado'}</Text>                            
                        </View>
                        {!connected ? 
                            <View style={styles.conectarContainer}>                            
                                <Text style={[styles.disconnected, {paddingVertical: 10}]}>{errorMessage}</Text>
                                <TouchableOpacity activeOpacity={0.4} onPress={() => {
                                        console.log('CONECTAR')
                                        connectToGlove()
                                    }}>
                                    <Text style={[styles.textButtonNegative, {fontSize: 18, paddingBottom: 0}]}>conectar</Text>
                                </TouchableOpacity>
                            </View>
                        : console.log()}
                </View>

                <View style={styles.instructionContainer}>
                    <Text style={styles.text}>{instructionMessage}</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../assets/logo.png')}
                    />
                </View>

                {showButton 
                ? 
                    <View>
                        <TouchableOpacity activeOpacity={0.4} onPress={() => {
                                console.log('começar')
                                writeMessages('1')
                                setInstructionMessage('feche e abra os dedos durante alguns segundos')
                                setShowButton(false)
                                setButtonText('ok')
                            }}>
                            <Text style={styles.textButtonNegative}>começar</Text>
                        </TouchableOpacity>
                    </View>
                :
                    <View style={styles.instructionContainer}>
                        <Text style={[styles.text, {color: messageColor}]}>{progressMessage}</Text>
                    </View>
                }
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => {
                            btManager.disconnect();
                            props.navigation.pop();
                        }}>
                        <Text style={styles.textButton}>{buttonText}</Text>
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
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        // borderWidth: 2,
        borderColor: 'red'
    },
    connectionContainer: {
        // flex: 1,
        justifyContent: 'flex-start',
        // maxHeight: '25%',
        // borderWidth: 2,
        borderColor: 'black'
    },
    conectarContainer: {
        // borderWidth: 1,
        borderColor: 'green',
        // flex: 1,
        // height: '10%',
        justifyContent: 'flex-end'
    },
    messageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        // borderWidth:1,
        borderColor:'blue',
        // marginTop: 30
    },
    connected: {
        color: colors.success,
        // paddingVertical: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    disconnected: {
        color: colors.error,
        // paddingTop: 30,
        // paddingBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    instructionContainer: {
        width: '60%',
        // borderWidth:1,
        borderColor:'green',
    },
    text: {
        color: colors.basePurple,
        paddingVertical: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        width: '100%',
    },
    textButton: {
        color: 'white',
        paddingVertical: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: colors.basePurple,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "white",
    },
    textButtonNegative: {
        color: colors.basePurple,
        paddingBottom: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 26,
        // borderWidth: 1,
        borderColor: 'pink'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        width: '50%',
        maxHeight: '30%',
        // borderWidth: 1,
        borderColor: 'red'
    }
});

export default CalibrationScreen