import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Profile from "./Profile";


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            navigation.replace("TabNavigator")
        }
        })

        return unsubscribe
    }, [])

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
          })
          .catch(error => alert(error.message))
      }
    

    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.logoContainer}>
                <Image
                style={styles.img} 
                source = {require('../assets/images/PMlogo.png')} 
                />
                <Text style={styles.logo}>®Patient</Text>
                <Text style={styles.logo}>Monitoring</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.button}>Log in</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Montserrat_500Medium',
    },
    inputContainer:{
        width: '80%',
        height: '30%',
        bottom: 20,
    },
    input:{
        paddingHorizontal: 1,
        paddingVertical: 20,
        borderBottomWidth: 1.5,
        borderBottomColor: '#696969',
        fontSize: 15,
        fontFamily: 'Montserrat_500Medium',
    },
    buttonContainer:{
       top: 30, 
       borderRadius: 50,
       width: '80%',
    },
    button:{
        color: 'white',
        fontFamily: 'Montserrat_500Medium',
        fontSize: 15,
        textAlign: 'center',
        width: '100%',
        backgroundColor: '#4166f5',
        padding: 8,
        borderRadius: 25,
    },
    logoContainer:{
        alignItems: 'center',
        bottom: 30,
    },
    img:{
        height: 90,
        width: 90,
        marginBottom: 20,
    },
    logo:{
        textAlign: 'center',
        fontSize: 30,
    },
});