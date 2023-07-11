import { View, Text } from "react-native";
import React from "react";
import AttendanceTable from "../AttendanceTable/AttendanceTable";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";

const data = [
  {
    id: 1,
    subject: "Math",
    attendance: "12",
  },
  {
    id: 2,
    subject: "Engineering Entreprenurships",
    attendance: "12",
  },
];
const Attendance = () => {
  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Total</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <AttendanceTable data={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginStart: 20,
  },
  filter: {
    marginBottom: 20,
  },
});

export default Attendance;
