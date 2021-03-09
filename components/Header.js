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
} from 'react-native';
import { Logo } from './Logo';
import Gear from '../assets/icons/gear.svg';

const Header = ({ toggleSettings }) => {

  return (
    <View style={styles.header}>
      <Logo />
      <TouchableOpacity style={styles.gear} onPress={toggleSettings}>
        <Gear width={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gear: {
    display: 'flex',
    justifyContent: 'center',
    paddingRight: 20
  },
});

export default Header;