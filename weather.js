import axios from 'axios';
import * as mockData from './mockData.json';
import { storeCacheData, getCacheData, getAllCacheKeys, clearCacheValue } from './cache';

const useMock = true;
const useCache = false;

const WeatherIcons = {
    1000: require('./assets/weather/SUN.png'),
    1003: require('./assets/weather/PARTLY_CLOUDY.png'),
    1006: require('./assets/weather/CLOUDY.png'),
    1009: require('./assets/weather/CLOUDY.png'),
    1030: require('./assets/weather/BIG_RAIN.png'),
    1063: require('./assets/weather/LIGHT_RAIN.png'),
    1066: require('./assets/weather/LIGHT_SNOW.png'),
    1069: require('./assets/weather/ANGLED_RAIN.png'),
    1072: require('./assets/weather/LIGHT_RAIN.png'),
    1087: require('./assets/weather/THUNDER.png'),
    1114: require('./assets/weather/SNOW_WIND.png'),
    1117: require('./assets/weather/BLIZZARD.png'),
    1135: require('./assets/weather/FOG.png'),
    1147: require('./assets/weather/FOG.png'),
    1150: require('./assets/weather/LIGHT_RAIN.png'),
    1153: require('./assets/weather/LIGHT_RAIN.png'),
    1168: require('./assets/weather/LIGHT_RAIN.png'),
    1171: require('./assets/weather/MED_RAIN.png'),
    1180: require('./assets/weather/LIGHT_RAIN.png'),
    1183: require('./assets/weather/LIGHT_RAIN.png'),
    1186: require('./assets/weather/MED_RAIN.png'),
    1189: require('./assets/weather/MED_RAIN.png'),
    1192: require('./assets/weather/HEAVY_RAIN.png'),
    1195: require('./assets/weather/HEAVY_RAIN.png'),
    1198: require('./assets/weather/LIGHT_RAIN.png'),
    1201: require('./assets/weather/LIGHT_RAIN.png'),
    1204: require('./assets/weather/ANGLED_RAIN.png'),
    1207: require('./assets/weather/ANGLED_RAIN.png'),
    1210: require('./assets/weather/LIGHT_SNOW.png'),
    1213: require('./assets/weather/MED_SNOW.png'),
    1216: require('./assets/weather/MED_SNOW.png'),
    1219: require('./assets/weather/MED_SNOW.png'),
    1222: require('./assets/weather/MED_SNOW.png'),
    1225: require('./assets/weather/BIG_LITTLE_SNOW.png'),
    1237: require('./assets/weather/HAIL.png'),
    1240: require('./assets/weather/LIGHT_RAIN.png'),
    1243: require('./assets/weather/MED_RAIN.png'),
    1246: require('./assets/weather/BIG_RAIN.png'),
    1249: require('./assets/weather/ANGLED_RAIN.png'),
    1252: require('./assets/weather/ANGLED_RAIN.png'),
    1255: require('./assets/weather/LIGHT_SNOW.png'),
    1258: require('./assets/weather/BIG_SNOW.png'),
    1261: require('./assets/weather/HAIL.png'),
    1264: require('./assets/weather/HAIL.png'),
    1273: require('./assets/weather/THUNDERSTORM.png'),
    1276: require('./assets/weather/THUNDERSTORM.png'),
    1279: require('./assets/weather/LIGHT_SNOW.png'),
    1282: require('./assets/weather/MED_SNOW.png'),
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
const formatWeatherResponse = ({ data }) => {
    const { forecast, location } = data;
    const { name, region, country } = location;

    return forecast.forecastday.map(({ day, date }) => {
        const code = day?.condition?.code || 1000;
        const type = getPrecipType(code);
        return {
            name,
            region,
            country,
            date,
            summary: day?.condition?.text,
            icon: WeatherIcons[code],
            precip: type === 'SNOW' ? day.daily_chance_of_snow : day.daily_chance_of_rain,
            precipType: type === 'SNOW' ? 'snow' : 'rain',
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
                console.error(error);
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
            console.log('res', response);
            if (response.error) {
                console.error(error);
                return null;
            }
            storeCacheData(cacheKey, response);
            return formatWeatherResponse(response);
        })
        .catch(error => {
            console.error(error);
        });
}