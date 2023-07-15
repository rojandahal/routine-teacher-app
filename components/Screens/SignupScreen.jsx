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
import { globalVar } from "../../styles/global";

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
  const [selectedGroup, setSelectedGroup] = useState('');

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
        group: selectedGroup,
      };

      // Make a POST request to the API endpoint
      const response = await registerUser(APIEndpoint.register, user);
      if (response?.status === 201) {
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
      
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>

      <KeyboardAvoidingView style={styles.containerInner}>
        <Text style={styles.heading}>Sign Up</Text>
        <Image
          style={styles.image}
          source={require("../../assets/favicon.png")}
        />
        <StatusBar style='auto' />
        <View style={styles.inputView}>
      <Text style={styles.labelInput}>Email</Text>

        <TextInput
          style={styles.TextInput}
          onChangeText={email => setEmail(email)}
        />
      </View>



        <View style={styles.inputView}>
      <Text style={styles.labelInput}>Password</Text>

          <TextInput
            style={styles.TextInput}
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
      <Text style={styles.labelInput}>First Name</Text>

          <TextInput
            style={styles.TextInput}
            onChangeText={firstName => setFirstName(firstName)}
          />
        </View>

        <View style={styles.inputView}>
      <Text style={styles.labelInput}>Last Name</Text>

          <TextInput
            style={styles.TextInput}
            onChangeText={lastName => setLastName(lastName)}
          />
        </View>

        <View style={styles.flexer}>
          <Text style={styles.subHeading}>Batch: </Text>
        <Picker
          selectedValue={selectedBatch}
          style={{...styles.inputView,  ...styles.dropdown}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedBatch(itemValue)
            }
          >
            {batches.map((batch, itemIndex) => (
              <Picker.Item
                label={batch}
                value={batch}
								key={itemIndex}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.flexer}>
          <Text style={styles.subHeading}>Group: </Text>
        <Picker
          selectedValue={selectedBatch}
          style={{...styles.inputView,  ...styles.dropdown}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedGroup(itemValue)
            }
          >
            {['A', 'B', 'C', 'D'].map((batch, itemIndex) => (
              <Picker.Item
                label={batch}
                value={batch}
								key={itemIndex}
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
  loadingIndicator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: globalVar.primaryColor

  },  
  subHeading: {
    fontSize: 15,
  },
  flexer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  dropdown: {
    backgroundColor: 'transparent',
    width: '50%',
  },  
  containerInner: {
    flex: 1,
    marginTop: 50,
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  labelInput: {
    position: "absolute",
    top: -9,
    left: 10,
    backgroundColor: "#fff",
  },
  inputView: {
    position: 'relative',
		borderWidth: 1,
		borderColor: globalVar.primaryColor,
    borderRadius: 5, 
    width: "70%",
    height: 45,
    // marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  TextInput: {
    height: 50,
    flex: 1,
		borderWidth: 0,
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
  },

  errorText: {
    color: "red",
    marginBottom: 10,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: globalVar.primaryColor,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
});
