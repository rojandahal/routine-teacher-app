import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { APIEndpoint } from "../../env";
import { getProfile, loginUser } from "../../api/apiClient";
import { useRecoilState } from "recoil";
import profileSelector from "../../selector/profileSelctor";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import { loginAtom } from "../../recoil/ProfileState";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useRecoilState(profileSelector); // State for storing user profile data
  const [selectedValue, setSelectedValue] = useState("Student");
  const [loggedIn, setLoggedIn] = useRecoilState(loginAtom);

  // Function to fetch user profile data
  // const fetchProfile = async token => {
  //   console.log("fetching profile", token);
  //   try {
  //     const response = await getProfile(APIEndpoint.profileStudent, token);
  //     setUserProfile({
  //       ...userProfile,
  //       profile: response.data,
  //       batchId: response.data.batch,
  //     });
  //     console.log({ response });
  //     // console.log("Batch:", response.data.batch);
  //     // setBatch(response.data.batch);
  //   } catch (error) {
  //     // Handle fetch error
  //     console.error(error);
  //   }
  // };

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    if (email.length === 0 || password.length === 0) {
      setError("Please enter all data.");
      setLoading(false);
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@nec\.edu\.np$/.test(email)) {
      setError("Email must be of nec.edu.np.");
      setLoading(false);
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    if (selectedValue === "") {
      setError("Please select your role.");
      setLoading(false);
      return;
    }

    const user = {
      email: email,
      password: password,
    };
    console.log(user);

    try {
      const response =
        selectedValue === "Student"
          ? await loginUser(APIEndpoint.login, user)
          : await loginUser(APIEndpoint.loginTeacher, user);
      if (response.status === 200) {
        // console.log("Login successful");
        // fetchProfile(response.data.token);
        // Perform actions after successful login
        // Change state of userLoggedIn to true and
        // pass it as a prop to the Navigation component
        setUserProfile({
          ...userProfile,
          token: response?.data?.token,
        });
        Toast.show({
          type: "success",
          text1: "Login successful",
          text2: "Welcome to NEC Routine",
        });
        setLoggedIn({
          userLoggedIn: true,
        });
      } else {
        const errorData = response.data.error;
        console.log(errorData);
        setError(errorData);
      }
    } catch (error) {
      setError("An unknown error occurred!");
      console.error(error);
    }

    setLoading(false);
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

      <View>
        <Text>Choose your role:</Text>
        <Picker
          selectedValue={selectedValue}
          style={{
            height: 50,
            width: 150,
          }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item
            value='Student'
            label='Student'
          />
          <Picker.Item
            value='Teacher'
            label='Teacher'
          />
        </Picker>
      </View>

      <TouchableOpacity>
        <Text
          style={styles.forgot_button}
          onPress={() => navigation.navigate("Signup")}
        >
          Are you a Student ? Signup
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleLogin}
      >
        {loading ? (
          <ActivityIndicator color='white' />
        ) : (
          <Text style={styles.loginText}>LOGIN</Text>
        )}
      </TouchableOpacity>

      {error !== "" && <Text style={styles.errorText}>{error}</Text>}
      <Toast />
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
