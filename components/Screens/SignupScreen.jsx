import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import API from "../../env";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [error, setError] = useState(""); // State for displaying error messages
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError(""); // Clear previous error messages
    setLoading(true); // Show loading indicator

    // Validation checks
    if (
      email.length === 0 ||
      password.length === 0 ||
      firstName.length === 0 ||
      lastName.length === 0
    ) {
      setError("Please enter all data.");
      setLoading(false);
    } else if (!/^[a-zA-Z0-9._%+-]+@nec\.edu\.np$/.test(email)) {
      setError("Email must be of nec.edu.np.");
      setLoading(false);
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
    } else {
      // Valid form data, proceed with login logic
      // Add your login code here
      // Create an object with the user's data
      const user = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      };

      try {
        // Make a POST request to the API endpoint
        const response = await fetch(API.register, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        // Check the response status
        if (response.status === 200) {
          // Registration successful
          // You can perform additional actions, such as displaying a success message or navigating to another screen
          console.log("Registration successful", response);
        } else {
          // Registration failed
          // You can handle different error scenarios based on the response status and display appropriate error messages
          const errorData = await response.json();
          setError(errorData.message);
          console.error(errorData);
        }
      } catch (error) {
        // Network error or other exceptions
        setError(error.message);
        console.error(error);
      }
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/favicon.png")}
      />
      <StatusBar style='auto' />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Email.'
          placeholderTextColor='#003f5c'
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Password.'
          placeholderTextColor='#003f5c'
          secureTextEntry={!showPassword}
          onChangeText={password => setPassword(password)}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.toggleButtonText}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='First name.'
          placeholderTextColor='#003f5c'
          onChangeText={firstName => setFirstName(firstName)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Last Name.'
          placeholderTextColor='#003f5c'
          onChangeText={lastName => setLastName(lastName)}
        />
      </View>

      {/* <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity> */}

      {error !== "" && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleSignup}
      >
        {loading ? (
          <ActivityIndicator color='white' />
        ) : (
          <Text style={styles.loginText}>REGSTER</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={styles.forgot_button}
          onPress={() => navigation.navigate("Login")}
        >
          Already a user? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  TextInput: {
    height: 50,
    flex: 1,
  },

  toggleButton: {
    marginLeft: 10,
  },

  toggleButtonText: {
    color: "#003f5c",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    marginTop: 20,
  },

  errorText: {
    color: "red",
    marginBottom: 10,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#560CCE",
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
});
