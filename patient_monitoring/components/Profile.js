import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Caption, Title } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import colors from "../assets/colors/colors";
import { auth, db } from "../firebase";
import * as Login from "./Login";
import Edit from "./EditProfile";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";

const Profile = () => {
  const [employees, setEmployees] = useState([]);
  const employeesCollectionRef = collection(db, "employees");
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  // Read employee data
  useEffect(() => {
    onSnapshot(employeesCollectionRef, (snapshot) =>
      setEmployees(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={32} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
        >
          <Ionicons
            name="md-ellipsis-horizontal-circle-outline"
            size={35}
            color="royalblue"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.editWrapper}>
        <Title style={styles.header}>Profile</Title>
        {employees.map((employee) => {
          return (
            <View>
              {employee.Email == `${auth.currentUser?.email}` ? (
                <View style={styles.userInfo}>
                  <View>
                    <Avatar.Text
                      size={100}
                      color="white"
                      label={employee.Name[0]}
                      style={{ backgroundColor: "rgb(192,170,140)" }}
                    />
                  </View>
                </View>
              ) : null}
            </View>
          );
        })}

        {employees.map((employee) => {
          return (
            <View>
              {employee.Email == `${auth.currentUser?.email}` ? (
                <View style={styles.profileBody}>
                  <Title style={styles.title}> {employee.Name} </Title>
                  <Caption>
                    <Ionicons
                      name="fitness"
                      size={14}
                      color="rgb(192,170,110)"
                    />
                    {employee.Gender}
                  </Caption>
                  <Caption>
                    <Ionicons name="call" size={14} color="rgb(192,170,110)" />
                    {employee.Phone}
                  </Caption>
                  <Caption>
                    <Ionicons name="mail" size={14} color="rgb(192,170,110)" />{" "}
                    {employee.Email}
                  </Caption>
                </View>
              ) : null}
            </View>
          );
        })}

        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={{ color: "white", fontSize: 15 }}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editWrapper: {
    alignItems: "center",
    marginTop: "20%",
  },
  profileHeader: {
    marginHorizontal: 20,
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    marginTop: 60,
    fontSize: 23,
    opacity: 0.9,
    fontWeight: "700",
    transform: [{ translateY: -90 }],
  },
  userInfo: {
    padding: 15,
  },
  profilebody: {
    margin: 10,
    fontWeight: "200",
  },
  title: {
    alignSelf: "center",
    flexWrap: "nowrap",
    marginBottom: 20,
    fontWeight: "500",
  },
  button: {
    fontFamily: "Montserrat_500Medium",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#4166f5",
    padding: 13,
    borderRadius: 25,
    top: 100,
  },
});
