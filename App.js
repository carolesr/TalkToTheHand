/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';
import BluetoothSerial from "react-native-bluetooth-serial";
import Tts from 'react-native-tts';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  const [btStatus, setBluetoothStatus] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [paired, setPaired] = useState('');
  const [messages, setMessages] = useState('start');
  const btManager = BluetoothSerial;

  const getStatusFromDevice = async () => {
    console.log('get status')
    const status = await btManager.isEnabled();
    console.log(status)
    setBluetoothStatus(status);
  };

  const getPairedList = async () => {
    console.log('paired list')
    const devices = await btManager.list();
    console.log(devices)
    setPaired(devices[0]['name'])

    const hc = await btManager.connect('98:D3:71:FD:5A:D7');
    console.log(hc)
    console.log('conectado?')

    const con = await btManager.isConnected();
    console.log(con);
    setIsConnected(con);
    readMessages()
  }

  const readMessages = async () => {
    console.log('read messages')
    
    BluetoothSerial.withDelimiter("\r\n").then(res => {
      console.log("delimiter setup", res);   
      btManager.on('read', message => {
        console.log('bt lendo msg')
        console.log(message['data'])
        setMessages(message['data']);
      });     
      });
    
  }

  useEffect(() => {
    console.log('use effect')
    // getStatusFromDevice();
    // getPairedList()
    // btManager.on("bluetoothEnabled", () => {
    //   console.log('bt is enabled');
    //   setBluetoothStatus(true);
    // });
    // btManager.on("bluetoothDisabled", () => {
    //   console.log('bt is not enabled');
    //   setBluetoothStatus(false);
    // });

    Tts.setDefaultLanguage('en-IE');
    // Tts.setDefaultRate(0.6);
    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-finish', event => console.log('finish', event));
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event));
  }, []);

  const speak = () => {
    console.log('speak')
    Tts.stop();
    Tts.speak('hey mom lets have a pizza');
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Is bluetooth enabled">
            bluetoothEnabled = {btStatus ? 'true' : 'false'}
          </Section>
          <Section title="Paired devices">
            {paired}
          </Section>
          <Section title="Messages">
            {messages}
          </Section>
          <Section title="Is bluetooth connected">
            bluetoothConnected = {isConnected ? 'true' : 'false'}
          </Section>
          <Button title="click to speak" onPress={speak}/>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
