import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Alert, ProgressBarAndroid } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'
import api from '../services/api'
import { connect, disconnect, subscribeToNewDevs, removeDevs } from '../services/socket'
import Account from './Account';



function Main({ navigation }) {
    const [devs, setDevs] = useState([])
    const [visible, setVisible] = useState(null)
    const [currentRegion, setCurrentyRegion] = useState(null)
    const [techs, setTechs] = useState('')

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
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                })
            }
        }

        loadInitPosition()
    }, [])

    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev]))
    }, [devs])

    /*useEffect(()=>{
        removeDevs(loadDevs())
    },[devs])*/

    function setupWebsocket() {
        disconnect()
        const { latitude, longitude } = currentRegion

        connect(
            latitude,
            longitude,
            techs
        )
    }

    async function loadDevs() {
        if (techs.length < 1) return Alert.alert('Atenção!', 'Preencha o campo de pesquisa!')
        setVisible(true)
        const { latitude, longitude } = currentRegion

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs: techs
            }
        })
        setVisible(false)
        setDevs(response.data)

        setupWebsocket()

    }


    function handleRegionChanged(region) {
        setCurrentyRegion(region)
    }
    if (!currentRegion) {
        return null
    }
    if (visible) {
        return (
            <View style={style.container}>
                <ProgressBarAndroid style={style.progress} />
            </View>)
    } else {
        return (

            <>

                <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={style.map} >

                    {devs.map(dev => (
                        <Marker key={dev._id} coordinate={
                            {
                                latitude: dev.location.coordinates[1],
                                longitude: dev.location.coordinates[0]
                            }
                        } >
                            <Image style={style.avatar} source={{ uri: dev.avatar_url }} />
                            <Callout onPress={() => {
                                //navegação
                                navigation.navigate('Profile', { github_username: dev.github_username })

                            }}>
                                <View style={style.callout}>
                                    <Text style={style.devName}>{dev.name}</Text>
                                    <Text style={style.devBio}>{dev.bio}</Text>
                                    <Text style={style.devThechs}>{dev.techs.join(', ')}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
                <View style={style.searchForm}>
                    <TextInput style={style.searchInput}
                        placeholder="Buscar Devs..."
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        value={techs}
                        onChangeText={setTechs}
                    />


                    <TouchableOpacity onPress={loadDevs} style={style.loadButton}>
                        <MaterialIcons name="my-location" size={20} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Account', { locate: currentRegion })} style={style.loadButton}>
                        <MaterialIcons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </>
        )
    }
}


const style = StyleSheet.create({
    map: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    progress: {
        color: "#8a2be2"
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
        width: 50,
        height: 50,
        backgroundColor: "#8e4dff",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
})
export default Main