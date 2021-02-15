/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import CaratBlack from './assets/icons/carat_black.svg';
import CaratWhite from './assets/icons/carat_white.svg';

export const Carat = ({ c, w }) => {
    console.log(c);
    return (
        <>
            {c === 'white'
                ? <CaratWhite width={w} />
                : <CaratBlack width={w} />
            }
        </>
    )
}