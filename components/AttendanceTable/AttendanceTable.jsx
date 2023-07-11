import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const AttendanceTable = ({data}) => {
	console.log(data)
  return (
    <View>
      <View style={styles.card}>
        <View style={{ marginStart: 10 }}>
          <Text style={styles.cardTitle}>{data.subject}</Text>	
          <Text style={styles.cardText}>Attendance: {data.attendance}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginStart: 20,
  },
  headingText: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageThumbnail: {
    width: 50,
    height: 50,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    marginBottom: 16,
    width: 300,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
  },
});

export default AttendanceTable;
