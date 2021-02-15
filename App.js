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
  ImageBackground,
  Dimensions
} from 'react-native'
import { getWeather, clearOldWeatherCache } from './weather';
import { storeCacheData, getCacheData } from './cache';
import { Header } from './Header';
import { Forecast } from './Forecast';
import { Colors } from './colors';

import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://3e67070f396b40c3b0f66f49c80e1d59@o514206.ingest.sentry.io/5617128',
  enableNative: true,
});

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const App = () => {
  const initialLocation = 'New York City'; // TODO: get user location
  const [locationInput, setLocationInput] = useState('');
  const [location, setLocation] = useState(initialLocation);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState(null);
  const [keyboard, setKeyboard] = useState(false);

  useEffect(() => {
    getUnitPref();
  }, []);

  const getUnitPref = async () => {
    const pref = await getCacheData('unitPref');
    if (!pref) {
      setUnitPref('F');
    } else {
      setUnit(pref);
    }
  }

  const setUnitPref = (pref) => {
    setUnit(pref);
    storeCacheData('unitPref', pref);
  }

  const toggleUnitPref = () => {
    console.log('toggling');
    const newPref = unit === 'F' ? 'C' : 'F';
    setUnitPref(newPref);
  }

  useEffect(() => {
    clearOldWeatherCache();
  }, []);

  useEffect(() => {
    console.log('location', location);
    getWeather({ location })
      .then(weather => {
        if (weather) setForecast(weather);
      });
  }, [location])

  useEffect(() => {
    console.log('FORECAST: ', forecast);
  }, [forecast])

  console.log(viewportHeight)

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollView}>
            <ImageBackground
                source={viewportHeight > 600 ? require('./assets/shapes/peachSwoosh.png') : null}
                style={styles.body}
                imageStyle={{
                  resizeMode: 'cover',
                  height: viewportHeight / (viewportHeight / viewportWidth + .5),
                  width: viewportWidth,
                  top: undefined,
                  bottom: 0
                }}
              >
            <View style={styles.header}>
              <Header />
              <TouchableOpacity style={styles.toggle} onPress={toggleUnitPref}>
                <Text style={styles.toggleText}>
                  {`switch to ${unit === 'F' ? 'Celcius' : 'Fahrenheit'}`}
                </Text>
              </TouchableOpacity>
            </View>
            {!keyboard && <Forecast forecast={forecast} unit={unit} />}
            <View style={styles.searchContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Search a new city"
                  maxLength={50}
                  value={locationInput}
                  // inlineImageLeft='search_icon'
                  // inlineImagePadding
                  onChangeText={text => setLocationInput(text)}
                  onFocus={() => setKeyboard(true)}
                  onBlur={() => setKeyboard(false)}
                  onSubmitEditing={() => {
                    setLocation(locationInput);
                    setLocationInput('');
                  }}
                />	
                {!keyboard && <TouchableOpacity
                  style={styles.button}
                  title="Search"
                  onPress={() => {
                    // setKeyboard(true)
                    setLocation(locationInput);
                    setLocationInput('');
                  }}
                  disabled={!locationInput}
                >
                  <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>}
            </View>
          </ImageBackground>
        </ScrollView>
        
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.navy,
    height: '100%',
  },
  toggleText: {
    display: 'flex',
    alignItems: 'center',
    color: Colors.white,
    fontFamily: 'Questrial-Regular',
    fontSize: 11,
    lineHeight: 11,
    padding: 24,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: viewportHeight / 19,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  searchContainer: {
    width: '100%',
    height: '35%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: 45,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: Colors.lilac,
    paddingLeft: 10,
    fontFamily: 'Questrial-Regular',
    color: Colors.black,
    fontSize: 15,
    height: 60,
    textAlign: 'center',
    borderWidth: 0,
    marginTop: viewportHeight / 32,
    flexGrow: 5,
  },
  button: {
    height: 45,
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingLeft: 30,
    flexGrow: 4,
    marginLeft: 35,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginTop: viewportHeight / 32
  },
  buttonText: {
    color: Colors.purple4,
    textTransform: 'uppercase',
    fontFamily: 'Questrial-Regular'
  },
});

export default App;
