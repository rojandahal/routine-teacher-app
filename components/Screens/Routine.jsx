import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import RoutineCard from "../Card/RoutineCard";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import TeacherAccordion from "../TeacherAccordion/TeacherAccordion";
import TeacherFilterChip from "../TeacherAccordion/TeacherFilterChip";
import { TextInput } from "react-native-paper";
import { useRecoilState, useRecoilValue } from "recoil";
import API, { APIEndpoint } from "../../env";
import { getAllRoutine } from "../../api/apiClient";

const Routine = () => {
  const route = useRoute();
  const [data, setData] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const teacherData = [
    {
      id: 1,
      name: "SK",
    },
    {
      id: 2,
      name: "AKJ",
    },
    {
      id: 3,
      name: "AG",
    },
    {
      id: 4,
      name: "Teacher 4",
    },
    {
      id: 5,
      name: "Teacher 5",
    },
  ];
  const filterData = [
    {
      id: 1,
      name: "Subject",
    },
    {
      id: 2,
      name: "Batch",
    },
  ];

  const fetchData = async () => {
    // Do something when the screen is focused
    // console.log("focused");
    // Fetch the routine data for the teacher
    const query = APIEndpoint.getRoutine;
    try {
      const response = await getAllRoutine(query);
      console.log("response", response.data);

      if (response.status === 200) {
        // Perform actions after successful response
        setData(response?.data?.routines);
        // Perform actions after successful login
        // navigation.replace("Home", { userLoggedIn: true });
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("An unknown error occurred!");
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // console.log("unfocused");
        setFilteredData(data);
        setSelectedFilters([]);
        setSearchText("");
        setSelectedTeacher(null);
      };
    }, [])
  );

  const toggleFilterVisible = () => {
    setFilterVisible(!filterVisible);
    setSelectedFilters([]);
    setSearchText("");
    setSelectedTeacher(null);
  };

  const closeModal = () => {
    setFilterVisible(false);
  };

  const applyFilters = () => {
    // Filter the data based on selected filters
    let filteredData = data;
    if (selectedFilters.includes("Subject")) {
      filteredData = filteredData.filter(item =>
        item.class_description.toUpperCase().includes(searchText.toUpperCase())
      );
    }
    // Filter the data based on selected teacher
    if (selectedTeacher !== null) {
      filteredData = filteredData.filter(
        item => item.teacher === selectedTeacher
      );
    }

    setFilteredData(filteredData);
    // Close the filter modal
    closeModal();
  };

  const onFilterSelected = selectedFilters => {
    // console.log("selectedData", selectedFilters);
    setSelectedFilters(selectedFilters);
  };

  const handleFilterSearch = text => {
    setSearchText(text);
  };

  const onSelectedTeacher = selectedTeachers => {
    setSelectedTeacher(selectedTeachers);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleFilterVisible}
        style={styles.filterButton}
      >
        <Text style={{ fontSize: 18, textAlign: "center" }}>Filter</Text>
      </TouchableOpacity>

      <Modal
        visible={filterVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setFilterVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContainer}
          onPress={closeModal}
        >
          <View style={styles.modalContent}>
            <View style={styles.filterContainer}>
              <View style={styles.filter}>
                <Text style={{ fontSize: 18 }}>Filter Routine</Text>
                <View style={{ flexDirection: "row" }}>
                  <TeacherFilterChip
                    filterData={filterData}
                    selectedFilterReturn={onFilterSelected}
                  />
                </View>
                {selectedFilters.length > 0 ? (
                  <TextInput
                    style={{ margin: 4 }}
                    mode='outlined'
                    label='Search'
                    onChangeText={text => handleFilterSearch(text)}
                  />
                ) : null}
              </View>
              <View style={{ marginBottom: 10, width: "50%" }}>
                <TeacherAccordion
                  teacherData={teacherData}
                  style={styles.accordion}
                  selectedTeacherReturn={onSelectedTeacher}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={applyFilters}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {filteredData && filteredData.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18 }}>No Routine Found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData ? filteredData : data}
          renderItem={({ item }) => <RoutineCard data={item} />}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    borderColor: "#ccc",
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "20%",
    borderRadius: 8,
    padding: 10,
    marginEnd: 10,
    marginStart: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  filterContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    width: "100%",
  },
  filter: {
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginStart: 10,
    marginEnd: 10,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Routine;
