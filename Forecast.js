/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';
import { storeCacheData, getCacheData } from './cache';

import { Colors } from 'react-native/Libraries/NewAppScreen';

export const Forecast = ({ forecast = [] }) => {
  const [unit, setUnit] = useState(null);

  useEffect(() => {
    getUnitPref();
  }, []);

  const getUnitPref = async () => {
    const pref = await getCacheData('unitPref');
    if (!pref) {
      setUnitPref('F');
    } else {
      setUnit(pref);
    }
  }

  const setUnitPref = (pref) => {
    setUnit(pref);
    storeCacheData('unitPref', pref);
  }

  const toggleUnitPref = () => {
    console.log('toggling');
    const newPref = unit === 'F' ? 'C' : 'F';
    setUnitPref(newPref);
  }

  if (!unit) return null;

  return (
    <>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <TouchableOpacity style={styles.button} onPress={toggleUnitPref}>
              <Text>
                {`Switch to ${unit === 'F' ? 'C' : 'F'}`}
              </Text>
            </TouchableOpacity>
            {forecast.map(day => {
                const { date, name, region, country, summary, icon, precip, precipType, lo, hi } = day;
                return (
                  <View key={date}>
                    <Text>{`${name}, ${region}, ${country}`}</Text>
                    <Text>{date}</Text>
                    <Text>{summary}</Text>
                    <Image 
                      source={icon} 
                      style={{ width: 400, height: 400 }}
                    />
                    <Text>{`${precip}% chance of ${precipType}`}</Text>
                    <Text>Low:</Text>
                    <Text>{`${unit === 'F' ? Math.round(lo) : Math.round((lo - 32) * (5 / 9))}°${unit}`}</Text>
                    <Text>High:</Text>
                    <Text>{`${unit === 'F' ? Math.round(hi) : Math.round((hi - 32) * (5 / 9))}°${unit}`}</Text>
                  </View>
                )
              }
          )}
          </View>
        </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  button: {
    height: 45,
    backgroundColor: '#ea6333',
    paddingVertical: 14,
    paddingHorizontal: 37,
  },
});

export default Forecast;
