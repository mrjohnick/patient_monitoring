import React, { useState, useEffect, useRef } from "react";
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
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Switch,
  Animated,
} from "react-native";
import colors from "../assets/colors/colors";
import patientData from "../assets/data/patientData";
import Feather from "react-native-vector-icons/Feather";
import Ionicicon from "react-native-vector-icons/Ionicons";
import profile from "../assets/images/person.png";
import { MaterialIcons } from "@expo/vector-icons";
import Dropdown from "../components/Dropdown";
import { BarChart, LineChart } from "react-native-chart-kit";
import { LogBox } from "react-native";
import { auth } from "../firebase";
import CustomSwitch from "./CustomSwitch";
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
import "react-native-gesture-handler";

// Global arrays for charts, each value initialized to 0
export const heartGraph = [71, 68, 72, 66, 81, 75, 89, 85, 83, 79];
export const breathGraph = [14, 13, 12, 14, 13, 15, 13, 14, 15, 16];
export const oxygenGraph = [98, 97, 98, 96, 95, 95, 94, 95, 96, 97];

const Room1 = () => {
  const [room, setRoom] = useState("Unknown");

  // use states for data
  const [heart, setHeart] = useState(61);
  const [breath, setBreath] = useState(13);
  const [oxygen, setOxygen] = useState(97);

  // for open/close modals
  const [hmodalOpen, SetHmodalOpen] = useState(false);
  const [bmodalOpen, SetBmodalOpen] = useState(false);
  const [omodalOpen, SetOmodalOpen] = useState(false);
  // useState for counter
  const [counter, setCounter] = useState(0);
  // firebase ref
  const [patients, setPatients] = useState([]);
  const patientsCollectionRef = collection(db, "patients");

  // useEffect so counter counts up 1, for each second
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  // Function for calculating average of HR/BR/SPO2 array
  function avg(heartGraph) {
    var sum = 0;
    heartGraph.forEach(function (item, idx) {
      sum += item;
    });
    return sum / heartGraph.length;
  }

  // Number gen, dont need to to touch
  function randomNumberInRange(min, max) {
    // get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Timer for number gen, make lower/higher based on how fast u need the data atm
  // Set to 1 minute (60000) when delivering
  const MINUTE_MS = 60000000;

  // Generate random numbers every minute (Add timer here?)
  useEffect(() => {
    const interval = setInterval(() => {
      handleHeart();
      handleBreath();
      handleOxygen();
      LogBox.ignoreLogs(["Setting a timer for a long period of time"]); // Removes timer-warning
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
    setCounter(0);
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

  // Chart stuff

  // Labels ("m" is appended in the actual chart)
  let labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  // Data for each chart, maybe try to put all of it in one const(?)
  const dataHeart = {
    labels: labels,

    datasets: [
      {
        data: heartGraph,
      },
    ],
  };

  const dataBreath = {
    labels: labels,

    datasets: [
      {
        data: breathGraph,
      },
    ],
  };

  const dataOxygen = {
    labels: labels,

    datasets: [
      {
        data: oxygenGraph,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    backgroundGradientFromOpacity: 0, // to remove the opacity
    backgroundGradientToOpacity: 0, // remove opacity
    barPercentage: 0.5,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(239, 28, 66, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(108, 110, 115, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };
};

export default Room1;
