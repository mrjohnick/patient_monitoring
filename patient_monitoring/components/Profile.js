import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase'
import * as Login from "./Login";
import TabNavigator from "../App";


const Profile = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
      navigation.replace("Login")
    })
    .catch(error => alert(error.message))
  }
  return (
      <View style={styles.container}>
        <Text>Welcome {auth.currentUser?.email} </Text>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
        <Text style={{color:'white'}}>Sign out</Text>
        </TouchableOpacity>
      </View>
  )
}

export default Profile;

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    marginTop: '50%'
  },
  button:{
    color: 'white',
    fontFamily: 'Gill Sans',
    fontSize: 15,
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#4166f5',
    padding: 8,
    borderRadius: 25,
    top: 100,
},
})