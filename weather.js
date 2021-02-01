import axios from 'axios';
const mockData = require('./mockData.json');
import { storeCacheData, getCacheData, getAllCacheKeys, clearCacheValue } from './cache';

const useMock = true;

const Skycons = {
    CLEAR_DAY: 'CLEAR_DAY',
    PARTLY_CLOUDY_DAY: 'PARTLY_CLOUDY_DAY',
    CLOUDY: 'CLOUDY',
    RAIN: 'RAIN',
    SLEET: 'SLEET',
    SNOW: 'SNOW',
    WIND: 'WIND',
    FOG: 'FOG',
}

const WeatherToSkycon = {
    // CLEAR_DAY
    1000: 'CLEAR_DAY',
    // PARTLY_CLOUDY_DAY
    1003: 'PARTLY_CLOUDY_DAY',
    // CLOUDY
    1006: 'CLOUDY',
    1009: 'CLOUDY',
    // RAIN
    1030: 'RAIN',
    1063: 'RAIN',
    1087: 'RAIN',
    1150: 'RAIN',
    1153: 'RAIN',
    1180: 'RAIN',
    1183: 'RAIN',
    1186: 'RAIN',
    1189: 'RAIN',
    1192: 'RAIN',
    1195: 'RAIN',
    1240: 'RAIN',
    1243: 'RAIN',
    1246: 'RAIN',
    1273: 'RAIN',
    1276: 'RAIN',
    // SLEET
    1069: 'SLEET',
    1072: 'SLEET',
    1168: 'SLEET',
    1171: 'SLEET',
    1198: 'SLEET',
    1201: 'SLEET',
    1204: 'SLEET',
    1207: 'SLEET',
    1237: 'SLEET',
    1249: 'SLEET',
    1252: 'SLEET',
    1261: 'SLEET',
    1264: 'SLEET',
    // SNOW
    1066: 'SNOW',
    1114: 'SNOW',
    1117: 'SNOW',
    1210: 'SNOW',
    1213: 'SNOW',
    1216: 'SNOW',
    1219: 'SNOW',
    1222: 'SNOW',
    1225: 'SNOW',
    1255: 'SNOW',
    1258: 'SNOW',
    1279: 'SNOW',
    1282: 'SNOW',
    // WIND - none right now
    // FOG
    1135: 'FOG',
    1147: 'FOG',
}

const getSkycon = (weatherCode) => {
    if (!weatherCode || !WeatherToSkycon[weatherCode]) return Skycons[CLEAR_DAY];
    
    return Skycons[WeatherToSkycon[weatherCode]];
}

/** Extract relevant data for daily weather forecast
 * See additional available properties at https://www.weatherapi.com/docs
 */
const formatWeatherResponse = ({ data }) => {
    const { forecast, location } = data;
    const { name, region, country } = location;

    return forecast.forecastday.map(({ day, date }) => {
        const icon = getSkycon(day.condition.code)
        return {
            name,
            region,
            country,
            date,
            summary: day.condition.text,
            icon,
            precip: icon === 'SNOW' ? day.daily_chance_of_snow : day.daily_chance_of_rain,
            precipType: icon === 'SNOW' ? 'snow' : 'rain',
            hi: day.maxtemp_f,
            lo: day.mintemp_f,
            avg: day.avgtemp_f,
        };
    });
};

export const clearOldWeatherCache = async () => {
    const currentDate = new Date(Date.now()).toDateString();
    const keys = await getAllCacheKeys();
    const forecastKeys = keys.filter(key => key.includes(`forecast-`));
    forecastKeys.forEach(key => {
        if (!key.startsWith(`forecast-${currentDate}`)) clearCacheValue(key);
    });
}

/** Requests and formats weather forecast data */
export const getWeather = async ({ location = '' } ) => {
    // First, check cache  
    const currentDate = new Date(Date.now()).toDateString();
    const cacheKey = `forecast-${currentDate}${location}`;
    const keys = await getAllCacheKeys();
    if (keys && keys.length && keys.includes(cacheKey)) {
        try {
            const cacheData = await getCacheData(cacheKey);
            return formatWeatherResponse(cacheData);
        } catch(error) {
            // Cache data is bad, so clear
            clearCacheValue(cacheKey);
            console.error(error); // TODO: send this somewhere?
        }
    }
    // Return data
    if (useMock) {
        storeCacheData(cacheKey, mockData);
        return formatWeatherResponse(mockData);
    }
    else return await axios.get(`https://us-central1-weatherwear-185516.cloudfunctions.net/forecast?location=${location}`)
        .then(response => {
            console.log('res', response);
            if (response.error) {
                console.error(error); // TODO: send this somewhere?
                return null;
            }
            storeCacheData(cacheKey, response);
            return formatWeatherResponse(response);
        })
        .catch(error => {
            console.error(error); // TODO: send this somewhere?
        });
}