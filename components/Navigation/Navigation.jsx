import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "../Screens/LandingPage";
import SignupScreen from "../Screens/SignupScreen";
import LoginScreen from "../Screens/LoginScreen";

const Stack = createNativeStackNavigator();

const Navigation = ({ onLogin, userLoggedIn }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LandingPage'>
        <Stack.Screen
          name='LandingPage'
          component={LandingPage}
          options={{ title: "LandingPage" }}
          initialParams={{ userLoggedIn }}
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
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
