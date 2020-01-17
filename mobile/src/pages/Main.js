import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'


function Main({ navigation }) {
    const [currentRegion, setCurrentyRegion] = useState(null)
    useEffect(() => {
        async function loadInitPosition() {
            const { granted } = await requestPermissionsAsync()
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                })
                const { latitude, longitude } = coords
                setCurrentyRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }
        loadInitPosition()
    }, [])

    if (!currentRegion) {
        return null
    }
    return (
        <>
            <MapView initialRegion={currentRegion} style={style.map} >
                <Marker coordinate={{ latitude: -23.5114123, longitude: -46.4408931 }} >
                    <Image style={style.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/49004830?s=460&v=4' }} />
                    <Callout onPress={() => {
                        //navegação
                        navigation.navigate('Profile', { github_username: 'lordradamanthys' })

                    }}>
                        <View style={style.callout}>
                            <Text style={style.devName}>Mateus</Text>
                            <Text style={style.devBio}>Bio dsfhsjhkjdshkjfdhjfkshjkd</Text>
                            <Text style={style.devThechs}>ReactJs</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style={style.searchForm}>
                <TextInput style={style.searchInput}
                    placeholder="Buscar Devs"
                    placeholderTextColor="#999"
                    autoCapitalize="words" />

                <TouchableOpacity onPress={() => { }} style={style.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </>
    )
}


const style = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devThechs: {
        marginTop: 5
    },
    searchForm: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 3
    },
    loadButton: {
        width:50,
        height:50,
        backgroundColor:"#8e4dff",
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:15
    }
})
export default Main