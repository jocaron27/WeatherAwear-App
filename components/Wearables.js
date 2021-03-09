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
  TouchableOpacity,
  Text,
  Image,
  View,
} from 'react-native';
import TimeOfDay from './TimeOfDay';
import { Colors } from '../config/colors'
import { storeCacheData, getCacheData } from '../config/cache';

const Wearables = ({
  wearables = [],
  timeOfDay,
  setTimeOfDay,
  settings,
}) => {
  const [hidden, setHidden] = useState({});
  const [displayWearables, setDisplayWearables] = useState([]);

  const getHiddenWearables = async () =>{
    const hiddenSaved = await getCacheData('hiddenWearables');
    if (hiddenSaved) setHidden(hiddenSaved);
  }

  const removeHidden = (name) => {
    const newHidden = {...hidden};
    delete newHidden[name];
    return newHidden;
  }

  const toggleHide = async (wearable) => {    if (!settings) return;
    let newHidden = {...hidden};
    if (!wearable.hidden && !wearable.muted) {
      newHidden[wearable.name] = true;
    }
    else {
      newHidden = removeHidden(wearable.name);
    }
      setHidden(newHidden);
      storeCacheData('hiddenWearables', newHidden);
  }

  useEffect(() => {
    getHiddenWearables();
  }, [wearables]);

  useEffect(() => {
    const wearablesWithHideLogic = [...wearables].map(({...wearable}) => {
      const toHide = hidden[wearable.name];
      wearable.muted = toHide;
      wearable.hidden = toHide;
      return wearable;
    });
    setDisplayWearables(wearablesWithHideLogic);
  }, [hidden, timeOfDay]);

  return (
    <View style={styles.body}>
      {timeOfDay && <TimeOfDay 
        timeOfDay={timeOfDay}
        setTimeOfDay={setTimeOfDay}
      />}
      <View style={settings ? styles.wrap : null}>
        {displayWearables.map(wearable => (
          <View 
            key={settings+wearable.name+wearable.muted+wearable.hidden}
            style={[
              settings ? styles.wearableSmall : styles.wearable,
              wearable.muted && styles.muted,
              !settings && wearable.hidden ? styles.hidden : null,
            ]}
          >
            <TouchableOpacity
              onPress={() => toggleHide(wearable)}
              disabled={!settings}
            >
              <Image source={wearable.icon} style={settings ? styles.iconSmall : styles.icon} />
            </TouchableOpacity>
            <Text style={settings ? styles.wearableTextSmall : styles.wearableText}>{wearable.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  muted: {
    opacity: .3
  },
  hidden: {
    display: 'none'
  },
  wearableSmall: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  wearable: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 40
  },
  icon: {
    width: 150,
    height: 150,
  },
  iconSmall: {
    width: 90,
    height: 90,
  },
  wearableText: {
    color: Colors.white,
    fontFamily: 'Questrial-Regular',
    fontSize: 16,
    paddingTop: 12
  },
  wearableTextSmall: {
    color: Colors.white,
    fontFamily: 'Questrial-Regular',
    fontSize: 14,
    paddingTop: 10
  }
});

export default Wearables;


