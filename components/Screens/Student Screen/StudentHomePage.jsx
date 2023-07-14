import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import profileState from "../../../recoil/ProfileState";
import moment from "moment";
import RoutineCard from "../../Card/RoutineCard";
import { APIEndpoint } from "../../../env";

export default function StudentHomePage({ navigation }) {
  const route = useRoute();
  const [data, setData] = useState([]);
  const profileData = useRecoilValue(profileState);
  const [dataAvail, setdataAvail] = useState(false);
  // const query =
  //   APIEndpoint.searchRoutine +
  //   `?teacher=${profileData.profile.abbreviation}&day=${moment().format(
  //     "dddd"
  //   )}`;

  const fetchData = async () => {
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
