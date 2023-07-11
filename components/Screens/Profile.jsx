import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import TextInputField from "../InputTextField/TextInputField";

const ProfileScreen = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [batch, setBatch] = useState("2022");
  const [group, setGroup] = useState("A");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // You can perform any necessary actions to fetch the profile data
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // You can perform any necessary actions to save the updated profile data
  };

  const profileValues = [
    {
      id: 1,
      name: "Name",
      value: name,
      setValue: setName,
    },
    {
      id: 2,
      name: "Email",
      value: email,
      setValue: setEmail,
    },
    {
      id: 3,
      name: "Batch",
      value: batch,
      setValue: setBatch,
    },
    {
      id: 4,
      name: "Group",
      value: group,
      setValue: setGroup,
    },
  ];

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Student's Profile
      </Text>
      {profileValues.map(item => (
        <TextInputField
          key={item.id}
          name={item.name}
          value={item.value}
          setValue={item.setValue}
          isEditing={isEditing}
        />
      ))}

      {isEditing ? (
        <TouchableOpacity
          onPress={handleSave}
          style={{ paddingVertical: 10 }}
        >
          <Text style={{ fontSize: 15, textDecorationLine: "underline" }}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleEdit}
          style={{ paddingVertical: 10 }}
        >
          <Text style={{ fontSize: 15, textDecorationLine: "underline" }}>
            Edit
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileScreen;
