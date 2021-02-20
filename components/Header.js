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
  Image,
  Text,
  View,
} from 'react-native';
import { Colors } from '../config/colors';

export const Header = () => {
    return (
        <>
            <View style={styles.body}>
                <Image style={styles.logo} source={require('../assets/clothes/umbrella.png')} />
                <Text style={[styles.name, styles.dark]}>weather</Text>
                <Text style={[styles.name, styles.light]}>a</Text>
                <Text style={[styles.name, styles.dark]}>wear</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Radley-Regular',
    lineHeight: 18
  },
  dark: {
    color: Colors.lime, 
  },
  light: {
    color: Colors.peach,
  },
});

export default Header;