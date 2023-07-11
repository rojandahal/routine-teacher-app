import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AttendanceTable from "../AttendanceTable/AttendanceTable";
import { StyleSheet } from "react-native";
import { CheckBox } from "@rneui/themed";

const studentData = [
  {
    studentId: "018301",
    attendance: [
      {
        date: "2021-09-01",
        status: "Present",
      },
    ],
  },
  {
    studentId: "018302",
    attendance: [
      {
        date: "2021-09-01",
        status: "Absent",
      },
    ],
  },
];

const Attendance = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    console.log(studentData);
  }, [checkedItems]);

  const handleCheckboxToggle = (item, key) => {
    studentData[key].attendance = [...new Set(studentData[key].attendance)];
    //Compare student data attendance and its values of array key for today and if it is not present then push it to the array
    // If it is present then remove it from the array
    // Handle Checked item with the attendance data array
    if (studentData[key].attendance.includes(item)) {
      studentData[key].attendance = studentData[key].attendance.filter(
        attendance => attendance !== item
      );
    } else {
      studentData[key].attendance.push(item);
    }
    setCheckedItems(studentData[key].attendance);
    setAttendanceData(studentData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Current Subject
        </Text>
      </View>
      {studentData.map((student, key) => {
        const isPresent = student.attendance.includes("Present");
        const isAbsent = student.attendance.includes("Absent");

        return (
          <View style={styles.checkBoxContainer}>
            <Text style={styles.checkBoxText}>{student.studentId}</Text>
            <CheckBox
              title='Present'
              style={styles.checkBox}
              checked={isPresent}
              onPress={() => {
                if (!isAbsent) {
                  handleCheckboxToggle("Present", key);
                }
              }}
              disabled={isAbsent}
            />
            <CheckBox
              title='Absent'
              style={styles.checkBox}
              checked={isAbsent}
              onPress={() => {
                if (!isPresent) {
                  handleCheckboxToggle("Absent", key);
                }
              }}
              disabled={isPresent}
            />
          </View>
        );
      })}

      {/* Add more CheckBox components for additional items */}
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
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkBoxText: {
    fontSize: 16,
    marginEnd: 10,
  },
});

export default Attendance;
