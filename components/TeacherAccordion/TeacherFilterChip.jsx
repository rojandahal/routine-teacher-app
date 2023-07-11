import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Chip, TextInput } from "react-native-paper";

const TeacherFilterChip = ({ filterData, selectedFilterReturn }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    selectedFilterReturn(selectedFilters);
  }, [selectedFilters]);

  const handleFilterSelection = filterName => {
    if (selectedFilters.includes(filterName)) {
      setSelectedFilters(selectedFilters.filter(item => item !== filterName));
    } else {
      setSelectedFilters([...selectedFilters, filterName]);
    }
  };

  return (
    <FlatList
      horizontal={true}
      data={filterData}
      renderItem={({ item }) => (
        <Chip
          mode='outlined'
          showSelectedOverlay={true}
          style={{ margin: 4 }}
          onPress={() => handleFilterSelection(item.name)}
          selected={selectedFilters.includes(item.name)}
        >
          {item.name}
        </Chip>
      )}
      keyExtractor={item => item.id}
			/>
  );
};

export default TeacherFilterChip;
