/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { Colors } from '../config/colors';

const Wearables = ({ wearables = [] }) => {
  return (
    <>
      {wearables.map(wearable => (
        <View key={wearable.name} style={styles.wearable}>
          <Image source={wearable.icon} style={styles.icon} />
          <Text style={styles.wearableText}>{wearable.name}</Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default Wearables;


