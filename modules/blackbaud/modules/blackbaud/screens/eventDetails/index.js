import React, { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { eventDetails } from "../../store";
import backIcon from "../../assets/backIcon.png";
import { useIsFocused } from "@react-navigation/native";

const EventDetails = (props) => {
  const dispatch = useDispatch();

  const { navigation, route } = props;

  const { params } = route;

  const isFocused = useIsFocused();

  const loading = useSelector((state) => state.Events.eventDetailApi.loading);
  const token = useSelector((state) => state.Events.accessToken);
  const eventDetail = useSelector((state) => state.Events.eventDetails);

  useEffect(() => {
    if (isFocused) {
      dispatch(eventDetails({ id: params?.id, token: token }));
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonTouch}
        onPress={() => navigation.goBack()}
      >
        <Image source={backIcon} style={styles.backIconStyles} />
      </TouchableOpacity>

      {loading === "pending"
        ? (
        <ActivityIndicator color={"#000"} size={"large"} />
          )
        : (
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

          <TouchableOpacity
            style={styles.listButton}
            onPress={() =>
              navigation.navigate("AttendeeList", { id: params?.id })
            }
          >
            <Text style={styles.textColor}>Attendee list</Text>
          </TouchableOpacity>
        </View>
          )}
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: "#7C7C7C",
    marginTop: 5,
    width: 341
  },
  backIconStyles: {
    height: 20,
    width: 11
  },
  backButtonTouch: {
    marginLeft: 20,
    marginVertical: 20,
    width: 20
  },
  textColor: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  listButton: {
    backgroundColor: "#000000",
    width: 330,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 35
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
    // justifyContent: "center"
  },
  mainCard: {
    backgroundColor: "#fff",
    marginBottom: 100,
    width: "100%"
  }
});

export default EventDetails;
