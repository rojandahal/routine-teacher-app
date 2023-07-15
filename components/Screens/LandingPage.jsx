import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { Animated, Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomeAnimation } from "../Animation/CustomAnimation";

function LandingPage({ navigation, route }) {
  return (
      <ImageBackground
        source={require('../../assets/final.jpg')}
        style={styles.background}
      >
        <View>
          <CustomeAnimation text={'Welcome to the NEC Routine System'} fontSize={40} />
          <TouchableOpacity
            // onPress={this.signupPressed}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.login}>Log In</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Feel free to send us feedback.</Text>

      </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  logo:{
    width: 280,
    height: 280,
    marginLeft: '15%',
    marginTop: '10%'
  },
  text: {
    color: 'white',
    // marginTop: '-25%',
    fontSize:  16,
    marginTop: '8%',
    textAlign: 'center',
  },
  signup: {
    backgroundColor: 'white',
    color: '#f4511e',
    width: "75%",
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '11%',
    padding: "2%",
    fontSize:  27,
    marginTop: '83%'
  },
  login: {
    backgroundColor: '#f4511e',
    color: 'white',
    width: "75%",
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '11%',
    padding: "2%",
    fontSize:  27,
    marginTop: '10%'
  }
});

export default LandingPage;