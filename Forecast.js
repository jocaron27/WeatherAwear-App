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
  Dimensions
} from 'react-native';
import { Colors } from './colors';

const { height: viewportHeight } = Dimensions.get('window');

export const Forecast = ({ forecast = [], unit = 'F' }) => {

  return (
    <>
      <View style={styles.body}>
        {forecast.slice(0,1).map(day => {
            const { date, name, region, country, summary, icon, precip, precipType, lo, hi } = day;
            return (
              <View key={date} style={styles.forecast}>
                <View style={styles.dateSwitcher}>
                  <View style={[styles.arrow, styles.arrowLeft]} />
                  <Text style={styles.date}>{date}</Text>
                  <View style={[styles.arrow, styles.arrowRight]} />
                </View>
                <Text style={styles.location}>{`${name}, ${region}, ${country}`}</Text>
                <View style={styles.iconSummary}>
                  <Image 
                    source={icon} 
                    style={styles.icon}
                  />
                  <View style={styles.info}>
                    <View style={styles.temp}>
                      <View style={styles.tempLabelContainer}>
                        <Text style={[styles.tempLabel, styles.hi]}>High</Text>
                        <Text style={[styles.tempLabel, styles.lo]}>Low</Text>
                      </View>
                      <View style={styles.tempValueContainer}>
                        <Text style={[styles.tempValue, styles.hiVal]}>{`${unit === 'F' ? Math.round(hi) : Math.round((hi - 32) * (5 / 9))}°${unit}`}</Text>
                        <Text style={[styles.tempValue, styles.loVal]}>{`${unit === 'F' ? Math.round(lo) : Math.round((lo - 32) * (5 / 9))}°${unit}`}</Text>
                      </View>
                    </View>
                    <Text style={styles.precip}>{`${precip}% chance of ${precipType}`}</Text>
                  </View>
                </View>
                <Text style={styles.summary}>{summary}</Text>
              </View>
            )
          }
      )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: '100%',
    flex: 1
  },
  body: {
    flexGrow: 1,
    height: '100%',
    flex: 1
  },
  forecast: {
    display: 'flex',
    alignItems: 'center'
  },
  dateSwitcher: {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
    textAlign: 'center',
    flexGrow: 1,
    lineHeight: 33
  },
  location: {
    color: Colors.white,
    fontFamily: 'Questrial-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 14,
  },
  precip: {
    color: Colors.white,
    fontFamily: 'Questrial-Regular',
    fontSize: 11,
    margin: 3,
  },
  summary: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Questrial-Regular',
    fontSize: 14,
  },
  iconSummary: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 200,
    height: 250,
    marginBottom: viewportHeight / 38,
    marginLeft: 50
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    paddingTop: 100,
    marginLeft: -84,
    marginTop: -40
  },
  icon: {
    width: 300,
    height: 300,
    zIndex: 2,
    marginRight: -78,
  },
  temp: {
    backgroundColor: '#9674f84f',
    borderRadius: 15,
    color: Colors.white,
    width: 150,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  tempLabelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tempLabel: {
    color: Colors.white,
    textAlign: 'left',
    fontFamily: 'Questrial-Regular',
    fontSize: 14,
  },
  hi: {
    textAlign: 'left',
  },
  lo: {
    textAlign: 'right',
  },
  tempValueContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tempValue: {
    color: Colors.white,
    fontFamily: 'Questrial-Regular',
    fontSize: 18,
    bottom: 6,
  },
  hiVal: {
    textAlign: 'left',
  },
  loVal: {
    textAlign: 'right',
  },
  arrow: {
    width: 0, 
    height: 0, 
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 6,
    borderTopColor: 'transparent',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent',
    paddingHorizontal: 10
  },
  arrowLeft: {
    borderRightWidth: 6,
    borderRightColor: Colors.white,
    borderLeftWidth: 0,
  },
  arrowRight: {
    borderLeftWidth: 6,
    borderLeftColor: Colors.white,
    borderRightWidth: 0
  }
});

export default Forecast;
