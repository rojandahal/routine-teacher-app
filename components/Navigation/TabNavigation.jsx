import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentHomePage from "../Screens/Student Screen/StudentHomePage";
import Routine from "../Screens/Routine";
import Attendance from "../Screens/Attendance";
import { useNavigation } from "@react-navigation/native";
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
    Filter: 'filter'
  };


  const [routine, setRoutine] = useRecoilState(routineState);
  

  console.log({routine})

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
    <Tab.Navigator initialRouteName='Home' sceneContainerStyle={styles.container} >
      <Tab.Screen
        name='Home'
        component={HomePage}
        initialParams={{ data }}
        options={{
          title: "Home",
          headerStyle: styles.navigationStyle,
          headerTitle: 'Home',
          
          headerTitleStyle:{
            color: "#ffffff",
            fontSize: 15,
          },
          headerRight: ({ color=globalVar.primaryColor, size }) => (
            <View style={{padding: 10}}>
            <Text style={{color: '#ffffff', fontSize: 15}}>{currentTime.toLocaleTimeString()}</Text>

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
          headerTitle: 'Routine',
          headerTitleStyle:{
            color: "#ffffff",
            fontSize: 15,
          },
          headerRight: ({ color=globalVar.primaryColor, size }) => (
            <View style={{padding: 10}}>
            <Text style={{color: '#ffffff', fontSize: 15}}>{currentTime.toLocaleTimeString()}</Text>

          </View>
          ),

          tabBarIcon: ({ color=globalVar.primaryColor, size }) => (
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
          tabBarIcon: ({ color=globalVar.primaryColor, size }) => (
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
          
          tabBarIcon: ({ color=globalVar.primaryColor, size }) => (
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
