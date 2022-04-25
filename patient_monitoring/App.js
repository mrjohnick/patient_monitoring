import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Home from "./components/Home";
import Export from "./components/Export";
import Profile from "./components/Profile";
import newPasient from "./components/newPasient";
import BloodPressure from "./components/BloodPressure";
import colors from "./assets/colors/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: StyleSheet.tabBar,
        activeTintColor: colors.blue,
        inactiveTintColor: colors.grey1,
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Export"
        component={Export}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="download-outline" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="BloodPressure" component={BloodPressure} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white1,
  },
});

export default App;
