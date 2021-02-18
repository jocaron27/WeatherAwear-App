/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Colors } from './colors';

const { height: viewportHeight, width: viewportWidth } = Dimensions.get('window');

export const Forecast = ({ forecast = [], unit = 'F', updateIdx }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    updateIdx(idx);
  }, [idx])

  if (!forecast || !forecast[idx]) return null;

  const day = forecast[idx];
  const { date, name, region, country, summary, icon, precip, precipType, lo, hi } = day;

  return (
    <>
      <View style={styles.forecast}>
        <View style={styles.dateSwitcher}>
          <TouchableOpacity
            style={[styles.arrow, styles.arrowLeft, idx < 1 ? styles.disabledLeft : null]}
            onPress={() => setIdx(idx - 1)}
            disabled={idx < 1}
          />
          <Text style={styles.date}>{date}</Text>
          <TouchableOpacity
            style={[styles.arrow, styles.arrowRight, idx + 1 >= forecast.length ? styles.disabledRight : null]}
            onPress={() => setIdx(idx + 1)}
            disabled={idx + 1 >= forecast.length}
          />
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
          <Text style={styles.summary}>{summary}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  forecast: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: viewportHeight > 600 ? 20 : 40,
  },
    dateSwitcher: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 2
    },
      date: {
        color: Colors.white,
        fontFamily: 'Poppins-Regular',
        fontSize: 24,
        textAlign: 'center',
        flexGrow: 1,
        lineHeight: 33
      },
      disabledLeft: {
        borderRightColor: Colors.navy,
      },
      disabledRight: {
        borderLeftColor: Colors.navy,
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
        },
    location: {
      color: Colors.white,
      fontFamily: 'Questrial-Regular',
      fontSize: 16,
      textAlign: 'center',
      flexGrow: 2,
    },
    iconSummary: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexGrow: 20,
      width: 400,
      bottom: viewportHeight > 600 ? 10 : 60
    },
      icon: {
        width: 300,
        height: 300,
        zIndex: 2,
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingHorizontal: 30,
        position: 'absolute',
        top: 60,
        right: 5
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
      position: 'absolute',
      top: 270
    },
});

export default Forecast;
