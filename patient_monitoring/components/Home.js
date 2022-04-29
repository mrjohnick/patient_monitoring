import React, { useState } from "react";
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

const Home = ({ navigation }) => {
  const [room, setRoom] = useState("Unknown");

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
            <TouchableOpacity>
              <View style={styles.measurementsItem}>
                <View style={styles.measurementheader}>
                  <Text style={styles.measurementsTitles}>
                    Blood Pressure (BPM)
                  </Text>
                  <Ionicicon
                    name={"chevron-forward-outline"}
                    style={styles.arrowIcon}
                    size={24}
                  />
                </View>

                <View style={styles.liveMeasurement}>
                  <Text style={styles.liveMeasurementTitle}>
                    {patientData[1].systolicBloodPressure}/
                    {patientData[1].diastolicBloodPressure}
                  </Text>
                </View>
                <View style={styles.lastUpdated}>
                  <Text style={styles.lastUpdatedTitle}>1 min ago</Text>
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
                    {patientData[1].bloodOxygen}%
                  </Text>
                </View>
                <View style={styles.lastUpdated}>
                  <Text style={styles.lastUpdatedTitle}>1 min ago</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.measurementsItem}>
                <View style={styles.measurementheader}>
                  <Text style={styles.measurementsTitles}>Breath Rate</Text>
                  <Ionicicon
                    name={"chevron-forward-outline"}
                    style={styles.arrowIcon}
                    size={24}
                  />
                </View>
                <View style={styles.liveMeasurementBreathRate}>
                  <Text style={styles.liveMeasurementTitle}>
                    {patientData[1].minimumBreathRate}-
                    {patientData[1].maximumBreathRate}
                  </Text>
                </View>
                <View style={styles.breathsPerMinute}>
                  <Text style={styles.breathsPerMinuteTitle}>breaths/min</Text>
                </View>
                <View style={styles.lastUpdated}>
                  <Text style={styles.lastUpdatedTitle}>1 min ago</Text>
                </View>
              </View>
            </TouchableOpacity>
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
