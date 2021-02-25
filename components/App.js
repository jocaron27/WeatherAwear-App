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
  View,
} from 'react-native';

import Main from './Main';
import BannerAd from './BannerAd';

import { clearOldWeatherCache } from '../config/weather';
import { Colors } from '../config/colors';

import SplashScreen from 'react-native-splash-screen';
import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://3e67070f396b40c3b0f66f49c80e1d59@o514206.ingest.sentry.io/5617128',
  enableNative: true,
});

const { width, height} = Dimensions.get('window');
const portraitHeight = Math.max(width, height);

const App = () => {
  const [currentWidth, setCurrentWidth] = useState(width);
  const [showAd, setShowAd] = useState(false);
  const wearablesRef = useRef();

  const onLayout = (e) => {
    if (e?.nativeEvent?.layout?.width) setCurrentWidth(e.nativeEvent.layout.width);
  }

  const onScroll = (e) => {
    if (e?.nativeEvent?.contentOffset?.y > portraitHeight / 4) setShowAd(true);
    else (setShowAd(false));
  }

  const scrollToWearables = () => { 
    wearablesRef.current.scrollTo({ y: portraitHeight - 60, animated: true });
  };

  useEffect(() => {
    if (SplashScreen && SplashScreen.hide) SplashScreen.hide();
    clearOldWeatherCache(true);
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
          onLayout={onLayout}
          onScroll={onScroll}
          stickyHeaderIndices={[0]}>
          <View style={styles.ad} >
            <BannerAd location='header' size='banner' hideAd={!showAd} />
          </View>
          <Main
            scrollToWearables={scrollToWearables}
            currentWidth={currentWidth}
            portraitHeight={portraitHeight} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  ad: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  scrollView: {
    backgroundColor: Colors.navy,
    display: 'flex',
    flexDirection: 'column'
  },
});

export default App;


