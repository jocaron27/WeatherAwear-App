/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Text,
  ImageBackground,
  Dimensions,
  PermissionsAndroid,
  Platform
} from 'react-native';

import { AdMobInterstitial } from 'react-native-admob';

import SplashScreen from 'react-native-splash-screen';
import GestureRecognizer from 'react-native-swipe-gestures';
import Geolocation from '@react-native-community/geolocation';

import { getWeather, clearOldWeatherCache } from '../config/weather';
import { storeCacheData, getCacheData } from '../config/cache';
import { Colors } from '../config/colors';

import Forecast from './Forecast';
import Carat from './Carat';
import Header from './Header';
import Footer from './Footer';
import Loader from './Loader';
import Search from './Search';
import Wearables from './Wearables';
import BannerAd from './BannerAd';

const { height, width } = Dimensions.get('window');
const viewportHeight = Math.max(height, width);
const statusBarHeight = StatusBar.currentHeight;

const Main = ({
  portraitHeight,
  currentWidth,
  scrollToWearables,
}) => {
  // LOCATION
  const defaultLocation = 'New York City';
  const [location, setLocation] = useState('');
  // PREFS
  const [unit, setUnit] = useState(null);
  // UI STATE
  const [appLoaded, setAppLoaded] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idx, setIdx] = useState(0);
  // DATA
  const [forecast, setForecast] = useState([]);
  const [wearables, setWearables] = useState([]);
  // SHOW/HIDE LOGIC
  const showBackground = !keyboard && portraitHeight > 600;
  const showLoader = loading && !keyboard;
  const loadedNoKeyboard = !loading && !keyboard;
  const showForecast = loadedNoKeyboard;
  const showWearables = loadedNoKeyboard && wearables && !!wearables.length;
  // ADS
  const adRef = useRef();
  const locChangeAdFrequency = 3;
  const [locCount, setlocCount] = useState(0);
  const popupAdLimit = 1;
  const [popupAdCount, setPopupAdCount] = useState(0);
  const showPopupAd = () => {
    if (popupAdCount <  popupAdLimit)
      AdMobInterstitial?.requestAd()
        .then(() => {
          AdMobInterstitial?.showAd();
          setPopupAdCount(popupAdCount + 1);
        })
        .catch(() => {})
  };

  // Unit Pref methods
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

  // Forecast Index methods
  const decreaseIdx = () => {
    if (idx > 0) setIdx(idx - 1);
  }

  const increaseIdx = () => {
    if (idx < forecast.length - 1) setIdx(idx + 1);
  }

  // Determining the initial location
  const getLastLocation = async () => {
    try {
      const lastLocation = await getCacheData('lastSearchedLocation');
      if (lastLocation && typeof lastLocation === 'string') setLocation(lastLocation);
      else setLocation(defaultLocation);
    } catch (e) {
      setLocation(defaultLocation);
    }
  }

  const setInitialLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Weatherawear Location Permission",
            message:
              "Weatherawear is requesting access to your location " +
              "so you can receive a personalized forecast.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "No thanks",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(info => {
            if (info.coords) {
              const { latitude, longitude } = info.coords;
              if (latitude && longitude) {
                setLocation(`${latitude},${longitude}`);
                return;
              }
            }
          });
        }
        // Fallback
        getLastLocation();
      } else {
        // TODO: Set up geolocation for iOS
        // Geolocation.requestAuthorization();
        // Geolocation.getCurrentPosition(info => console.log('ios', info));
        getLastLocation();
      }
    } catch (e) {
      getLastLocation();
    }
  }

  // Initialize
  useEffect(() => {
    setInitialLocation();
    if (SplashScreen && SplashScreen.hide) SplashScreen.hide();
    getUnitPref();
    AdMobInterstitial.setAdUnitID('ca-app-pub-9279593135031162/7046496130');
  }, []);

  useEffect(() => {
    if (adRef.loadBanner) adRef.loadBanner();
  }, [adRef]);

  // Fetch
  useEffect(() => {
    setLoading(true);
    if (location) getWeather({ location })
      .then(weather => {
        setTimeout(() => {
          setLoading(false);
          setAppLoaded(true);
          setlocCount(locCount + 1)
          if (weather) {
            if (!weather[idx]) setIdx(0);
            setForecast(weather);
            setWearables(weather[idx].wearables);
            storeCacheData('lastSearchedLocation', location);
          }
        }, 500)
      });
  }, [location]);

  // Display wearables
  useEffect(() => {
    if (forecast[idx] && forecast[idx].wearables) setWearables(forecast[idx].wearables);
    // Show ad on last day of forecast
    if (idx === forecast.length - 1) {
      showPopupAd();
    }
  }, [idx]);

  // Show add on the (locChangeAdFrequency)th location
  useEffect(() => {
    if (locCount > 0 && locCount % locChangeAdFrequency === 0) {
      showPopupAd();
    }
  }, [locCount]);

  return (
    <>
      {!appLoaded
        ? <View style={styles.preAppLoader}>
            <Loader />
          </View>
        : <>
          <ImageBackground
            source={
              showBackground 
                ? require('../assets/shapes/peachSwoosh.png')
                : null
            }
            style={styles.viewportContainer}
            imageStyle={{
              resizeMode: 'cover',
              height: portraitHeight / (portraitHeight / currentWidth + .5),
              width: currentWidth,
              top: undefined,
              bottom: 0
            }}>
            <GestureRecognizer
              onSwipeRight={decreaseIdx}
              onSwipeLeft={increaseIdx}
              style={styles.swipeContainer}
            >
              {showForecast && (
                <>
                  <Header unit={unit} toggleUnitPref={toggleUnitPref} />
                  <Forecast
                    forecast={forecast}
                    unit={unit}
                    updateIdx={setIdx}
                    idx={idx}
                  />
                </>
              )}
              {showLoader &&  (
                <View style={styles.loader}>
                  <Loader />
                </View>
              )}
              <Search
                setLocation={setLocation}
                keyboard={keyboard}
                setKeyboard={setKeyboard}
              />
              {showWearables && (
                <TouchableOpacity
                  style={styles.linkContainer}
                  onPress={scrollToWearables}
                >
                  <Text style={[styles.wearablesLink, !showBackground ? styles.contrast : null]}>
                    Today's wearables
                  </Text>
                  <Carat c={!showBackground ? 'white' : 'black'} w={12} />
                </TouchableOpacity>
              )}
            </GestureRecognizer>
          </ImageBackground>
          {!keyboard && (
            <View>
              <ImageBackground
                source={showBackground ? require('../assets/shapes/peachSwooshFlipped.png') : null}
                style={styles.wearablesView}
                imageStyle={{
                  resizeMode: 'cover',
                  height: portraitHeight / (portraitHeight / currentWidth + .5),
                  width: currentWidth
                }}>
                {showWearables && <Wearables wearables={wearables} />}
              </ImageBackground>
              <Footer />
              <BannerAd location='footer' />
            </View>
          )}
          </>
        }
    </>
  );
};

const styles = StyleSheet.create({
  viewportContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: viewportHeight - statusBarHeight,
  }, 
  loader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 6
  },
  swipeContainer: {
    flexGrow: 1,
  },
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  wearablesLink: {
    fontFamily: 'Radley-Regular',
    color: Colors.black,
    fontSize: 17,
    marginBottom: 8
  },
  contrast: {
    color: Colors.white,
  },
  wearablesView: {}, // need or else error
  preAppLoader: {
    width: '100%',
    height: viewportHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerAd: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20, 
  }
});

export default Main;