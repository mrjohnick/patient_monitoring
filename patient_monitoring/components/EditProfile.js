import react, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Title } from "react-native-paper";

import { AdditionalUserInfo, getAdditionalUserInfo, updateCurrentUser, updateProfile, onAuthStateChanged } from "firebase/auth";

import { auth, db } from '../firebase'
import * as Login from "./Login";
import * as Profile from "./Profile";
import TabNavigator from "../App";
import { updateDoc } from "firebase/firestore";


const Edit = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const navigation = useNavigation()



    const abc = () => {
        onAuthStateChanged(auth, name, phone)
            .then(userCredentials => {
                dispatchEvent(
                    Login({
                        email: userCredentials.email,
                        uid: userCredentials.uid,
                        displayName: userCredentials.displayName,
                        phone: userCredentials.phone,
                        photoUrl: userCredentials.photoURL,
                    })
                )
                console.log("Added new information")
            })
            .catch(error => alert(error.message))
    }




    /*const updateInfo = () => {
        updateCurrentUser(auth, name, phone)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.name);
            })
            .catch(error => alert(error.message))
    }*/

    return (
        <View style={styles.container}>
            <Title style={styles.header}> Edit user </Title>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Username"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Phone number"
                    value={phone}
                    onChangeText={text => setPhone(text.replace(/[^0-9]/g, ''))}
                    style={styles.input}
                    maxLength={9}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={abc}
                    style={styles.button}
                >
                    <Text style={styles.button}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default Edit;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: '50%'
    },
    header: {
        fontSize: 20,
        fontWeight: '300',
        transform: [{ translateY: -80 }],
    },
    inputContainer: {
        width: '80%',
        height: '30%',
    },
    radiobuttons: {
        bottom: 40,
    },
    radio: {
        fontWeight: '500',
        marginLeft: 40,

    },
    input: {
        paddingHorizontal: 1,
        paddingVertical: 20,
        borderBottomWidth: 1.5,
        borderBottomColor: '#696969',
        fontSize: 15,
        fontFamily: 'Montserrat_500Medium',
    },
    buttonContainer: {
        top: 200,
        borderRadius: 50,
        width: '80%',
    },
    button: {
        color: 'white',
        fontFamily: 'Montserrat_500Medium',
        fontSize: 15,
        textAlign: 'center',
        width: '100%',
        backgroundColor: '#4166f5',
        padding: 8,
        borderRadius: 25,
    },
})