import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentHomePage from "../Screens/Student Screen/StudentHomePage";
import Routine from "../Screens/Routine";
import Attendance from "../Screens/Attendance";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Profile from "../Screens/Profile";
import { useRecoilState } from "recoil";
import profileSelector from "../../selector/profileSelctor";
import { APIEndpoint } from "../../env";
import { useEffect, useState } from "react";
import { getBatchId, getProfile } from "../../api/apiClient";
import HomePage from "../Screens/HomePage";

const Tab = createBottomTabNavigator();

const data = [
  {
    id: 1,
    subject: "Math",
    room: "LB 203",
    teacher: "Teacher 1",
    batch: 2018,
    group: "A",
    startingTime: "8am",
    endingTime: "9am",
  },
  {
    id: 2,
    subject: "Database Management System",
    room: "LB 203",
    teacher: "Teacher 2",
    batch: 2018,
    group: "A",
    startingTime: "9am",
    endingTime: "10am",
  },
  {
    id: 3,
    subject: "Data Structure and Algorithm",
    room: "LB 203",
    teacher: "Teacher 3",
    batch: 2018,
    group: "A",
    startingTime: "10am",
    endingTime: "11am",
  },
  {
    id: 4,
    subject: "Engineering Mathematics",
    room: "LB 203",
    teacher: "Teacher 2",
    batch: 2018,
    group: "A",
    startingTime: "11am",
    endingTime: "12pm",
  },
  {
    id: 5,
    subject: "Computer Network",
    room: "LB 203",
    teacher: "Teacher 1",
    batch: 2018,
    group: "A",
    startingTime: "12pm",
    endingTime: "1pm",
  },
  // Add more cards here
];

function TabNavigation() {
  const navigation = useNavigation();

  // Function to handle navigation to Routine screen with data
  const navigateToRoutine = data => {
    navigation.navigate("Routine", { data });
  };
  const iconMap = {
    Home: "home",
    Attendance: "list",
    Routine: "calendar",
    Profile: "user",
  };

  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen
        name='Home'
        component={HomePage}
        initialParams={{ data }}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={iconMap.Home}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Routine'
        component={Routine}
        options={{
          title: "Routine",
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() => navigateToRoutine(data)}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={iconMap.Routine}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Attendance'
        component={Attendance}
        options={{
          title: "Attendance",
          tabBarIcon: ({ color, size }) => (
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
          tabBarIcon: ({ color, size }) => (
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

export default TabNavigation;
