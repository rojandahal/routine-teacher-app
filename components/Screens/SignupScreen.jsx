import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { APIEndpoint } from "../../env";
import { getBatch, registerUser } from "../../api/apiClient";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-gesture-handler";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [error, setError] = useState(""); // State for displaying error messages
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [batches, setBatch] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");

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

  useEffect(() => {
    fetchBatch();
    console.log("Batch", batches);
  }, [batches.length === 0]);

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
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@nec\.edu\.np$/.test(email)) {
      setError("Email must be of nec.edu.np.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    if (selectedBatch === "") {
      setError("Please select your batch.");
      setLoading(false);
      return;
    }

    try {
      // Create an object with the user's data
      const user = {
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
        batch: selectedBatch,
      };

      // Make a POST request to the API endpoint
      const response = await registerUser(APIEndpoint.register, user);
      if (response.status === 201) {
        console.log("Registration successful");
        Toast.show({
          type: "success",
          text1: "Registration successful",
          text2: "Please login to continue",
          onHide: () => navigation.navigate("Login"),
        });
        // Perform actions after successful signup
      } else {
        console.log("Registration failed");
        console.log(response.data.error);
        setError(response.data.error);
      }
    } catch (error) {
      setError("An unknown error occurred!");
      console.error(error);
    }

    setLoading(false);
  };

  return batches.length === 0 ? (
    <View style={styles.loadingIndicator}>
      <ActivityIndicator color='black' />
      <Text style={{ marginTop: 10 }}>Loading...</Text>
    </View>
  ) : (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={styles.containerInner}>
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

        <View>
          <Text>Choose your batch:</Text>
          <Picker
            selectedValue={selectedBatch}
            style={{
              height: 50,
              width: 250,
              backgroundColor: "#FFC0CB",
              marginBottom: 10,
            }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedBatch(itemValue)
            }
          >
            {batches.map(batch => (
              <Picker.Item
                label={batch}
                value={batch}
              />
            ))}
          </Picker>
        </View>

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
        <Toast />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerInner: {
    flex: 1,
    marginTop: 50,
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
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
