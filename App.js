/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Text,
} from 'react-native';

import { getWeather, clearOldWeatherCache } from './weather';
import { Header } from './Header';
import { Forecast } from './Forecast';

import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://3e67070f396b40c3b0f66f49c80e1d59@o514206.ingest.sentry.io/5617128',
  enableNative: true,
});


const App = () => {
  const initialLocation = 'New York City'; // TODO: get user location
  const [locationInput, setLocationInput] = useState(initialLocation);
  const [location, setLocation] = useState(initialLocation);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    clearOldWeatherCache();
  }, []);

  useEffect(() => {
    console.log('location', location);
    getWeather({ location })
      .then(weather => {
        setForecast(weather);
      });
  }, [location])

  useEffect(() => {
    console.log('FORECAST: ', forecast);
  }, [forecast])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Header />
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder="Search a new city"
                maxLength={50}
                onChangeText={text => setLocationInput(text)}
              />	
              <TouchableOpacity
                style={styles.button}
                title="Search"
                onPress={() => setLocation(locationInput)}
              >
                <Text style={styles.buttonText}>Search</Text>
              </TouchableOpacity>
            </View>
            <Forecast forecast={forecast} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#f2fdfb',
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 1,
  },
  input: {
    height: 45,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
    width: '64%',
    backgroundColor: 'white',
    paddingLeft: 10,
  },
  button: {
    height: 45,
    backgroundColor: '#ea6333',
    paddingVertical: 14,
    paddingHorizontal: 37,
    flexGrow: 1,
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
  }
});

export default App;
