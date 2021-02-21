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
  Text,
} from 'react-native';
import { Colors } from '../config/colors';

const Footer = () => {
  return (
    <>
      <Text style={styles.footer}>an app by jeannecastillo.com</Text>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    color: Colors.peach,
    fontSize: 12,
    fontFamily: 'Radley-Regular',
    textAlign: 'center',
    paddingTop: 70,
    paddingBottom: 20
  }
});

export default Footer;