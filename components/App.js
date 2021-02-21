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
  StatusBar,
  Dimensions,
} from 'react-native';

import Main from './Main';

import { clearOldWeatherCache } from '../config/weather';
import { Colors } from '../config/colors';

import SplashScreen from 'react-native-splash-screen';
import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://3e67070f396b40c3b0f66f49c80e1d59@o514206.ingest.sentry.io/5617128',
  enableNative: true,
});

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const App = () => {
  const [appWidth, setAppWidth] = useState(viewportWidth);
  const wearablesRef = useRef();

  const onLayout = (e) => {
    if (e?.nativeEvent?.layout?.width) setAppWidth(e.nativeEvent.layout.width);
  }

  const scrollToWearables = () => { 
    wearablesRef.current.scrollTo({ y: viewportHeight + 10, animated: true });
  };

  useEffect(() => {
    if (SplashScreen && SplashScreen.hide) SplashScreen.hide();
    clearOldWeatherCache();
  }, []);

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior='automatic'
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          ref={wearablesRef}
          onLayout={onLayout}>
          <Main
            scrollToWearables={scrollToWearables}
            appWidth={appWidth} />
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
});

export default App;


