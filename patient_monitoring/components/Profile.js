import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Avatar, Caption, Title } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import { auth } from '../firebase';
import * as Login from "./Login";
import Edit from "./EditProfile";


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
      <TouchableOpacity style={styles.edit}
        onPress={() => { navigation.navigate("EditProfile") }}
      >
        <Ionicons name="create-outline" size={30} color="royalblue" />
      </TouchableOpacity>
      <Title style={styles.header}>Profile</Title>
      <View style={styles.userInfo}>
        <View>
          <Avatar.Text
            size={100}
            label={`${auth.currentUser?.name}`}
            style={{ backgroundColor: 'lightgray' }}
          />
        </View>
      </View >
      <View style={styles.profileBody}>
        <Title>{auth.currentUser?.name}</Title>
        <Caption>
          <Ionicons name="phone-portrait-sharp" size={14} />{auth.currentUser?.phone}
        </Caption>
        <Caption>
          <Ionicons name="mail" size={14} /> {auth.currentUser?.email}
        </Caption>
      </View>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={{ color: 'white' }}>Sign out</Text>
      </TouchableOpacity>
    </View >
  )
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '50%'
  },
  header: {
    fontSize: 23,
    fontWeight: '300',
    transform: [{ translateY: -80 }],
  },
  edit: {
    alignSelf: 'flex-end',
    bottom: 85,
    right: 35
  },
  profilebody: {
    margin: 10,
    fontWeight: '200',
  },
  button: {
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
  userInfo: {
    padding: 15,
  },
  avatar: {
    backgroundColor: '#D3D3D3',
  }
})