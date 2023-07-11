import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

function LandingPage({ navigation, route }) {
  const userLoggedIn = route?.params?.userLoggedIn || false;

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>User Logged In: {userLoggedIn.toString()}</Text>
      <Button
        title='Go to Details'
        onPress={() => navigation.navigate("Signup")}
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
