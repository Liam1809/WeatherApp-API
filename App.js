import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import {WEATHER_API_KEY} from '@env';
import {colors} from './utils/colors';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';


const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';


export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');


  useEffect(() => {
    load();
  }, [unitsSystem]);

  async function load () {
    setCurrentWeather(null);
    setErrorMessage(null);

    try {
      // get request permision
      let {status} = await Location.requestPermissionsAsync();
      
      if(status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
        return;
      }
      // get current location
      const location = await Location.getCurrentPositionAsync();
      // get latitude and longitude of location
      const {latitude, longitude} = location.coords;
      // URL path
      const WEATHER_URL = `${WEATHER_BASE_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
      // request API call
      const response = await fetch(WEATHER_URL);
      // transform API response to json
      const result = await response.json();

      if(response.ok) {
        setCurrentWeather(result);
      }
      else {
        setErrorMessage(result.message);
      }

      // alert(`latitude:${latitude}, longitude:${longitude}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  if(currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
          <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem}/>
          <ReloadIcon load={load}/>
          <WeatherInfo currentWeather={currentWeather}/>
          </View>
          <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>
      </View>
    );
  }
  else if(errorMessage){
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={colors.PRIMARY_COLOR}/>
        <StatusBar style="auto" />
      </View>
    ); 
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  main: {
    flex: 1,
    justifyContent: 'center'
  }
});
