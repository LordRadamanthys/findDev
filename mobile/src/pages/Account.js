import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Alert, ProgressBarAndroid } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'
import api from '../services/api'
import { connect, disconnect, subscribeToNewDevs, removeDevs } from '../services/socket'


function Account({ navigation }) {

    const [techs, setTechs] = useState('')
    const [visible, setVisibleLoading] = useState(false)
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [githubName, setGithubname] = useState('')

    useEffect(() => {
        function loadPosition() {
            setLatitude(navigation.getParam('locate').latitude)
            setLongitude(navigation.getParam('locate').longitude)
        }
        loadPosition()
    }, [])
    async function createDev() {
        //alert(navigation.getParam('locate').longitude)
        if (!validateFields()) return Alert.alert('Atenção!', 'Preencha todos os campos!')
        setVisibleLoading(true)
        const response = await api.post('/devs', {

            github_username: githubName,
            techs: techs,
            latitude: latitude,
            longitude: longitude

        })
        setVisibleLoading(false)
        alertDialog(response, navigation)

    }

    function validateFields() {
        if (githubName == '' || !techs) return false

        return true
    }





    if (visible) {
        return (
            <View style={styles.container}>
                <ProgressBarAndroid style={styles.progress} />
            </View>)
    } else {
        return (

            <>
                <View style={styles.div}>
                    <View style={styles.form}>
                        <Text style={{ marginLeft: 20, marginBottom:30,marginTop: 20, textAlign: "center", fontSize: 16, fontWeight:"bold" }}>Preencha os campos</Text>
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
                            value={latitude + ""}
                            editable={false}
                            autoCapitalize="words" />

                        <TextInput
                            style={styles.inputs}
                            name="longitude"
                            placeholder="longitude"
                            placeholderTextColor="#999"
                            onChangeText={setLongitude}
                            editable={false}
                            value={longitude + ""}
                        />



                        <TouchableOpacity onPress={createDev} style={styles.buttom}>
                            <Text style={{ textAlign: "center", color: "#FFF" }}>Cadastar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }
}

function alertDialog(response, navigation) {
    var title = ""
    var message = ""

    if (response.data.error) {
        title = 'Erro ao realizar o cadastro'
        message = `Erro: ${response.data.error}`
    } else {
        title = 'Cadastro realizado!'
        message = `Parabéns ${response.data.name}, seu cadastro foi efetuado`
    }

    Alert.alert(
        title,
        message,
        [
            /*{
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },*/
            { text: 'OK', onPress: !response.data.error ? () => navigation.goBack(null) : "" },
        ],
        { cancelable: false },
    );
}

const styles = StyleSheet.create({
    div: {
        alignItems:"center",
        justifyContent: 'center',
        height:700, 
    },
    form: {
        flex: 1,
        backgroundColor: "#ffff",
        marginTop: 50,
        alignItems: "center",
        width: 350,
        backgroundColor: "#ffff",
        shadowColor: "black",
        borderRadius: 10
    },
    inputs: {
        textAlign: "center",
        marginTop: 30,
        height: 50,
        borderRadius: 10,
        width: 300,
        backgroundColor: "#eee",


    },
    buttom: {
        alignItems: "center",
        backgroundColor: "#6931ca",
        width: 250,
        marginTop: 50,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 20

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    progress: {
        color: "#8a2be2"
    },
})
export default Account