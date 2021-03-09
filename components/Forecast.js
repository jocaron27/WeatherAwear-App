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
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Colors } from '../config/colors';

const { height, width } = Dimensions.get('window');
const viewportHeight = Math.max(height, width);
const viewportWidth = Math.min(width, height);

const Forecast = ({ forecast = [], unit = 'F', updateIdx, idx }) => {
  if (!forecast || !forecast[idx]) return null;

  const day = forecast[idx];
  const { date, name, region, country, summary, icon, precip, precipType, lo, hi } = day;
  const isUSA = country.includes('United States of America') || country.includes('USA');

  return (
    <>
      <View style={styles.forecast}>
        <View style={styles.dateSwitcher}>
          <TouchableOpacity
            style={styles.arrowArea}
            onPress={() => updateIdx(idx - 1)}
            disabled={idx < 1}
          >
            <View style={[
              styles.arrow,
              styles.arrowLeft,
              idx < 1 ? styles.disabledLeft : null
            ]} />
          </TouchableOpacity>
          <Text style={styles.date}>{date}</Text>
          <TouchableOpacity
            style={styles.arrowArea}
            onPress={() => updateIdx(idx + 1)}
            disabled={idx + 1 >= forecast.length}
          >
            <View style={[
              styles.arrow, 
              styles.arrowRight,
              idx + 1 >= forecast.length ? styles.disabledRight : null
            ]} />
          </TouchableOpacity>
        </View>
        <Text style={styles.location}>
          {`${name}${region && isUSA ? ', ' + region : ''}${isUSA ? '' : ', ' + country}`}
        </Text>
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
                <Text style={[styles.tempValue, styles.hiVal]}>
                  {`${unit === 'F' ? Math.round(hi) : Math.round((hi - 32) * (5 / 9))}°${unit}`}
                </Text>
                <Text style={[styles.tempValue, styles.loVal]}>
                  {`${unit === 'F' ? Math.round(lo) : Math.round((lo - 32) * (5 / 9))}°${unit}`}
                </Text>
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
      justifyContent: 'center',
      flexGrow: 2
    },
      date: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.white,
        fontFamily: 'Poppins-Regular',
        fontSize: 20,
        textAlign: 'center',
        flexGrow: 10,
        lineHeight: 28
      },
      disabledLeft: {
        borderRightColor: 'transparent',
      },
      disabledRight: {
        borderLeftColor: 'transparent',
      },
      arrowArea: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 2,
        height: 33,
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
      maxWidth: viewportWidth * .8
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
