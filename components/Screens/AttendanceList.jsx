import { CheckBox } from "@rneui/themed";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalVar } from "../../styles/global";
import { APIEndpoint } from "../../env";
import { submitAttendance } from "../../api/apiClient";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/core";

export default function AttendanceList({ route }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [studentData, setStudentData] = useState(route?.params?.students);
  const [isLoading, setIsLoading] = useState(false);
  const subject = route?.params?.subject;
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Attendance Data", attendanceData);
    console.log("Student Data", subject);
  }, [attendanceData, studentData]);

  const handleCheckboxToggle = (action, studentId) => {
    if (action === "present") {
      if (attendanceData.includes(studentId)) {
        setAttendanceData(attendanceData.filter(id => id !== studentId));
        return;
      }
      setAttendanceData([...attendanceData, studentId]);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = {
      subject_name: subject,
      studentIds: attendanceData,
    };
    try {
      const response = await submitAttendance(
        APIEndpoint.submitAttendance,
        data
      );
      console.log(response?.data);
      Toast.show({
        type: "success",
        text1: "Attendance Submitted",
        text2: "Attendance has been submitted successfully",
        onHide: () => {
          setIsLoading(false);
          navigation.goBack();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return studentData.map((student, key) => {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{subject}</Text>
        <View style={styles.checkBoxContainer}>
          <Text
            style={styles.checkBoxText}
            key={key}
          >
            {student.firstname}
          </Text>
          <CheckBox
            title='Present'
            style={styles.checkBox}
            checked={attendanceData.includes(student.id)}
            onPress={() => {
              handleCheckboxToggle("present", student.id, key);
            }}
          />
          <CheckBox
            title='Absent'
            style={styles.checkBox}
            checked={!attendanceData.includes(student.id)}
            onPress={() => {
              handleCheckboxToggle("absent", student.id, key);
            }}
            disabled={attendanceData.includes(student.id)}
          />
        </View>
        <TouchableOpacity>
          <Button
            title='Submit'
            color={globalVar.primaryColor}
            onPress={handleSubmit}
            disabled={isLoading} // Disable the button when loading
          />
          {isLoading && (
            <ActivityIndicator
              size='small'
              color={globalVar.primaryColor}
              style={styles.loadingIndicator}
            />
          )}
        </TouchableOpacity>
        <Toast />
      </View>
    );
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  checkBoxContainer: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1f1",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
    padding: 10,
  },
  checkBoxText: {
    fontSize: 16,
    marginEnd: 10,
  },
});
