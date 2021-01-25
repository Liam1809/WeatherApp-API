import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import {colors} from '../utils/colors'
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'
const {PRIMARY_COLOR} = colors;

export default function WeatherDetails({currentWeather, unitsSystem}) {
    const { main: {feels_like, pressure, humidity},
            wind: {speed}
        } = currentWeather;
    const Feels_like_round = Math.floor(feels_like * 10)/10;
    const unitsSpeed = unitsSystem === 'metric' ? 'm/s' : 'miles/h';
    return (
        <View style={styles.WeatherDetails}>
            <View style={{...styles.WeatherDetailsRow, borderBottomWidth:1, borderColor: PRIMARY_COLOR}}>
                <View style={{...styles.WeatherDetailsBox, borderRightWidth: 1, borderColor: PRIMARY_COLOR}}>
                    <View style={styles.WeatherDetailsRow}>
                        <FontAwesome5 name='temperature-low' size={24} color={PRIMARY_COLOR}/>
                        <View style={styles.WeatherDetailsItems}>
                            <Text>Feels like:</Text>
                            <Text style={styles.textSecondary}>{Feels_like_round}°</Text>
                        </View>
                    </View>   
                </View>
                <View style={styles.WeatherDetailsBox}>
                    <View style={styles.WeatherDetailsRow}>
                    <MaterialCommunityIcons name='speedometer' size={30} color={PRIMARY_COLOR}/>
                        <View style={styles.WeatherDetailsItems}>
                            <Text>Pressure:</Text>
                            <Text style={styles.textSecondary}>{pressure} hPa</Text>
                        </View>
                    </View>  
                </View>
            </View>
            <View style={styles.WeatherDetailsRow}>
                <View style={{...styles.WeatherDetailsBox, borderRightWidth: 1, borderColor: PRIMARY_COLOR}}>
                    <View style={styles.WeatherDetailsRow}>
                    <MaterialCommunityIcons name='water' size={30} color={PRIMARY_COLOR}/>
                        <View style={styles.WeatherDetailsItems}>
                            <Text>Humidity:</Text>
                            <Text style={styles.textSecondary}>{humidity}%</Text>
                        </View>
                    </View>   
                </View>
                <View style={styles.WeatherDetailsBox}>
                    <View style={styles.WeatherDetailsRow}>
                    <MaterialCommunityIcons name='weather-windy' size={30} color={PRIMARY_COLOR}/>
                        <View style={styles.WeatherDetailsItems}>
                            <Text>Wind Speed:</Text>
                            <Text style={styles.textSecondary}>{speed} {unitsSpeed}</Text>
                        </View>
                    </View>  
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    WeatherDetails: {
        marginTop: 'auto',
        margin: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.PRIMARY_COLOR,
        borderRadius: 10
    },
    WeatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    WeatherDetailsBox: {
        flex: 1,
        padding: 20
    },
    WeatherDetailsItems: {
        alignItems: 'flex-end'
    },
    textSecondary: {
        fontSize: 15,
        color: PRIMARY_COLOR,
        fontWeight: '700',
        margin: 7
    }
});