import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

function LandingPage({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>User Logged In:</Text>
      <Button
        title='Go to Signup'
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LandingPage;
