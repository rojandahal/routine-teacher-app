import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import RoutineCard from "../Card/RoutineCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { APIEndpoint } from "../../env";
import moment from "moment";
import profileSelector from "../../selector/profileSelctor";
import { getBatchId } from "../../api/apiClient";

export default function HomePage({ navigation }) {
  const [data, setData] = useState([]);
  const [dataAvail, setdataAvail] = useState(false);
  const [userProfile, setUserProfile] = useRecoilState(profileSelector); // State for storing user profile data
  const [batch, setBatch] = useState(userProfile.batchId); // State for storing user type [Student/Teache

  const fetchBatch = async () => {
    try {
      const response = await getBatchId(APIEndpoint.getBatch, batch);
      setUserProfile({
        ...userProfile.profile,
        batchId: response.data.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    fetchBatch();
    let query;
    userProfile.userType === "Student"
      ? (query = APIEndpoint.getRoutine + `/${userProfile.batchId}`)
      : (query =
          APIEndpoint.searchRoutine +
          `?teacher=${userProfile.profile.abbreviation}&day=${moment().format(
            "dddd"
          )}`);
    console.log("Query", query);
    try {
      const response = await fetch(query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const responseData = await response.json();
        // Perform actions after successful response
        setData(responseData.data);
        responseData.data.length === 0
          ? setdataAvail(false)
          : setdataAvail(true);
      } else {
        // Handle other response statuses
        console.log(response.status);
        setdataAvail(false);
      }
    } catch (error) {
      // Handle fetch error
      console.error(error);
      setdataAvail(false);
    }
  };

  useEffect(() => {
    console.log("HomePage", userProfile);
    fetchData();
  }, []);

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
        <View style={styles.column}>
          <View style={styles.card}>
            <Text
              style={styles.cardTitle}
              onPress={() => navigation.navigate("Routine", { data })}
            >
              Routine
            </Text>
          </View>
          <View style={styles.card}>
            <Text
              style={styles.cardTitle}
              onPress={() => navigation.navigate("Attendance", { data })}
            >
              Attendance
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.nextRoutines}>Your upcoming classes: </Text>
        </View>

        {dataAvail || data.length !== 0 ? (
          <FlatList
            data={data}
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
