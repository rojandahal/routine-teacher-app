import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import AttendanceTable from "../AttendanceTable/AttendanceTable";
import { StyleSheet } from "react-native";
import { CheckBox } from "@rneui/themed";
import { getStudentList, getSubjectOfTeacher } from "../../api/apiClient";
import { APIEndpoint } from "../../env";
import { useRecoilState } from "recoil";
import profileSelector from "../../selector/profileSelctor";
import RoutineCard from "../Card/RoutineCard";
import SubjectCard from "../Card/SubjectCard";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

const Attendance = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [userProfile, setUserProfile] = useRecoilState(profileSelector);
  const navigation = useNavigation();

  const fetchSubjectOfTeacher = async () => {
    //fetch subject of teacher
    try {
      const response = await getSubjectOfTeacher(
        APIEndpoint.getSubjects,
        userProfile.token
      );
      console.log(response?.data);
      setSubjectList(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudents = async subject => {
    //fetch students
    try {
      const response = await getStudentList(APIEndpoint.getStudents, {
        subject_name: subject.class_description,
      });
      console.log("Student List", response?.data?.data);
      setStudentList(response?.data?.data);
      navigation.navigate("AttendanceList", {
        students: studentList,
        subject: subject.class_description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userProfile.role === "teacher") fetchSubjectOfTeacher();
  }, [subjectList.length === 0]);

  return userProfile.role === "student" ? (
    <Text>Student</Text>
  ) : (
    <View style={styles.container}>
      <View style={styles.filter}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Current Subjects
        </Text>
      </View>
      <FlatList
        data={subjectList}
				key={subjectList.id}
        renderItem={({ item, index }) => (
          <SubjectCard
            data={item}
            key={index}
            handlePress={() => {
              fetchStudents(item);
            }}
          />
        )}
        keyExtractor={item => item.studentId}
      />
      {/* {studentData.map((student, key) => {
        const isPresent = student.attendance.includes("Present");
        const isAbsent = student.attendance.includes("Absent");

        return (
          <View style={styles.checkBoxContainer}>
            <Text
              style={styles.checkBoxText}
              key={key}
            >
              {student.studentId}
            </Text>
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
      })} */}

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
