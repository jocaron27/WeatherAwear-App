/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { AdMobBanner } from 'react-native-admob';

const BannerAd = ({
  location,
  size,
  hideAd
}) => {
  const adUnitID = location === 'footer' 
    ? 'ca-app-pub-9279593135031162/5189708737' 
    : location === 'search' 
      ? 'ca-app-pub-9279593135031162/3608979856'
      : location === 'header'
        ? 'ca-app-pub-9279593135031162/6228362199'
        : 'ca-app-pub-9279593135031162/3608979856';
  const adRef = useRef();

  useEffect(() => {
    if (adRef.loadBanner) adRef.loadBanner();
  }, [adRef]);

  if (hideAd) return null;

  return (
    <View style={styles.ad} >
      <AdMobBanner
        adSize={size || 'smartBannerPortrait'}
        adUnitID={adUnitID}
        ref={adRef}/>
    </View>
  );
};

const styles = StyleSheet.create({
  ad: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  }
});

export default BannerAd;