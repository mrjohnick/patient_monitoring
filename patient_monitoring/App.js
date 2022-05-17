import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Home from "./components/Home";
import Export from "./components/Export";
import Profile from "./components/Profile";
import colors from "./assets/colors/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import Login from "./components/Login";
import NewPassword from "./components/NewPassword";
import Room2 from "./components/Room2";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import Edit from "./components/EditProfile";

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
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="looks-one" size={28} color={color} />
          ),
        }}
      />
    <Tab.Screen
        name="Room2"
        component={Room2}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="looks-two" size={28} color={color} />
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
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="EditProfile"
          component={Edit}
          options={{ title: "", headerBackTitle: "Profile", headerTransparent: true, headerTintColor: "brightblue" }} />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{ title: "", headerBackTitle: "Login", headerTransparent: true, headerTintColor: "brightblue" }} />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
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