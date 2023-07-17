import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentHomePage from "../Screens/Student Screen/StudentHomePage";
import Routine from "../Screens/Routine";
import Attendance from "../Screens/Attendance";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Profile from "../Screens/Profile";
import { useRecoilState } from "recoil";
import profileSelector from "../../selector/profileSelctor";
import { APIEndpoint } from "../../env";
import { useEffect, useState } from "react";
import { getBatchId, getProfile } from "../../api/apiClient";
import HomePage from "../Screens/HomePage";
import routineState from "../../recoil/routineState";
import { globalVar, styles } from "../../styles/global";
import { Button } from "react-native-paper";
import AttendanceList from "../Screens/AttendanceList";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigation() {
  // Function to handle navigation to Routine screen with data

  const iconMap = {
    Home: "home",
    Attendance: "list",
    Routine: "calendar",
    Profile: "user",
    Filter: "filter",
  };

  const [routine, setRoutine] = useRecoilState(routineState);

  console.log({ routine });

  const [currentTime, setCurrentTime] = useState(new Date());

  // useEffect(() => {
  //   // Update the current time every second
  //   const timer = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);

  //   // Clean up the timer when the component unmounts
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <Tab.Navigator
      initialRouteName='Home'
      sceneContainerStyle={styles.container}
    >
      <Tab.Screen
        name='Home'
        component={HomePage}
        options={{
          title: "Home",
          headerStyle: styles.navigationStyle,
          headerTitle: "Home",

          headerTitleStyle: {
            color: "#ffffff",
            fontSize: 15,
          },
          headerRight: ({ color = globalVar.primaryColor, size }) => (
            <View style={{ padding: 10 }}>
              <Text style={{ color: "#ffffff", fontSize: 15 }}>
                {currentTime.toLocaleTimeString()}
              </Text>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={iconMap.Home}
              color={color}
              size={size}
              style={styles.homeIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Routine'
        component={Routine}
        options={{
          title: "routine",
          headerStyle: styles.navigationStyle,
          headerTitle: "Routine",
          headerTitleStyle: {
            color: "#ffffff",
            fontSize: 15,
          },
          headerRight: ({ color = globalVar.primaryColor, size }) => (
            <View style={{ padding: 10 }}>
              <Text style={{ color: "#ffffff", fontSize: 15 }}>
                {currentTime.toLocaleTimeString()}
              </Text>
            </View>
          ),

          tabBarIcon: ({ color = globalVar.primaryColor, size }) => (
            <Icon
              name={iconMap.Routine}
              color={color}
              size={size}
              style={styles.homeIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Attendance'
        component={Attendance}
        options={{
          title: "Attendance",
          headerStyle: styles.navigationStyle,
          tabBarIcon: ({ color = globalVar.primaryColor, size }) => (
            <Icon
              name={iconMap.Attendance}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          title: "Profile",
          headerStyle: styles.navigationStyle,

          tabBarIcon: ({ color = globalVar.primaryColor, size }) => (
            <Icon
              name={iconMap.Profile}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function StackScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Main'
          component={TabNavigation}
        />
        <Stack.Screen
          name='AttendanceList'
          component={AttendanceList}
					options={{
						headerShown: true,
						headerStyle: styles.navigationStyle,
						headerTitle: "Attendance",
					}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { StackScreens };
