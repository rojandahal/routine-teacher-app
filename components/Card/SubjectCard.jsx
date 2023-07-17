import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalVar } from "../../styles/global";

export default function SubjectCard({ data, id, handlePress }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.headingText}>
          <Image
            style={styles.imageThumbnail}
            source={require("../../assets/png/profile.png")}
          />
          <View style={{ marginStart: 10 }}>
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
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.rightText}></View>

      <View style={styles.bottomText}>
        <Text style={styles.cardText}>Time</Text>

        <View style={styles.flexerRow}>
          <Text style={styles.cardText}>{data.class_time}</Text>
        </View>
      </View>

      <Text style={styles.cardRoom}>
        <Text style={{ color: globalVar.primaryColor }}>Room:</Text> {data.room}
      </Text>
    </View>
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
