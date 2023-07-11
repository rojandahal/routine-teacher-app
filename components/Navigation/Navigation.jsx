import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "../Screens/LandingPage";
import SignupScreen from "../Screens/SignupScreen";
import LoginScreen from "../Screens/LoginScreen";
import HomePage from "../Screens/HomePage";	
import Routine from "../Screens/Routine";
import Attendance from "../Screens/Attendance";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LandingPage'>
        <Stack.Screen
          name='LandingPage'
          component={LandingPage}
          options={{ title: "LandingPage" }}
        />
        <Stack.Screen
          name='Signup'
          component={SignupScreen}
          options={{ title: "Signup" }}
        />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ title: "Login" }}
          initialParams={{ userLoggedIn: false }}
        />
        {/* <Stack.Screen
          name='Home'
          component={HomePage}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name='Routine'
          component={Routine}
          options={{ title: "Routine" }}
        />
        <Stack.Screen
          name='Attendance'
          component={Attendance}
          options={{ title: "Attendance" }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
