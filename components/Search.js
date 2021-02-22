/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import { Colors } from '../config/colors';
import BannerAd from './BannerAd';

const Search = ({ setLocation, keyboard, setKeyboard }) => {
  const [locationInput, setLocationInput] = useState('');
  const [showAd, setShowAd] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (keyboard) setTimer(setTimeout(() => setShowAd(true), 2000));
    if (!keyboard) {
      clearTimeout(timer);
      setShowAd(false);
    }
  }, [keyboard]);

  return (
    <View style={styles.searchContainer}>
      {keyboard && showAd && (
        <View style={styles.ad}>
          <BannerAd location='search' size='mediumRectangle' />
        </View>
      )}
      <TextInput
        inlineImageLeft={keyboard || locationInput ? null : 'search'}
        inlineImagePadding={40}
        style={[styles.input, keyboard || locationInput ? styles.centerText : null]}
        placeholder="Search a new city"
        maxLength={50}
        value={locationInput}
        onChangeText={text => setLocationInput(text)}
        onFocus={() => setKeyboard(true)}
        onBlur={() => setKeyboard(false)}
        onSubmitEditing={() => {
          setLocation(locationInput);
          setLocationInput('');
        }}
        returnKeyType='search'
      />
      {!keyboard &&
        (<TouchableOpacity
          style={styles.button}
          title="Search"
          onPress={() => {
            setLocation(locationInput);
            setLocationInput('');
          }}
          disabled={!locationInput}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  ad: {
    position: 'absolute',
    top: 40,
    width: '100%'
  },
  searchContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 4,
  },
  input: {
    height: 60,
    fontSize: 15,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: Colors.lilac,
    fontFamily: 'Questrial-Regular',
    color: Colors.black,
    borderWidth: 0,
    flexGrow: 5,
    paddingLeft: 15
  },
  centerText: {
    textAlign: 'center',
  },
  button: {
    height: 45,
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingLeft: 30,
    flexGrow: 4,
    marginLeft: 35,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  buttonText: {
    color: Colors.purple4,
    textTransform: 'uppercase',
    fontFamily: 'Questrial-Regular'
  },
});

export default Search;