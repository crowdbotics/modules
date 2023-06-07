import React from "react";
import { Text, StyleSheet, View } from "react-native";

const WaitingListMessage = (params) => {
  return (

      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Notification</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.head}>
            <Text style={styles.heading}>Hi User,</Text>
            <Text>Thank you for your order</Text>
          </View>

          <View style={styles.main}>
            <Text>Below you will see your position in the queue:</Text>
            <View style={styles.position}>
              <View style={styles.innerPosition}>
                <Text style={styles.positionText}>3</Text>
              </View>
            </View>
            <View style={styles.swipe}>
              <View style={styles.ball1}></View>
              <View style={styles.ball}></View>
              <View style={styles.ball}></View>
            </View>
          </View>
          <View style={styles.footer}>
            <Text>You will receive text or email when we’re ready to accept your order</Text>
          </View>

        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  body: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    height: "30%",
    backgroundColor: "#DADADA",
    paddingTop: 20
  },
  head: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold"
  },
  main: {
    marginVertical: "10%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  position: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "#12D790",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  innerPosition: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  positionText: {
    fontSize: 80,
    fontWeight: "bold"
  },
  swipe: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 30
  },
  ball1: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#000"
  },
  ball: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#C4C4C4"
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "20%"
  }

});

export default WaitingListMessage;
