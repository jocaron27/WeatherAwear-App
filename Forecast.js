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
  Image
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

export const Forecast = ({ forecast = [] }) => {
  const [unit, setUnit] = useState('F');

  return (
    <>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
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
                    <Text>{`${lo}°${unit}`}</Text>
                    <Text>High:</Text>
                    <Text>{`${hi}°${unit}`}</Text>
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
});

export default Forecast;
