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
  TouchableOpacity,
  Text,
} from 'react-native';
import { Logo } from './Logo';
import { Colors } from '../config/colors';

const Header = ({ unit, toggleUnitPref }) => {

  return (
    <View style={styles.header}>
      <Logo />
      <TouchableOpacity style={styles.toggle} onPress={toggleUnitPref}>
        <Text style={styles.toggleText}>
          {`switch to ${unit === 'F' ? 'Celcius' : 'Fahrenheit'}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Header;