import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "../Screens/LandingPage";
import SignupScreen from "../Screens/SignupScreen";
import LoginScreen from "../Screens/LoginScreen";
import { Image, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../styles/global";

const Stack = createNativeStackNavigator();

const Navigation = ({ userLoggedIn }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LandingPage'>
        <Stack.Screen
          name='LandingPage'
          component={LandingPage}
          options={{
            title: "Welcome",
            headerLeft: ({ color, size }) => (
              <View style={{ paddingLeft: 10 }}>
                <Image
                  source={{
                    uri: "https://nec.edu.np/faculty/dhanpp/Nepal_Engineering_College.png",
                  }}
                  style={{ width: 32, height: 32 }}
                />
              </View>
            ),
          }}
          initialParams={{ userLoggedIn }}
        />
        <Stack.Screen
          name='Signup'
          component={SignupScreen}
          options={{
            title: "Signup",
            headerStyle: styles.navigationStyle,
            headerTintColor: "#ffffff",
          }}
        />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{
            title: "Login",
            headerStyle: styles.navigationStyle,
            headerTintColor: "#ffffff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
