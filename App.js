/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from 'react';
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
  Dimensions,
  Image,
} from 'react-native'
import { getWeather, clearOldWeatherCache } from './weather';
import { storeCacheData, getCacheData } from './cache';
import { Header } from './Header';
import { Forecast } from './Forecast';
import { Colors } from './colors';
import { Carat } from './Carat';

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
  const [loading, setLoading] = useState(false);
  const [wearables, setWearables] = useState([]);
  const [idx, setIdx] = useState(0)

  const wearablesRef = useRef();

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
    const newPref = unit === 'F' ? 'C' : 'F';
    setUnitPref(newPref);
  }

  useEffect(() => {
    clearOldWeatherCache();
  }, []);

  useEffect(() => {
    setLoading(true);
    getWeather({ location })
      .then(weather => {
        setLoading(false);
        if (weather) {
          if (!weather[idx]) setIdx(0);
          setForecast(weather);
          setWearables(weather[idx].wearables);
        }
      });
  }, [location])

  useEffect(() => {
    console.log('FORECAST: ', forecast);
    if (forecast[idx] && forecast[idx].wearables) setWearables(forecast[idx].wearables);
  }, [idx])

  const showBackground = !keyboard && viewportHeight > 600;  

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          ref={wearablesRef}
        >
          <ImageBackground
            source={showBackground ? require('./assets/shapes/peachSwoosh.png') : null}
            style={styles.weather}
            imageStyle={{
              resizeMode: 'cover',
              height: viewportHeight / (viewportHeight / viewportWidth + .5),
              width: viewportWidth,
              top: undefined,
              bottom: 0
            }}
          >
            {!keyboard && <View style={styles.header}>
              <Header />
              <TouchableOpacity style={styles.toggle} onPress={toggleUnitPref}>
                <Text style={styles.toggleText}>
                  {`switch to ${unit === 'F' ? 'Celcius' : 'Fahrenheit'}`}
                </Text>
              </TouchableOpacity>
            </View>}
            {/* {loading && <Text>Loading</Text>} */}
            {!keyboard && <Forecast forecast={forecast} unit={unit} updateIdx={setIdx} />}
            <View style={styles.searchContainer}>
              <TextInput
                inlineImageLeft={keyboard || locationInput ? null : 'search'}
                inlineImagePadding={40}
                style={[styles.input, keyboard || locationInput ? styles.centerText : null]}
                placeholder="Search a new city"
                maxLength={50}
                value={locationInput}
                onChangeText={text => setLocationInput(text)}
                onFocus={() => setKeyboard(true)}
                onBlur={() => setKeyboard(false)}
                onSubmitEditing={() => {
                  setLocation(locationInput);
                  setLocationInput('');
                }}
              />	
              {!keyboard &&
                (<TouchableOpacity
                  style={styles.button}
                  title="Search"
                  onPress={() => {
                    setLocation(locationInput);
                    setLocationInput('');
                  }}
                  disabled={!locationInput}
                >
                  <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>)
              }
            </View>
            {!keyboard && wearables && !!wearables.length && (
              <TouchableOpacity
                style={styles.linkContainer}
                onPress={() => { wearablesRef.current.scrollTo({ y: viewportHeight + 10, animated: true }) }}
              >
                <Text style={[styles.wearablesLink, !showBackground ? styles.contrast : null]}>Today's wearables</Text>
                  <Carat c={!showBackground ? 'white' : 'black'} w={12} />
              </TouchableOpacity>
            )}
          </ImageBackground>
          {!keyboard && wearables && !!wearables.length &&
            (<View>
              <ImageBackground
                source={showBackground ? require('./assets/shapes/peachSwooshFlipped.png') : null}
                style={styles.wearablesView}
                imageStyle={{
                  resizeMode: 'cover',
                  height: viewportHeight / (viewportHeight / viewportWidth + .5),
                  width: viewportWidth
                }}
              >
                {wearables.map(wearable => (
                  <View key={wearable.name} style={styles.wearable}>
                    <Image source={wearable.icon} style={styles.icon} />
                    <Text style={styles.wearableText}>{wearable.name}</Text>
                  </View>
                ))}
              </ImageBackground>
              <Text style={styles.footer}>an app by jeannecastillo.com</Text>
            </View>)
          }
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.navy,
    display: 'flex',
    flexDirection: 'column'
  },
  weather: {
    display: 'flex',
    flexDirection: 'column',
    height: viewportHeight - 50,
  },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexGrow: 1,
    },
      toggle: {
        display: 'flex',
        justifyContent: 'center',
        paddingRight: 20
      },
        toggleText: { 
          color: Colors.white,
          fontFamily: 'Questrial-Regular',
          fontSize: 11,
          lineHeight: 11,
        },
    searchContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexGrow: 4,
    },
      input: {
        height: 60,
        fontSize: 15,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: Colors.lilac,
        fontFamily: 'Questrial-Regular',
        color: Colors.black,
        borderWidth: 0,
        flexGrow: 5,
        paddingLeft: 15
      },
        centerText: {
          textAlign: 'center',
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
      },
        buttonText: {
          color: Colors.purple4,
          textTransform: 'uppercase',
          fontFamily: 'Questrial-Regular'
        },
    linkContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexGrow: 2
    },
      contrast: {
        color: Colors.white,
      },
      wearablesLink: {
        fontFamily: 'Radley-Regular',
        color: Colors.black,
        fontSize: 17,
      },
  wearablesView: {}, // need or else error
  wearable: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 40,
  },
    icon: {
      width: 150,
      height: 150,
    },
    wearableText: {
      color: Colors.white,
      fontFamily: 'Questrial-Regular',
      fontSize: 16,
      paddingTop: 12
    },
  footer: {
    color: Colors.peach,
    fontSize: 12,
    fontFamily: 'Radley-Regular',
    textAlign: 'center',
    paddingTop: 70,
    paddingBottom: 20
  }
});

export default App;


