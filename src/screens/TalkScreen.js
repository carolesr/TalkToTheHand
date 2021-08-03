import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LogBox } from 'react-native';

import BluetoothSerial from "react-native-bluetooth-serial";
import Tts from 'react-native-tts';

const TalkScreen = props => {

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state', ' Can\'t perform a React state update on an unmounted component.'
        ]);
    
    const btManager = BluetoothSerial;

    const [text, setText] = useState('');
    const [word, setWord] = useState('');
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        console.log('use effect')
        connectToGlove();
        lostConnection(); 
        setupAudio();
    },[])

    const setupAudio = () => {
        Tts.setDefaultLanguage('pt-BR');
    }

    const speak = value => {
        Tts.stop();
        Tts.speak(value);
    }

    const connectToGlove = async () => {
        console.log('connect to glove')
        // const hc = await btManager.connect('3C:61:05:12:67:32') //ESP
        const hc = await btManager.connect('98:D3:71:FD:5A:D7') //HC06
            .then(res => console.log('Conectado com sucesso! ' + res.message))
            .catch(err => console.log('Deu ruim pra conectar! ' + err.message))
        readMessages();
        setConnected(true);  
    };

    const lostConnection = async () => {
        console.log('subscribe to lost connection')
        btManager.on('connectionLost', e => {
            console.log("deconectou " + e)
            setConnected(false)
        });
        btManager.on('error', (err) => console.log(`Error: ${err.message}`))
    }

    const readMessages = async () => {
        console.log('read messages')

        BluetoothSerial.withDelimiter("\r\n").then(res => {
            console.log("delimiter setup", res); 
            var auxWord = '';
            var auxText = '';

            btManager.on('read', message => {
                // console.log(message)
                var dados = message['data'].replace(/(\r\n|\n|\r)/gm, "");
                if (dados == '.') {
                    setText(auxText + auxWord + ' ')
                    setWord('')
                    speak(auxWord)

                    auxText = auxText + auxWord + ' '
                    auxWord = ''
                }
                else{
                    setWord(auxWord + dados);
                    auxWord = auxWord + dados;
                }
            });     
        });        
    }

    const writeMessages = async message => {
        btManager.write(message)
        .then((res) => {
            console.log('Successfuly wrote to device: ' + message)
            //this.setState({ connected: true })
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
                            color={connected ? "#15810B" : 'red'} 
                            style={connected ? {marginVertical: 30} : {marginTop: 25}}
                        />
                        <Text style={connected ? styles.connected : styles.disconnected}> {connected ? 'conectado' : 'desconectado'}</Text>
                    </View>
                    {!connected ? 
                        <View>
                            <TouchableOpacity activeOpacity={0.4} onPress={() => {
                                    console.log('CONECTAR')
                                    connectToGlove()
                                }}>
                                <Text style={styles.textButtonNegative}>conectar</Text>
                            </TouchableOpacity>
                        </View>
                    : console.log()}
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
                            speak(text)
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
                            btManager.disconnect();
                            props.navigation.pop();
                        }}>
                        <Text style={styles.textButton}>voltar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => {
                            // props.navigation.push('Calibration');
                            writeMessages('a');
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
        justifyContent: 'flex-start',

    },
    messageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // borderWidth:1,
        borderColor:'green',
        // marginTop: 30
    },
    connected: {
        color: '#15810B',
        paddingVertical: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    disconnected: {
        color: 'red',
        paddingTop: 30,
        paddingBottom: 10,
        // paddingVertical: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    icon: {
        margin: 30
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
        paddingBottom: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        // borderWidth: 1,
        borderColor: 'pink'
    },
});

export default TalkScreen