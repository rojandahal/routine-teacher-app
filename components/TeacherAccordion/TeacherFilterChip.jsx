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

// import React, { useEffect, useState, useCallback } from "react";
// import { FlatList } from "react-native";
// import { Chip } from "react-native-paper";

// const TeacherFilterChip = React.memo(({ filterData, selectedFilterReturn }) => {
// 	const [selectedFilters, setSelectedFilters] = useState([]);

// 	useEffect(() => {
// 		selectedFilterReturn(selectedFilters);
// 	}, [selectedFilters, selectedFilterReturn]);

// 	const handleFilterSelection = useCallback(
// 		(filterName) => {
// 			setSelectedFilters((prevSelectedFilters) => {
// 				if (prevSelectedFilters.includes(filterName)) {
// 					return prevSelectedFilters.filter((item) => item !== filterName);
// 				} else {
// 					return [...prevSelectedFilters, filterName];
// 				}
// 			});
// 		},
// 		[]
// 	);

// 	const renderItem = useCallback(
// 		({ item }) => (
// 			<Chip
// 				mode="outlined"
// 				showSelectedOverlay={true}
// 				style={{ margin: 4 }}
// 				onPress={() => handleFilterSelection(item.name)}
// 				selected={selectedFilters.includes(item.name)}
// 			>
// 				{item.name}
// 			</Chip>
// 		),
// 		[selectedFilters, handleFilterSelection]
// 	);

// 	const keyExtractor = useCallback((item) => item.id.toString(), []);

// 	return (
// 		<FlatList
// 			horizontal={true}
// 			data={filterData}
// 			renderItem={renderItem}
// 			keyExtractor={keyExtractor}
// 		/>
// 	);
// });

// export default TeacherFilterChip;
