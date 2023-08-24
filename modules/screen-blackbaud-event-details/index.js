import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const EventDetails = props => {
  const {
    navigation,
    route
  } = props;
  const {
    params
  } = route;

  const eventDetail = {
    id: 1,
    start_date: "2023-02-22",
    start_time: "15:55",
    name: "Test",
    description: "Test description",
    date_added: "2023-02-22",
    lookup_id: "112233"
  };
  return <View style={styles.container}>
    <View style={styles.mainCard}>
      <View style={styles.contentView}>
        <Text style={styles.heading}>Event time</Text>

        <Text style={styles.textStyle}>
          {eventDetail?.start_date}, {eventDetail?.start_time}
        </Text>
      </View>

      <View style={styles.contentView}>
        <Text style={styles.heading}>Event name</Text>

        <Text style={styles.textStyle}>{eventDetail?.name}</Text>
      </View>

      <View style={styles.contentView}>
        <Text style={styles.heading}>Event description</Text>

        <Text style={styles.textStyle}>{eventDetail?.description}</Text>
      </View>

      <View style={styles.contentView}>
        <Text style={styles.heading}>Date added</Text>

        <Text style={styles.textStyle}>{eventDetail?.date_added}</Text>
      </View>

      <View style={styles.contentView}>
        <Text style={styles.heading}>Look-up Id</Text>

        <Text style={styles.textStyle}>{eventDetail?.lookup_id}</Text>
      </View>

      <View style={styles.actionContainer}>
        <Pressable style={styles.lightLoginButton} onPress={() => navigation.navigate("AttendeeList", {
          id: params?.id
        })}>
          <Text style={styles.lightTextColor}>
            Attendee list
          </Text>
        </Pressable>
        <Pressable style={styles.darkLoginButton} onPress={() => navigation.navigate("AttendeeForm")}>
          <Text style={styles.darkTextColor}>
            Add Attendee
          </Text>
        </Pressable>
      </View>
    </View>
  </View>;
};

const styles = StyleSheet.create({
  textStyle: {
    color: "#7C7C7C",
    marginTop: 5,
    width: 341
  },
  contentView: {
    marginLeft: 30,
    marginTop: 20
  },
  heading: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 15
  },
  container: {
    backgroundColor: "#E5E5E5",
    flex: 1
  },
  mainCard: {
    backgroundColor: "#fff",
    marginBottom: 100,
    width: "100%"
  },
  actionContainer: {
    marginTop: 35
  },
  lightLoginButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 25,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#aeafb1",
    width: "80%",
    height: 50
  },
  lightTextColor: {
    fontWeight: "500",
    color: "#212327",
    fontSize: 16
  },
  darkLoginButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 25,
    paddingHorizontal: 12,
    backgroundColor: "#075a7c",
    width: "80%",
    height: 50
  },
  darkTextColor: {
    fontWeight: "500",
    color: "#fff",
    fontSize: 16
  }
});
export default EventDetails;
