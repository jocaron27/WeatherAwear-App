/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import CaratBlack from '../assets/icons/carat_black.svg';
import CaratWhite from '../assets/icons/carat_white.svg';

const Carat = ({ c, w }) => {
return (
    <>
        {c === 'white'
            ? <CaratWhite width={w} />
            : <CaratBlack width={w} />
        }
    </>
)
}

export default Carat;