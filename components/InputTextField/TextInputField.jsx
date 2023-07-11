import { View, Text, TextInput } from "react-native";
import React from "react";

export default function TextInputField({ name, value, setValue, isEditing }) {
  return (
    <>
      <Text>{name}:</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        editable={isEditing}
        style={{ borderWidth: 1, padding: 5, marginBottom: 10, width: 200 }}
      />
    </>
  );
}
