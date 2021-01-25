import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import {colors} from '../utils/colors'

const {PRIMARY_COLOR, SECONDARY_COLOR} = colors;

export default function weatherInfo({currentWeather}) {
    const { main: {temp},
            weather: [Details],
            name } = currentWeather;

    const {main, description, icon} = Details;
    const temp_round = Math.floor(temp * 10)/10;
    const iconURL = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    
    return (
        <View style={styles.WeatherInfo}>
            <Text>{name}</Text>
            <Image style={styles.WeatherIcon} source={{uri: iconURL}}/>
            <Text style={styles.textPrimary}>{temp_round}°</Text>
            <Text style={styles.WeatherDescription}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    WeatherInfo: {
        alignItems: 'center',
    },
    WeatherIcon: {
        width: 150,
        height: 100
    },
    WeatherDescription: {
       textTransform: 'uppercase'
    },
    textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOR
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 20
    }
});