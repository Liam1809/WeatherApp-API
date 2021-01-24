import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

const WEATHER_API_KEY = '9fad3d395e743404766133bf2ae85202';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);


  useEffect(() => {
    load();
  }, []);

  async function load () {
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
      const WEATHER_URL = `${WEATHER_BASE_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
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
      
    }
  }

  if(currentWeather) {
    const {main: {temp}} = currentWeather;
    return (
      <View style={styles.container}>
        <Text>{temp}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }


  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
