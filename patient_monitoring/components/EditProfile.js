import react, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  LogBox,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Title, RadioButton } from "react-native-paper";

import {
  AdditionalUserInfo,
  getAdditionalUserInfo,
  updateCurrentUser,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, db } from "../firebase";
import * as Login from "./Login";
import Feather from "react-native-vector-icons/Feather";
import colors from "../assets/colors/colors";
import * as Profile from "./Profile";
import TabNavigator from "../App";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const Edit = () => {
  LogBox.ignoreLogs(["Setting a timer"]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState([]);

  const [employees, setEmployees] = useState([]);
  const employeesCollectionRef = collection(db, "employees");

  const navigation = useNavigation();

  // Handle employee data
  const NameHandler = async (id, name) => {
    const employeeDoc = doc(db, "employees", id);
    const newFields = { Name: name };
    await updateDoc(employeeDoc, newFields);
  };

  const PhoneHandler = async (id, phone) => {
    const employeeDoc = doc(db, "employees", id);
    const newFields = { Phone: phone };
    await updateDoc(employeeDoc, newFields);
  };

  const CheckHandler = async (id, checked) => {
    const employeeDoc = doc(db, "employees", id);
    const newFields = { Gender: checked };
    await updateDoc(employeeDoc, newFields);
  };

  const EmailHandler = async (id, email) => {
    const employeeDoc = doc(db, "employees", id);
    const newFields = { Email: email };
    await updateDoc(employeeDoc, newFields);
    navigation.replace("TabNavigator");
  };

  // Read employees
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
      </View>
      <View style={styles.editProfileWrapper}>
        <Title style={styles.header}> Edit user </Title>
        {employees.map((employee) => {
          return (
            <View >
              {employee.Email == `${auth.currentUser?.email}` ? (
                <SafeAreaView>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Username"
                      defaultValue={employee.Name}
                      onChangeText={(event) => {
                        NameHandler(employee.id, event);
                      }}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Phone number"
                      defaultValue={employee.Phone}
                      onChangeText={(event) => {
                        PhoneHandler(employee.id, event.replace(/[^0-9]/g, ""));
                      }}
                      style={styles.input}
                      maxLength={9}
                    />
                  </View>

                  <View style={styles.radioButtons}>
                    <RadioButton.Group>
                      <RadioButton.Item
                        position="trailing"
                        label="Male"
                        color="#778899"
                        value="Male"
                        status={
                          employee.Gender === "Male" ? "checked" : "unchecked"
                        }
                        onPress={(value) => CheckHandler(employee.id, "Male")}
                      />
                      <RadioButton.Item
                        position="trailing"
                        label="Female"
                        color="#778899"
                        value="Female"
                        status={
                          employee.Gender === "Female" ? "checked" : "unchecked"
                        }
                        onPress={() => CheckHandler(employee.id, "Female")}
                      />
                      <RadioButton.Item
                        position="trailing"
                        label="Other"
                        color="#778899"
                        value="Other"
                        status={
                          employee.Gender === "Other" ? "checked" : "unchecked"
                        }
                        onPress={() => CheckHandler(employee.id, "Other")}
                      />
                    </RadioButton.Group>
                  </View>
                </SafeAreaView>
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Edit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editProfileWrapper: {
    alignItems: "center",
    marginTop: "30%",
  },
  profileHeader: {
    marginHorizontal: 20,
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  header: {
    fontSize: 23,
    opacity: 0.9,
    fontWeight: "700",
    transform: [{ translateY: -70 }],
  },
  inputContainer: {
    width: "100%",
    height: "30%",
    marginBottom: 80,
  },
  radioButtons: {
    width: "100%",
    marginLeft: "1%",
    marginBottom: "3%",
  },
  radio: {
    marginBottom: 10,
  },
  input: {
    paddingHorizontal: 1,
    paddingVertical: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: "#696969",
    fontSize: 15,
    fontFamily: "Montserrat_500Medium",
  },
  buttonContainer: {
    top: 100,
    borderRadius: 50,
    width: "80%",
  },
  button: {
    color: "white",
    fontFamily: "Montserrat_500Medium",
    fontSize: 15,
    textAlign: "center",
    width: "100%",
    backgroundColor: "#4166f5",
    padding: 8,
    borderRadius: 25,
  },
});
