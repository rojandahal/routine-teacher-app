import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Chip, List } from "react-native-paper";

const TeacherAccordion = ({ teacherData, selectedTeacherReturn }) => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleTeacherSelection = teacherName => {
    setSelectedTeacher(teacherName);
    selectedTeacherReturn(teacherName);
  };

  return (
    <List.Section>
      <List.Accordion
        left={props => <List.Icon {...props} />}
        title='Select Teacher'
      >
        <FlatList
          style={{ maxHeight: 200 }}
          data={teacherData}
          renderItem={({ item }) => (
            <Chip
              mode='flat'
              showSelectedOverlay={true}
              style={{ margin: 4 }}
              onPress={() =>
                selectedTeacher
                  ? handleTeacherSelection(null)
                  : handleTeacherSelection(item.name)
              }
              selected={selectedTeacher === item.name}
            >
              {item.name}
            </Chip>
          )}
          keyExtractor={item => item.id}
        />
      </List.Accordion>
    </List.Section>
  );
};

export default TeacherAccordion;
