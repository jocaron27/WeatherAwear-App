import * as Sentry from '@sentry/react-native';
import axios from 'axios';
import * as mockData from './mockData.json';
import { storeCacheData, getCacheData, getAllCacheKeys, clearCacheValue } from './cache';
import { getWearables } from './wearables';
import Toast from 'react-native-simple-toast';
import moment from 'moment';

const useMock = false;
const useCache = true;

const ANGLED_RAIN = require('../assets/weather/ANGLED_RAIN.png');
const BIG_LITTLE_SNOW = require('../assets/weather/BIG_LITTLE_SNOW.png');
const BIG_RAIN = require('../assets/weather/BIG_RAIN.png');
const BIG_SNOW = require('../assets/weather/BIG_SNOW.png');
const BLIZZARD = require('../assets/weather/BLIZZARD.png');
const CLOUDY = require('../assets/weather/CLOUDY.png');
const FOG = require('../assets/weather/FOG.png');
const HAIL = require('../assets/weather/HAIL.png');
const HEAVY_RAIN = require('../assets/weather/HEAVY_RAIN.png');
const LIGHT_RAIN = require('../assets/weather/LIGHT_RAIN.png');
const LIGHT_SNOW = require('../assets/weather/LIGHT_SNOW.png');
const MED_RAIN = require('../assets/weather/MED_RAIN.png');
const MED_SNOW = require('../assets/weather/MED_SNOW.png');
const PARTLY_CLOUDY = require('../assets/weather/PARTLY_CLOUDY.png');
const SNOW_WIND = require('../assets/weather/SNOW_WIND.png');
const SUN = require('../assets/weather/SUN.png');
const THUNDER = require('../assets/weather/CLOUD_ZAP.png');
const THUNDERSTORM = require('../assets/weather/THUNDERSTORM.png');

const WeatherIcons = {
    1000: SUN,
    1003: PARTLY_CLOUDY,
    1006: CLOUDY,
    1009: CLOUDY,
    1030: BIG_RAIN,
    1063: LIGHT_RAIN,
    1066: LIGHT_SNOW,
    1069: ANGLED_RAIN,
    1072: LIGHT_RAIN,
    1087: THUNDER,
    1114: SNOW_WIND,
    1117: BLIZZARD,
    1135: FOG,
    1147: FOG,
    1150: LIGHT_RAIN,
    1153: LIGHT_RAIN,
    1168: LIGHT_RAIN,
    1171: MED_RAIN,
    1180: LIGHT_RAIN,
    1183: LIGHT_RAIN,
    1186: MED_RAIN,
    1189: MED_RAIN,
    1192: HEAVY_RAIN,
    1195: HEAVY_RAIN,
    1198: LIGHT_RAIN,
    1201: LIGHT_RAIN,
    1204: ANGLED_RAIN,
    1207: ANGLED_RAIN,
    1210: LIGHT_SNOW,
    1213: MED_SNOW,
    1216: MED_SNOW,
    1219: MED_SNOW,
    1222: MED_SNOW,
    1225: BIG_LITTLE_SNOW,
    1237: HAIL,
    1240: LIGHT_RAIN,
    1243: MED_RAIN,
    1246: BIG_RAIN,
    1249: ANGLED_RAIN,
    1252: ANGLED_RAIN,
    1255: LIGHT_SNOW,
    1258: BIG_SNOW,
    1261: HAIL,
    1264: HAIL,
    1273: THUNDERSTORM,
    1276: THUNDERSTORM,
    1279: LIGHT_SNOW,
    1282: MED_SNOW,
}

const snowCodes = {
    1066: true,
    1069: true,
    1114: true,
    1117: true,
    1204: true,
    1207: true,
    1210: true,
    1213: true,
    1216: true,
    1219: true,
    1222: true,
    1225: true,
    1249: true,
    1252: true,
    1255: true,
    1258: true,
    1279: true,
    1282: true,
}

const getPrecipType = (weatherCode) => {
    return weatherCode && snowCodes[weatherCode] ? 'SNOW' : 'RAIN';
}

/** Extract relevant data for daily weather forecast
 * See additional available properties at https://www.weatherapi.com/docs
 */
export const formatWeatherResponse = ({ data }) => {
    const { forecast, location } = data;
    const { name, region, country } = location;

    return forecast.forecastday.map(({ day, date }) => {
        const formattedDate = moment(date).format('LL').slice(0, -6);
        const code = day?.condition?.code || 1000;
        const type = getPrecipType(code);
        const precip = type === 'SNOW' ? Number(day.daily_chance_of_snow) : Number(day.daily_chance_of_rain);
        const precipType = type === 'SNOW' ? 'snow' : 'rain';
        const summary = day?.condition?.text?.toLowerCase();
        return {
            name,
            region,
            country,
            date: formattedDate,
            summary,
            icon: WeatherIcons[code],
            precip,
            precipType,
            hi: day.maxtemp_f,
            lo: day.mintemp_f,
            avg: day.avgtemp_f,
            wearablesDay: getWearables({
                temp: day.maxtemp_f,
                precip,
                precipType,
                summary,
            }),
            wearablesNight: getWearables({
                temp: day.mintemp_f,
                precip,
                precipType,
                summary,
            })
        };
    });
};

export const clearOldWeatherCache = async (all = false) => {
    const currentDate = new Date(Date.now()).toDateString();
    const keys = await getAllCacheKeys();
    const forecastKeys = keys.filter(key => key.includes(`forecast-`));
    forecastKeys.forEach(key => {
        if (all) clearCacheValue(key);
        else if (!key.startsWith(`forecast-${currentDate}`)) clearCacheValue(key);
    });
}

/** Requests and formats weather forecast data */
export const getWeather = async ({ location = '' } ) => {
    const currentDate = new Date(Date.now()).toDateString();
    const cacheKey = `forecast-${currentDate}${location}`;

    // First, check cache  
    if (useCache) {
        const keys = await getAllCacheKeys();
        if (keys && keys.length && keys.includes(cacheKey)) {
            try {
                const cacheData = await getCacheData(cacheKey);
                return formatWeatherResponse(cacheData);
            } catch(error) {
                // Cache data is bad, so clear
                clearCacheValue(cacheKey);
                Sentry.captureException(error);
            }
        }
    }

    // Return data
    if (useMock) {
        storeCacheData(cacheKey, mockData);
        return formatWeatherResponse(mockData);
    }
    else return await axios.get(`https://us-central1-weatherwear-185516.cloudfunctions.net/forecast?location=${location}`)
        .then(response => {
            if (response.error) {
                Sentry.captureException(response.error);
                Toast.show('Unable to get weather data');
                return null;
            }
            storeCacheData(cacheKey, response);
            return formatWeatherResponse(response);
        })
        .catch(error => {
            Sentry.captureException(error);
            Toast.show('Unable to get weather data');
        });
}