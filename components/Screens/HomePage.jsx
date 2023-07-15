import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import RoutineCard from "../Card/RoutineCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { APIEndpoint } from "../../env";
import moment from "moment";
import profileSelector from "../../selector/profileSelctor";
import { getBatchId, getProfile, getRoutine } from "../../api/apiClient";
import routineState from "../../recoil/routineState";

export default function HomePage({ navigation }) {
  const [data, setData] = useState([]);
  const [routine, setRoutine] = useRecoilState(routineState);
  const [dataAvail, setdataAvail] = useState(false);
  const [userProfile, setUserProfile] = useRecoilState(profileSelector); // State for storing user profile data
  const [batch, setBatch] = useState(userProfile.batchId); // State for storing user type [Student/Teache

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
      ? (query = APIEndpoint.getRoutine + `/${userProfile.profile.batchId.id}`)
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
    }
    // try {
    //   const response = await fetch(query, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   console.log("responsrouine", { response });

    //   if (response.status === 200) {
    //     const responseData = await response.json();
    //     // Perform actions after successful response
    //     setRoutine({ routine: responseData.data });
    //     responseData.data.length === 0
    //       ? setdataAvail(false)
    //       : setdataAvail(true);
    //   } else {
    //     // Handle other response statuses
    //     console.log(response.status);
    //     setdataAvail(false);
    //   }
    // } catch (error) {
    //   // Handle fetch error
    //   console.error(error);
    // } finally {
    //   setdataAvail(false);
    // }
  };

  useEffect(() => {
    fetchProfile(userProfile?.token);
  }, []);

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

        {routine || routine?.length !== 0 ? (
          <FlatList
            data={routine?.routine}
            renderItem={({ item }) => <RoutineCard data={item} />}
            keyExtractor={item => item.id}
          />
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
});
