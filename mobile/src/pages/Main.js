import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

function Main() {
const [currentRegion,setCurrentyRegion] = useState(null)

const [currentRegion,setCurrentyRegion]

    useEffect(() => {
        async function loadInitPosition() {
            const { granted} = await requestPermissionsAsync()
            if(granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy:true
                })
                const {latitude, longitude} = coords
                setCurrentyRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }
    })

    if(!currentRegion){
        return null
    }
    return <MapView initialRegion={currentRegion} style={style.map} />
}


const style = StyleSheet.create({
    map: {
        flex: 1,
    }
})
export default Main