import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {colors} from '../utils/colors'

export default function ReloadIcon({load}) {
    const ReloadIconPlatform = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh';
    return (
        <View style={styles.ReloadIcon}>
            <Ionicons onPress={load} name={ReloadIconPlatform} size={30} color={colors.PRIMARY_COLOR}/>
        </View>
    )
}

const styles = StyleSheet.create({
    ReloadIcon: {
        position: 'absolute',
        top: 70,
        right: 40
    }
});
