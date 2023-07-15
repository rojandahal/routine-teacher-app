import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import RoutineCard from "../Card/RoutineCard";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import TeacherAccordion from "../TeacherAccordion/TeacherAccordion";
import TeacherFilterChip from "../TeacherAccordion/TeacherFilterChip";
import { TextInput } from "react-native-paper";
import { APIEndpoint } from "../../env";
import { getAllRoutine, getBatch } from "../../api/apiClient";
import { Picker } from "@react-native-picker/picker";
import { globalVar } from "../../styles/global";

const Routine = () => {
  const [data, setData] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State for storing filtered data
  const [searchText, setSearchText] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [batches, setBatch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [teacherData, setTeacherData] = useState([]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const filterData = [
    {
      id: 1,
      name: "Batch",
    },
    {
      id: 2,
      name: "Group",
    },
    {
      id: 3,
      name: "Day",
    },
    {
      id: 4,
      name: "Lab",
    },
  ];

  const fetchData = async (filter) => {
    console.log('filter', filter)
    const filterString = []
    const filterArray = Object.entries(filter)?.length && Object.entries(filter).length && Object.entries(filter)?.map(([key, value], index) => index ===0 ? filterString.push(`?${key}=${value}`) : filterString.push(`&${key}=${value}`));
    setLoading(true); // Start loading
    const query = Object.entries(filter)?.length ? `${APIEndpoint.searchRoutine}${filterString.join('')}` : APIEndpoint.getRoutine;
    console.log({query})
    try {
      const response = await getAllRoutine(query);
      console.log("response", response.data);

      if (response?.status === 200) {
        // Perform actions after successful response
        setData(response?.data?.data);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("An unknown error occurred!");
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const fetchAllRoutine = async (filter) => {
    setLoading(true); // Start loading
    // Fetch the routine data for the teacher
    const query = APIEndpoint.getRoutine;
    try {
      const response = await getAllRoutine(query);
      console.log("response", response.data);

      if (response.status === 200) {
        // Perform actions after successful response
        setData(response?.data?.routines);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("An unknown error occurred!");
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchAllRoutine();
  }, []);

  useEffect(() => {
    // console.log("selectedData", selectedFilters);
    const fetchBatch = async () => {
      try {
        const response = await getBatch(APIEndpoint.batch);
        console.log(response);
        setBatch(response.data);
        setSelectedBatch(response.data[0]);
      } catch (error) {
        console.error(error);
        return error;
      }
    };
    fetchBatch();
  }, [data]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // console.log("unfocused");
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
    setSelectedBatch();
    setSelectedDay();
  };

  const applyFilters = () => {
    // Filter the data based on selected filters
    console.log({selectedBatch, selectedDay, selectedTeacher})
    console.log({
      ...(selectedBatch && { batch: selectedBatch }),
      ...(selectedDay && { day: selectedDay }),
      ...(selectedTeacher !== null && { teacher: selectedTeacher }),
    })
    fetchData({
      ...(selectedBatch && { batch: selectedBatch }),
      ...(selectedDay && { day: selectedDay }),
      ...(selectedTeacher !== null && { teacher: selectedTeacher }),
      ...(searchText && { search: searchText }),
      ...(selectedGroup && { group: selectedGroup }),
    })
    toggleFilterVisible()
  };

  const onFilterSelected = selectedFilters => {
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
          onLongPress={() => setFilterVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.filterContainer}>
              <View style={styles.filter}>
                <Text style={{ fontSize: 18 }}>Filter Routine</Text>
                <TextInput
                  style={{ margin: 4}}
                  mode='outlined'
                  label='Search'
                  onChangeText={text => handleFilterSearch(text)}
                />
                <View style={{ flexDirection: "row" }}>
                  <TeacherFilterChip
                    filterData={filterData}
                    selectedFilterReturn={onFilterSelected}
                  />
                </View>
                {selectedFilters.includes("Batch") ? (
                  <View>
                    <Picker
                      selectedValue={selectedBatch}
                      style={{
                        height: 50,
                        width: 250,
                        marginBottom: 10,
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedBatch(itemValue)
                      }
                    >
                      {batches?.map((batch, i) => (
                        <Picker.Item
                          label={batch}
                          value={batch}
                          key={i}
                        />
                      ))}
                    </Picker>
                  </View>
                ) : (
                  <></>
                )}
                {selectedFilters.includes("Group") ? (
                  <View>
                    <Picker
                      selectedValue={selectedGroup}
                      style={{
                        height: 50,
                        width: 250,
                        marginBottom: 10,
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedGroup(itemValue)
                      }
                    >
                      {["A", "B", "C", "D"].map((batch, i) => (
                        <Picker.Item
                          label={batch}
                          value={batch}
                          key={i}
                        />
                      ))}
                    </Picker>
                  </View>
                ) : (
                  <></>
                )}
                {selectedFilters.includes("Day") ? (
                  <View>
                    <Picker
                      selectedValue={selectedDay}
                      style={{
                        height: 50,
                        width: 250,
                        marginBottom: 10,
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedDay(itemValue)
                      }
                    >
                      {days.map((batch, i) => (
                        <Picker.Item
                          label={batch}
                          value={batch}
                          key={i}
                        />
                      ))}
                    </Picker>
                  </View>
                ) : (
                  <></>
                )}
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

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size='large'
            color='#1E90FF'
          />
          <Text style={{ marginTop: 10 }}>Loading...</Text>
        </View>
      ) : data && data.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18 }}>No Routine Found</Text>
        </View>
      ) : (
        <FlatList
          data={data}
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
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginStart: 10,
    marginEnd: 10,
    backgroundColor: globalVar.primaryColor,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Routine;
