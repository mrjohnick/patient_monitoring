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
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../assets/colors/colors";
import patientData from "../assets/data/patientData";
import Feather from "react-native-vector-icons/Feather";
import Ionicicon from "react-native-vector-icons/Ionicons";
import profile from "../assets/images/person.png";
import { MaterialIcons } from '@expo/vector-icons';
import Dropdown from "../components/Dropdown";
import { BarChart, LineChart } from "react-native-chart-kit";
import { LogBox } from 'react-native';
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
const heartGraph = [71, 68, 72, 66, 81, 75, 89, 85, 83, 79];
const breathGraph = [14, 13, 12, 14, 13, 15, 13, 14, 15, 16];
const oxygenGraph = [98, 97, 98, 96, 95, 95, 94, 95, 96, 97];

const Home = ({ navigation }) => {
  const [room, setRoom] = useState("Unknown");

  // use states for data
  const [heart, setHeart] = useState(61);
  const [breath, setBreath] = useState(13);
  const [oxygen, setOxygen] = useState(97);
   
 // for open/close modals
  const [hmodalOpen, SetHmodalOpen] = useState(false);
  const [bmodalOpen, SetBmodalOpen] = useState(false);
  const [omodalOpen, SetOmodalOpen] = useState(false);

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
      LogBox.ignoreLogs(['Setting a timer for a long period of time']) // Removes timer-warning
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
                      <Modal visible={hmodalOpen} animationType='fade' transparent={true}>
                        <View style={styles.modalBackround}>                       
                          <View style={styles.modalContainer}> 
                            <MaterialIcons 
                              name='close'
                              size={40}
                              style={styles.modalClose}
                              onPress={() => SetHmodalOpen(false)}
                            />
                            <View>
                                <LineChart
                                  data={dataHeart}
                                  width={Dimensions.get("screen").width}
                                  height={Dimensions.get("screen").height / 3}
                                  yAxisLabel=""
                                  yAxisSuffix=""
                                  xAxisLabel="m"
                                  yAxisInterval={1} // optional, defaults to 1
                                  chartConfig={chartConfig}
                                  fromNumber={180} // max value
                                  fromZero={true} // min value
                                  withDots={false} // removes dots
                                  withInnerLines={false} // removes the grid on the chart
                                  withShadow={false} // removes the shadow under the line, default true
                                  bezier
                                  style={{
                                    marginVertical: 8,
                                    borderRadius: 16,
                                  }}
                                /> 
                            </View>
                          </View>
                        </View>
                      </Modal>
                      <TouchableOpacity onPress={() => SetHmodalOpen(true)}>
                        <View style={styles.measurementsItem}>
                         <View style={styles.measurementheader}>
                          <View style={styles.rowcontainer}>                                                                    
                             <View style={styles.allmeasurementsContainer}>
                              <Text style={styles.measurementsTitles}>
                              Heart Rate (BPM)</Text>
                             <Text style={styles.liveMeasurementTitle}>
                              {patient.Heart}</Text>
                              <Text style={styles.lastUpdatedTitle}>1 min ago</Text>
                            </View>
                            <Image
                              style={styles.img} 
                              source = {require('../assets/images/heart_rate.png')} 
                              />                         
                          </View>
                            <Ionicicon
                              name={"chevron-forward-outline"}
                              style={styles.arrowIcon}
                              size={24}
                            />
                         </View>                     
                            <View style={styles.liveMeasurement}>
                            <Modal visible={omodalOpen} animationType='fade' transparent={true}>
                              <View style={styles.modalBackround}>
                                <View style={styles.modalContainer}> 
                                  <MaterialIcons 
                                    name='close'
                                    size={40}
                                    style={styles.modalClose}
                                    onPress={() => SetOmodalOpen(false)}
                                  />
                                <View>
                                <LineChart
                                  data={dataOxygen}
                                  width={Dimensions.get("screen").width}
                                  height={Dimensions.get("screen").height / 3}
                                  yAxisLabel=""
                                  yAxisSuffix=""
                                  xAxisLabel="m"
                                  yAxisInterval={1} // optional, defaults to 1
                                  chartConfig={chartConfig}
                                  fromNumber={100} // max value
                                  fromZero={true} // min value
                                  withDots={false} // removes dots
                                  withInnerLines={false} // removes the grid on the chart
                                  withShadow={false} // removes the shadow under the line, default true
                                  bezier
                                  style={{
                                    marginVertical: 8,
                                    borderRadius: 16,
                                  }}
                                />
                                </View>
                          </View>
                        </View>
                        </Modal> 
                                                                                          
                            
                        </View>
                        </View> 
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => SetOmodalOpen(true)}>
                        <View style={styles.measurementsItem}>
                          <View style={styles.measurementheader}>
                          <View style={styles.rowcontainer}>                                                                    
                             <View style={styles.allmeasurementsContainer}>
                              <Text style={styles.measurementsTitles}>
                              Blood Oxygen (SPO2)</Text>
                             <Text style={styles.liveMeasurementTitle}>
                              {patient.Oxygen}</Text>
                              <Text style={styles.lastUpdatedTitle}>1 min ago</Text>
                            </View>
                            <Image
                              style={styles.img2} 
                              source = {require('../assets/images/o2.png')} 
                              />                   
                                </View>
                              <Ionicicon
                              name={"chevron-forward-outline"}
                              style={styles.arrowIcon}
                              size={24}
                            />  
                          </View>

                          <View style={styles.liveMeasurement}>

                          <Modal visible={bmodalOpen} animationType='fade' transparent={true}>
                            <View style={styles.modalBackround}>
                              <View style={styles.modalContainer}> 
                                <MaterialIcons 
                                  name='close'
                                  size={40}
                                  style={styles.modalClose}
                                  onPress={() => SetBmodalOpen(false)}
                                />
                                  <View>
                                    <LineChart
                                      data={dataBreath}
                                      width={Dimensions.get("screen").width}
                                      height={Dimensions.get("screen").height / 3}
                                      yAxisLabel=""
                                      yAxisSuffix=""
                                      xAxisLabel="m"
                                      yAxisInterval={1} // optional, defaults to 1
                                      chartConfig={chartConfig}
                                      fromNumber={50} // max value
                                      fromZero={true} // min value
                                      withDots={false} // removes dots
                                      withInnerLines={false} // removes the grid on the chart
                                      withShadow={false} // removes the shadow under the line, default true
                                      bezier
                                      style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                      }}
                                    />
                                  </View>
                              </View>
                            </View>
                          </Modal>

                           
                          </View>
                          
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => SetBmodalOpen(true)}>
                        <View style={styles.measurementsItem}>
                          <View style={styles.measurementheader}>
                           <View style={styles.rowcontainer}>                                                                    
                              <View style={styles.allmeasurementsContainer}>
                                <Text style={styles.measurementsTitles}>
                                Breath Rate</Text>
                                <Text style={styles.liveMeasurementTitle}>
                                {patient.Breath}</Text>
                                <Text style={styles.breathsPerMinuteTitle}>
                                breaths/min
                                </Text>
                                <Text style={styles.lastUpdatedTitle}>1 min ago</Text>

                              </View>
                            <Image
                              style={styles.img3} 
                              source = {require('../assets/images/lung.png')} 
                              />                   
                                </View> 
                            
                            <Ionicicon
                              name={"chevron-forward-outline"}
                              style={styles.arrowIcon}
                              size={24}
                            />
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
    marginLeft: 0,
    marginTop: 14,
    marginBottom: 35,
  },
  measurementsItem: {
    width: 350,
    height: 150,
    marginTop: 10,
    backgroundColor: colors.white1,
    borderRadius: 6,
  },
  liveMeasurement: {
    marginTop: 0,
    marginLeft: 14,
  },
  liveMeasurementTitle: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 22,
    marginBottom: 8,
  },
  lastUpdated: {
    marginTop: 10,
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
  modalBackround:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer:{
    height: '50%',
    marginTop: 'auto',
    backgroundColor:'white',
  },
  modalClose: {
    marginTop: 0,
    borderColor: '#f2f2f2',
    padding: 10, 
    borderRadius: 10,
    alignSelf: 'center',
  },
  iconContainer:{
    flexDirection:'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  img:{
    height: 100,
    flexDirection:'row',
    width: 100,
    marginBottom: 20,
    marginLeft: 40,
    marginTop: 30, 
  },
  img2:{
    height: 80,
    flexDirection:'row',
    width: 80,
    marginBottom: 20,
    marginLeft: 27,
    marginTop: 30,
    marginRight: 20,
  },
  img3:{
    height: 80,
    flexDirection:'row',
    width: 80,
    marginBottom: 20,
    marginLeft: 85,
    marginTop: 30,
  },
  rowcontainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: "wrap",
  }, 
  allmeasurementsContainer:{
   marginLeft:14,
  },

});

export default Home;
