/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  Animated,
  Easing,
} from 'react-native';

const Loader = () => {
  const loadingAnim = new Animated.Value(0);
  Animated.loop(
    Animated.timing(
      loadingAnim,
      {
        toValue: 1,
        duration: 9000,
        useNativeDriver: true,
        easing: Easing.linear
      }
    )
  ).start();

  const spin = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <>
      <Animated.Image
        style={{
          transform: [{rotate: spin}], 
          width: 200,
          height: 200,
        }}
        source={require('../assets/weather/SUN.png')}
      />
    </>
  );
};

export default Loader;


