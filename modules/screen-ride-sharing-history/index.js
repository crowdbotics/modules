import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";

const RideSharingHistory = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([
      {
        id: 1,
        date: "12 Jan 2022",
        pickUp: "S Main St, Los Angeles",
        dropOff: "Maple Ave, Los Angeles",
        bill: 43,
        type: "Luxury Car",
        driver: "Cauffina Carr"
      },
      {
        id: 2,
        date: "10 Jan 2022",
        pickUp: "S Main St, Los Angeles",
        dropOff: "Maple Ave, Los Angeles",
        bill: 32,
        type: "Standard Car",
        driver: "Thomas R. Toe"
      },
      {
        id: 3,
        date: "08 Jan 2022",
        pickUp: "S Main St, Los Angeles",
        dropOff: "Maple Ave, Los Angeles",
        bill: 56,
        type: "SUV Car",
        driver: "Cauffina Anthropy"
      },
      {
        id: 4,
        date: "12 Jan 2022",
        pickUp: "S Main St, Los Angeles",
        dropOff: "Maple Ave, Los Angeles",
        bill: 43,
        type: "Luxury Car",
        driver: "Cauffina Anthropy"
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.rideContainer}>
            <View style={styles.rideHeader}>
              <Text>{item.date}</Text>
            </View>
            <View style={styles.rideBody}>
              <Image
                source={require("./assets/Progress.png")}
                style={styles.progressImage}
              />
              <View style={styles.locationContainer}>
                <View>
                  <Text style={styles.mainText}>{item.pickUp}</Text>
                  <Text style={styles.subText}>Pick Up Location</Text>
                </View>
                <View>
                  <Text style={styles.mainText}>{item.dropOff}</Text>
                  <Text style={styles.subText}>Drop Off Location</Text>
                </View>
              </View>
            </View>
            <View style={styles.rideFooter}>
              <View>
                <Text style={styles.mainText}>{item.driver}</Text>
                <Text style={styles.subText}>{item.type}</Text>
              </View>
              <Text style={styles.billText}>
                ${item.bill && item.bill.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  rideContainer: {
    paddingHorizontal: 20,
    marginBottom: 20
  },
  rideHeader: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  rideBody: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  progressImage: {
    width: 30,
    height: 90,
    resizeMode: "contain"
  },
  locationContainer: {
    justifyContent: "space-between",
    marginLeft: 10
  },
  mainText: {
    fontSize: 14,
    color: "#313633"
  },
  subText: {
    fontSize: 14,
    color: "#7C7C7C"
  },
  rideFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center"
  },
  billText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold"
  }
});

export default RideSharingHistory;
