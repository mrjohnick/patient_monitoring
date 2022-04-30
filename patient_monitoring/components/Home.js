import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import colors from "../assets/colors/colors";
import patientData from "../assets/data/patientData";
import Feather from "react-native-vector-icons/Feather";
import Ionicicon from "react-native-vector-icons/Ionicons";
import profile from "../assets/images/person.png";

import Dropdown from "../components/Dropdown";

// Firebase imports
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

// Global arrays for charts, each value initialized to 0
const heartGraph = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const breathGraph = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const oxygenGraph = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const Home = ({ navigation }) => {
  const [room, setRoom] = useState("Unknown");

  // use states for data
  const [heart, setHeart] = useState(0);
  const [breath, setBreath] = useState(0);
  const [oxygen, setOxygen] = useState(0);

  // firebase ref
  const [patients, setPatients] = useState([]);
  const patientsCollectionRef = collection(db, "patients");

  // Number gen, dont need to to touch
  function randomNumberInRange(min, max) {
    // get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Timer for number gen, make lower/higher based on how fast u need the data atm
  // Set to 1 minute (60000) when delivering
  const MINUTE_MS = 10000;

  // Generate random numbers every minute (Add timer here?)
  useEffect(() => {
    const interval = setInterval(() => {
      handleHeart();
      handleBreath();
      handleOxygen();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  // Random number handlers for our fields
  const handleHeart = () => {
    setHeart(randomNumberInRange(60, 100));
  };

  const handleBreath = () => {
    setBreath(randomNumberInRange(12, 16));
  };

  const handleOxygen = () => {
    setOxygen(randomNumberInRange(95, 100));
  };

  // Post function handler for room 1
  // Copy and paste function for room 2, make sure to create a new collection in firestore
  // And set a new field "room" to 2.
  const room1Handler = async (heart, breath, oxygen) => {
    const patientsDoc = doc(db, "patients", "room1");
    const newFields = { Heart: heart, Breath: breath, Oxygen: oxygen };
    await updateDoc(patientsDoc, newFields);
  };

  // Read patients from Firebase
  useEffect(() => {
    onSnapshot(patientsCollectionRef, (snapshot) =>
      setPatients(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);

  // Listen for a change in value then run the post function
  useEffect(() => {
    room1Handler(heart, breath, oxygen);
  }, [heart, breath, oxygen]);

  // Listen for change in heart, breath, and oxygen then add to the const graph
  useEffect(() => {
    add(heartGraph, heart);
  }, [heart]);

  useEffect(() => {
    add(breathGraph, breath);
  }, [breath]);

  useEffect(() => {
    add(oxygenGraph, oxygen);
  }, [oxygen]);

  // Add function for graph (a) and value (x)
  function add(a, x) {
    a.unshift(x);
    a.length = a.length < 10 ? a.length : 10;
  }

  return (
    <View>
      <ScrollView>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.menuWrapper}>
            <Feather
              name="menu"
              size={32}
              color={colors.black}
              style={styles.menuIcon}
            />
            {!!room && <Text>{room.roomID}</Text>}
            <Dropdown
              label="Select room"
              data={patientData}
              onSelect={setRoom}
            />

            <Image source={profile} style={styles.profileImage} />
          </View>
        </SafeAreaView>

        {/* Patient Information */}
        <View style={styles.patientInformation}>
          {/* Patient Name */}
          <Text style={styles.patientNameTitle}>Patient Name</Text>
          <View style={styles.patientNameWrapper}>
            <Text style={styles.patientName}>John Johnson</Text>
          </View>
          {/* Patient date of admission */}
          <View style={styles.patientDateWrapper}>
            <Text style={styles.patientDate}>
              Date of admission: {patientData[1].dateOfAdmission}
            </Text>
          </View>
        </View>
        {/* Patient measurements */}
        <View style={styles.patientMonitoring}>
          <Text style={styles.measurementsTitle}>Measurements</Text>

          {/* All measurements displayed below */}
          <View style={styles.measurementsItemsWrapper}>
            {patients.map((patient) => {
              return (
                <View>
                  {patient.room == "1" ? (
                    <View>
                      <TouchableOpacity>
                        <View style={styles.measurementsItem}>
                          <View style={styles.measurementheader}>
                            <Text style={styles.measurementsTitles}>
                              Heart Rate (BPM)
                            </Text>
                            <Ionicicon
                              name={"chevron-forward-outline"}
                              style={styles.arrowIcon}
                              size={24}
                            />
                          </View>

                          <View style={styles.liveMeasurement}>
                            <Text style={styles.liveMeasurementTitle}>
                              {patient.Heart}
                            </Text>
                          </View>
                          <View style={styles.lastUpdated}>
                            <Text style={styles.lastUpdatedTitle}>
                              1 min ago
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View style={styles.measurementsItem}>
                          <View style={styles.measurementheader}>
                            <Text style={styles.measurementsTitles}>
                              Blood Oxygen (SPO2)
                            </Text>
                            <Ionicicon
                              name={"chevron-forward-outline"}
                              style={styles.arrowIcon}
                              size={24}
                            />
                          </View>

                          <View style={styles.liveMeasurement}>
                            <Text style={styles.liveMeasurementTitle}>
                              {patient.Oxygen}%
                            </Text>
                          </View>
                          <View style={styles.lastUpdated}>
                            <Text style={styles.lastUpdatedTitle}>
                              1 min ago
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View style={styles.measurementsItem}>
                          <View style={styles.measurementheader}>
                            <Text style={styles.measurementsTitles}>
                              Breath Rate
                            </Text>
                            <Ionicicon
                              name={"chevron-forward-outline"}
                              style={styles.arrowIcon}
                              size={24}
                            />
                          </View>
                          <View style={styles.liveMeasurementBreathRate}>
                            <Text style={styles.liveMeasurementTitle}>
                              {patient.Breath}
                            </Text>
                          </View>
                          <View style={styles.breathsPerMinute}>
                            <Text style={styles.breathsPerMinuteTitle}>
                              breaths/min
                            </Text>
                          </View>
                          <View style={styles.lastUpdated}>
                            <Text style={styles.lastUpdatedTitle}>
                              1 min ago
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.white,
  },

  menuWrapper: {
    marginHorizontal: 20,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  measurementheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    width: 52,
    height: 52,
    resizeMode: "cover",
    borderRadius: 100,
  },
  patientInformation: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  patientNameTitle: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 22,
  },
  patientNameWrapper: {
    marginTop: 5,
  },
  patientName: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    color: colors.grey1,
  },
  patientDateWrapper: {
    marginTop: 5,
  },
  patientDate: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 13,
    color: colors.grey2,
  },
  measurementsTitle: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
    marginBottom: 2,
  },
  patientMonitoring: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  measurementsTitles: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    marginLeft: 14,
    marginTop: 14,
  },
  measurementsItem: {
    width: 350,
    height: 136,
    marginTop: 18,
    backgroundColor: colors.white1,
    borderRadius: 6,
  },
  liveMeasurement: {
    marginTop: 40,
    marginLeft: 14,
  },
  liveMeasurementTitle: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 22,
  },
  lastUpdated: {
    marginTop: 2,
    marginLeft: 14,
  },
  lastUpdatedTitle: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12,
    color: colors.grey2,
  },
  breathsPerMinute: {
    marginLeft: 14,
  },
  breathsPerMinuteTitle: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 11,
    color: colors.grey3,
  },
  liveMeasurementBreathRate: {
    marginTop: 26,
    marginLeft: 14,
  },
  arrowIcon: {
    marginRight: 14,
    marginTop: 14,
  },
});

export default Home;
