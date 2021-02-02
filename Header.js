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

export const Header = () => {
    return (
        <>
            <View style={styles.body}>
                <Image style={styles.logo} source={require('./assets/umbrella.png')} />
                <Text style={styles.dark}>weather</Text>
                <Text style={styles.light}>a</Text>
                <Text style={styles.dark}>wear</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#f2fdfb',
    borderBottomColor: '#f3e95f',
    borderBottomWidth: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  dark: {
    color: '#1a4a90',
    fontSize: 50,
    fontFamily: 'BarlowCondensed-Regular',
    lineHeight: 50
  },
  light: {
    color: '#ed6856',
    fontSize: 50,
    fontFamily: 'BarlowCondensed-Regular',
    lineHeight: 50
  },
});

export default Header;