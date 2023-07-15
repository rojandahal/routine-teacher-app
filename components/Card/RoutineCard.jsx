import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import moment from "moment";
import { useRecoilValue } from "recoil";
import profileState from "../../recoil/ProfileState";
import { globalVar } from "../../styles/global";


export default function RoutineCard({ data }) {
  // const currentTime = moment();
  // const endingTime = moment(data.endingTime, "ha");
  // const isCompleted = endingTime.isBefore(currentTime);
  const isCompleted = false;

  console.log(data.class_time.split('-')?.[0])

  function checkTimeStatus(timeRangeString) {
    const currentTime = new Date();
    currentTime.setHours(8);
    currentTime.setMinutes(32);
    currentTime.setSeconds(0);
    currentTime.setMilliseconds(0);
    const [startTime, endTime] = timeRangeString.split(' - ');
  
    const startDateTime = new Date();
    const endDateTime = new Date();
  
    setTimeFromDateObject(startDateTime, startTime);
    setTimeFromDateObject(endDateTime, endTime);
  
    if (currentTime >= startDateTime && currentTime <= endDateTime) {
      return 'Running';
    } else if (currentTime < startDateTime) {
      return 'Upcoming';
    }else return "Finished"
  }
  
  function setTimeFromDateObject(dateObject, timeString) {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
  
    if (period.toLowerCase() === 'pm' && hours !== '12') {
      dateObject.setHours(parseInt(hours) + 12);
    } else {
      dateObject.setHours(parseInt(hours));
    }
  
    dateObject.setMinutes(parseInt(minutes));
    dateObject.setSeconds(0);
    dateObject.setMilliseconds(0);
  }
  


  return (
    <View style={[styles.container, isCompleted && styles.disabledContainer]}>
      <View style={[styles.card, checkTimeStatus(data.class_time) === 'Running' && styles.disabledCard]}>
        <View style={styles.headingText}>
          <Image
            style={styles.imageThumbnail}
            source={require("../../assets/png/profile.png")}
          />
          <View style={{ marginStart: 10 }}>
            {/* < */}
            
            <Text style={styles.cardText}>Subject:</Text>
            <View style={{...styles.cardText, display: 'flex', flexDirection:'row',justifyContent: 'flex-end', alignItems: 'space-between', gap: 10}}>
              <View style={{display: 'flex', flexDirection: 'row'}} >
              < Text style={styles.cardRoom}>{data.class_description} </Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}} >
                <Text style={{color: globalVar.primaryColor, ...styles.cardRoom}} >Status:</Text >
                <Text style={{ ...styles.cardRoom}} >{checkTimeStatus(data.class_time)}</Text>
              </View>
            </View>
            
          </View>
        </View>
        <View style={styles.rightText}>

        </View>
        
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
          <Text style={styles.cardText}>{data.batch_semester} ({data.group})</Text>
        </View>

        <Text style={styles.cardRoom}><Text style={{color: globalVar.primaryColor}} >Room:</Text> {data.room}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexerRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
    backgroundColor: "#fff",
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
