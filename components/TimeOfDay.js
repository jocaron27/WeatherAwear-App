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
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../config/colors';

export const TimeOfDay = ({
  timeOfDay = 'day',
  setTimeOfDay,
}) => {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => setTimeOfDay('day')}
        style={[styles.button, styles.day, timeOfDay === 'day' ? styles.selected : null]}
      >
        <Text style={[styles.text, styles.dayText]}>day</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => setTimeOfDay('night')}
        style={[styles.button, styles.night, timeOfDay === 'night' ? styles.selected : null]}
      >
        <Text style={[styles.text, styles.nightText]}>night</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  selected: {
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  button: {
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginHorizontal: 5,
  },
  text: {
    fontFamily: 'Radley-Regular',
    fontSize: 14
  },
  day: {
    backgroundColor: Colors.lilac
  },
  dayText: {
    color: Colors.navy
  },
  night: {
    backgroundColor: Colors.navy,
  },
  nightText: {
    color: Colors.lilac
  }
});

export default TimeOfDay;