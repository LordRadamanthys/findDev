import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard, ProgressBarAndroid } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'
import api from '../services/api'
import { connect, disconnect, subscribeToNewDevs, removeDevs } from '../services/socket'


function CreateAccount() {
    
    const [techs, setTechs] = useState([])
    const [latitude, setLatitude] = useState([])
    const [longitude, setLongitude] = useState([])
    const [githubName, setGithubname] = useState([])


    async function createDev() {

    }
    return (
        <>
            <View style={styles.form}>
                <Text style={{ marginLeft: 20, marginTop: 20, textAlign: "center", fontSize:16 }}>Preencha os campos</Text>
                <TextInput
                    style={styles.inputs}
                    name="githubName"
                    placeholder="Nome no GitHub"
                    placeholderTextColor="#999"
                    onChangeText={setGithubname}
                    value={githubName}
                    autoCapitalize="words" />

                <TextInput
                    style={styles.inputs}
                    name="techs"
                    placeholder="Tecnologias"
                    placeholderTextColor="#999"
                    onChangeText={setTechs}
                    value={techs}
                    autoCapitalize="words" />

                <TextInput
                    style={styles.inputs}
                    name="latitude"
                    placeholder="latitude"
                    placeholderTextColor="#999"
                    onChangeText={setLatitude}
                    value={latitude}
                    autoCapitalize="words" />

                <TextInput
                    style={styles.inputs}
                    name="longitude"
                    placeholder="longitude"
                    placeholderTextColor="#999"
                    onChangeText={setLongitude}
                    value={longitude}
                    autoCapitalize="words" />


                <TouchableOpacity onPress={createDev} style={styles.buttom}>
                    <Text style={{ textAlign: "center", color: "#FFF" }}>Cadastar</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: "ffff",
        marginTop: 20,
        alignItems: "center",
        width: 320,
        backgroundColor: "#ffff",
        shadowColor: "black",
        marginLeft: 30,
        borderRadius: 10
    },
    inputs: {
        textAlign: "center",
        marginTop: 20,
        height: 50,
        borderRadius: 10,
        width: 250,
        backgroundColor: "#eee",


    },
    buttom: {
        alignItems: "center",
        backgroundColor: "#6931ca",
        width: 100,
        marginTop: 30,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 20

    }
})
export default CreateAccount