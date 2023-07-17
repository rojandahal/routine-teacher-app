import { StyleSheet } from "react-native";

export const globalVar = {
  primaryColor: "#f4511e",
  secondaryColor: "#f4511e",
  tertiaryColor: "#f4511e",
  fontSize: 16,
  borderRadius: 25,
};

export const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 280,
    height: 280,
    marginLeft: "15%",
    marginTop: "10%",
  },
  text: {
    color: "white",
    // marginTop: '-25%',
    fontSize: 16,
    marginTop: "8%",
    textAlign: "center",
  },
  signup: {
    backgroundColor: "white",
    color: "#f4511e",
    width: "75%",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: "11%",
    padding: "2%",
    fontSize: 27,
    marginTop: "83%",
  },
  login: {
    backgroundColor: "#f4511e",
    color: "white",
    width: "75%",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: "11%",
    padding: "2%",
    fontSize: 27,
    marginTop: "10%",
  },
  navigationStyle: {
    backgroundColor: "#f4511e",
  },
  container: {
    height: 1000,
  },
});
