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
import Wearables from './Wearables';
import { Colors } from '../config/colors';
import { ALL_WEARABLES } from '../config/wearables';

export const Settings = ({
  toggleUnitPref,
  unit,
  setTempConfigPref,
  tempConfig,
}) => {
  return (
    <View style={styles.body}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.header}>
        Forecast
      </Text>
      <TouchableOpacity onPress={toggleUnitPref}>
        <Text style={styles.text}>
          {`Switch to ${unit === 'F' ? 'Celsius' : 'Fahrenheit'}`}
        </Text>
      </TouchableOpacity>
      <Text style={styles.header}>
        Wearables
      </Text>
      <Text style={styles.instructions}>
        - Customize your recommendations -
      </Text>
      <TouchableOpacity onPress={() => setTempConfigPref('Hot')}>
        <Text style={[tempConfig === 'Hot' ? styles.selected : null, styles.text]}>
          I tend to feel warmer than most people do
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTempConfigPref('Cold')}>
        <Text style={[tempConfig === 'Cold' ? styles.selected : null, styles.text]}>
          I am always cold
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTempConfigPref('')}>
        <Text style={[tempConfig === '' ? styles.selected : null, styles.text]}>
          I'll take the default wearables, please!
        </Text>
      </TouchableOpacity>
      <Text style={styles.instructions}>
        - Tap to hide items from your suggestions -
      </Text>
      <Wearables wearables={ALL_WEARABLES} settings={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: 25,
  },
  title: { 
    color: Colors.white,
    fontFamily: 'Radley-Regular',
    fontSize: 25,
    marginBottom: 30,
  },
  header: { 
    color: Colors.white,
    fontFamily: 'Radley-Regular',
    fontSize: 20,
    marginVertical: 15,
    marginLeft: 5,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
  },
  instructions: {
    color: Colors.lilac,
    fontFamily: 'Radley-Regular',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 8,
  },
  text: { 
    color: Colors.peach,
    fontFamily: 'Questrial-Regular',
    fontSize: 15,
    padding: 10,
    marginVertical: 5,
    marginLeft: 10
  },
  selected: {
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: Colors.peach
  },
});

export default Settings;