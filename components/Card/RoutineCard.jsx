import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import moment from "moment";
import { useRecoilState, useRecoilValue } from "recoil";
import profileState from "../../recoil/ProfileState";
import { globalVar } from "../../styles/global";
import { Animated, PanResponder, Dimensions, FlatList } from "react-native";
import { swipeState } from "../../recoil/swipeState";
import profileSelector from "../../selector/profileSelctor";

export default function RoutineCard({ data, id, swiperEnabled = false }) {
  const [isTeacher, setIsTeacher] = useRecoilState(profileSelector);
  const [isSwiped, setIsSwiped] = useRecoilState(swipeState);
  const pan = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.8; // Adjust this value as needed

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10,
      onPanResponderMove: (_, gestureState) => {
        pan.setValue(gestureState.dx);
      },
      onPanResponderRelease: (test, gestureState) => {
        if (isTeacher?.profile?.role === "teacher" && swiperEnabled) {
          if (Math.abs(gestureState.dx) > cardWidth * 0.35) {
            if (isSwiped.length < 2 && !isSwiped.includes(id)) {
              setIsSwiped(prevArray => {
                const newArray = [...new Set([...prevArray, id])];
                if (newArray.length > 2) {
                  newArray.splice(0, newArray.length - 2);
                }
                return newArray;
              });
            } else if (isSwiped.length === 2) {
              setIsSwiped([]);
            }
          } else {
            if (isSwiped.length < 2 && !isSwiped.includes(id)) {
              setIsSwiped(prevArray => {
                const newArray = [...new Set([...prevArray, id])];

                if (newArray.length > 2) {
                  newArray.splice(0, newArray.length - 2);
                }
                return newArray;
              });
            } else setIsSwiped([]);
          }
          if (isSwiped.includes(id))
            setIsSwiped(prevArray => prevArray.filter(item => item !== id));
        }
        Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start();
      },
    })
  ).current;

  const animatedCardStyle = {
    transform: [
      {
        translateX: pan.interpolate({
          inputRange: [-cardWidth, 0, cardWidth],
          outputRange: [-cardWidth, 0, cardWidth],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  function checkTimeStatus(timeRangeString) {
    const currentTime = new Date();
    const [startTime, endTime] = timeRangeString.split(" - ");

    const startDateTime = new Date();
    const endDateTime = new Date();

    setTimeFromDateObject(startDateTime, startTime);
    setTimeFromDateObject(endDateTime, endTime);

    if (currentTime >= startDateTime && currentTime <= endDateTime) {
      return "Running";
    } else if (currentTime < startDateTime) {
      return "Upcoming";
    } else return "Finished";
  }

  function setTimeFromDateObject(dateObject, timeString) {
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":");

    if (period.toLowerCase() === "pm" && hours !== "12") {
      dateObject.setHours(parseInt(hours) + 12);
    } else {
      dateObject.setHours(parseInt(hours));
    }

    dateObject.setMinutes(parseInt(minutes));
    dateObject.setSeconds(0);
    dateObject.setMilliseconds(0);
  }

  console.log(isSwiped.includes(id));
  return (
    <Animated.View
      style={[
        styles.container,
        isTeacher?.profile?.role === "teacher" &&
          swiperEnabled &&
          animatedCardStyle,
      ]}
      {...panResponder.panHandlers}
    >
      <View
        style={[
          styles.card,
          checkTimeStatus(data.class_time) === "Running" && styles.disabledCard,
          isSwiped.includes(id) && styles.disabledContainer,
        ]}
      >
        <View style={styles.headingText}>
          <Image
            style={styles.imageThumbnail}
            source={require("../../assets/png/profile.png")}
          />
          <View style={{ marginStart: 10 }}>
            {/* < */}

            <Text style={styles.cardText}>Subject:</Text>
            <View
              style={{
                ...styles.cardText,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "space-between",
                gap: 10,
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={styles.cardRoom}>{data.class_description} </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={{ color: globalVar.primaryColor, ...styles.cardRoom }}
                >
                  Status:
                </Text>
                <Text style={{ ...styles.cardRoom }}>
                  {checkTimeStatus(data.class_time)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.rightText}></View>

        <View style={styles.bottomText}>
          <Text style={styles.cardText}>Day</Text>
          <Text style={styles.cardText}>{data.day}</Text>
        </View>
        <View style={styles.bottomText}>
          <Text style={styles.cardText}>Time</Text>

          <View style={styles.flexerRow}>
            <Text style={styles.cardText}>{data.class_time}</Text>
          </View>
        </View>

        <View style={styles.bottomText}>
          <Text style={styles.cardText}>Batch</Text>
          <Text style={styles.cardText}>
            {data.batch_semester} ({data.group})
          </Text>
        </View>

        <Text style={styles.cardRoom}>
          <Text style={{ color: globalVar.primaryColor }}>Room:</Text>{" "}
          {data.room}
        </Text>
      </View>
    </Animated.View>
  );
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: pan }] }]}
      {...panResponder.panHandlers}
    >
      <Text>{data.title}</Text>
      {isSwiped && <Text>Swiped!</Text>}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  flexerRow: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
    backgroundColor: "#fff",
  },
  disabledContainer: {
    backgroundColor: "#9E9E9E",
  },
  headingText: {
    flexDirection: "row",
  },
  imageThumbnail: {
    width: 50,
    height: 50,
  },
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    marginBottom: 16,
  },
  disabledCard: {
    backgroundColor: "#ffc299",
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: globalVar.primaryColor,
  },
  cardText: {
    fontSize: 14,
  },
  cardRoom: {
    fontWeight: "bold",
    textAlign: "right",
    flexWrap: "wrap",
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
