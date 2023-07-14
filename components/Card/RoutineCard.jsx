import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import moment from "moment";
import { useRecoilValue } from "recoil";
import profileState from "../../recoil/ProfileState";

export default function RoutineCard({ data }) {
  // const currentTime = moment();
  // const endingTime = moment(data.endingTime, "ha");
  // const isCompleted = endingTime.isBefore(currentTime);
  const isCompleted = false;

  return (
    <View style={[styles.container, isCompleted && styles.disabledContainer]}>
      <View style={[styles.card, isCompleted && styles.disabledCard]}>
        <View style={styles.headingText}>
          <Image
            style={styles.imageThumbnail}
            source={require("../../assets/png/profile.png")}
          />
          <View style={{ marginStart: 10 }}>
            <Text style={styles.cardText}>Subject:</Text>
            <Text style={styles.cardTitle}>{data.class_description}</Text>
          </View>
        </View>
        <View style={styles.bottomText}>
          <Text style={styles.cardText}>{data.day}</Text>
        </View>
        <View style={styles.bottomText}>
          <Text style={styles.cardText}>{data.class_time.split(" ")[0]}</Text>
          <Text style={styles.cardText}> - </Text>
          <Text style={styles.cardText}>{data.class_time.split(" ")[1]}</Text>
        </View>

        <Text style={styles.cardRoom}>Room: {data.room}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  headingText: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageThumbnail: {
    width: 50,
    height: 50,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    marginBottom: 16,
  },
  disabledCard: {
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
  },
  cardRoom: {
    fontWeight: "bold",
    textAlign: "right",
    flexWrap: "wrap",
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
