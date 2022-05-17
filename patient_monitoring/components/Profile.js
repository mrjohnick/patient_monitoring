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
        <Ionicons name="md-ellipsis-horizontal-circle-outline" size={35} color="royalblue" />
      </TouchableOpacity>
      <Title style={styles.header}>Profile</Title>
      <View style={styles.userInfo}>
        <View>
          <Avatar.Text
            size={100}
            color="white"
            label={`${auth.currentUser?.email[0]}`}
            style={{ backgroundColor: 'rgb(192,170,140)' }}
          />
        </View>
      </View >
      <View style={styles.profileBody}>
        <Title style={styles.title}> {`${auth.currentUser?.name}`} </Title>
        <Caption>
          <Ionicons name="fitness" size={14} color="rgb(192,170,110)" />{`${auth.currentUser?.checked}`}
        </Caption>
        <Caption>
          <Ionicons name="call" size={14} color="rgb(192,170,110)" />{`${auth.currentUser?.phone}`}
        </Caption>
        <Caption>
          <Ionicons name="mail" size={14} color="rgb(192,170,110)" /> {`${auth.currentUser?.email}`}
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
  edit: {
    alignSelf: 'flex-end',
    bottom: 90,
    right: 35
  },
  header: {
    fontSize: 23,
    fontWeight: '300',
    transform: [{ translateY: -90 }],
  },
  userInfo: {
    padding: 15,
  },
  profilebody: {
    margin: 10,
    fontWeight: '200',
  },
  title: {
    alignSelf: 'center',
    flexWrap: 'nowrap',
    marginBottom: 20,
    fontWeight: '300',
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
})