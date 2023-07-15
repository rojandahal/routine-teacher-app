import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import RoutineCard from "../Card/RoutineCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { APIEndpoint } from "../../env";
import moment from "moment";
import profileSelector from "../../selector/profileSelctor";
import { getBatchId, getProfile, getRoutine } from "../../api/apiClient";
import routineState from "../../recoil/routineState";
import TabList from "../TabLIst";
import CardSwiper from "../Swiper/CardSwiper";

export default function HomePage({ navigation }) {
  const [data, setData] = useState([]);
  const [routine, setRoutine] = useRecoilState(routineState);
  const [dataAvail, setdataAvail] = useState(false);
  const [userProfile, setUserProfile] = useRecoilState(profileSelector); // State for storing user profile data
  const [batch, setBatch] = useState(userProfile.batchId); // State for storing user type [Student/Teacher]
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch user profile data
  const fetchProfile = async token => {
    try {
      const response = await getProfile(APIEndpoint.profileStudent, token);
      setUserProfile({
        ...userProfile,
        profile: response.data,
      });
      return response.data;
    } catch (error) {
      // Handle fetch error
      console.error(error);
      return undefined;
    }
  };

  const fetchRoutine = async batchId => {
    let query;
    userProfile.profile.role === "student"
      ? (query = APIEndpoint.getRoutine + `/${userProfile.profile.batchId.id}?group=${userProfile.profile.group}`)
      : (query =
          APIEndpoint.searchRoutine +
          `?teacher=${userProfile.profile.abbreviation}&day=${moment().format(
            "dddd"
          )}`);
    console.log("Query", query);
    try {
      const response = await getRoutine(query);
      console.log("Response", response.data);
      setRoutine({ routine: response?.data?.data });
    } catch (error) {
      console.log(error);
      setLoading(false); // Stop loading

    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchProfile(userProfile?.token);
  }, [ navigation.getState().routes]);

  console.log('navigator', navigation.getState().routes)

  useEffect(() => {
    if (userProfile.profile?.batchId?.id) {
      console.log("batchid", { id: userProfile.profile.batchId?.id });
      fetchRoutine(userProfile.profile.batchId?.id);
    }
  }, [, userProfile]);

  console.log("HomePage", userProfile);
  console.log("Routine", routine);

  const getTeacherName = data => {
    // if (!profileData.profile.name) return data;
    // const teacherName = profileData.profile.name;
    // const abbreviatedTeacherName = profileData.profile.abbreviation;
    // const filteredData = data.filter(
    //   item =>
    //     item.teacher === teacherName || item.teacher === abbreviatedTeacherName
    // );
    // return filteredData;
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.nextRoutines}>Your upcoming classes: </Text>
        </View>
        {/* <TabList /> */}

        {loading ? ( // Show loading indicator while loading
          <ActivityIndicator
            style={styles.loadingIndicator}
            size='large'
            color='#1E90FF'
          />
        ) : routine && routine?.length !== 0 ? (
          // <FlatList
          //   data={routine?.routine}
          //   renderItem={({ item }) => <RoutineCard data={item} />}
          //   keyExtractor={item => item.id}
          // />
          <CardSwiper cards={routine?.routine} />
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No upcoming classes
          </Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  column: {
    flexDirection: "row",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    padding: 16,
    margin: 16,
    width: 150,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  nextRoutines: {
    marginTop: 20,
    marginStart: 20,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  groupBatch: {
    flexDirection: "row",
    paddingStart: 15,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#ccc",
    marginTop: 5,
    marginBottom: 5,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
