import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { eventDetails } from "../../modules/blackbaud/store";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const EventDetails = props => {
  const dispatch = useDispatch();
  const { navigation, route } = props;
  const { params } = route;
  const isFocused = useIsFocused();
  const loading = useSelector(state => state.Events.eventDetails.api.loading);
  const token = useSelector(state => state.Events.accessToken);
  const { entities: eventDetail } = useSelector(
    state => state.Events.eventDetails
  );
  useEffect(() => {
    if (isFocused) {
      dispatch(
        eventDetails({
          id: params?.id,
          token: token
        })
      );
    }
  }, [isFocused]);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Event Details</Text>
      {loading === "pending" && (
        <View style={styles.loaderView}>
          <ActivityIndicator color={"#000"} size={"large"} />
        </View>
      )}

      {
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

          <View style={styles.VpSsivdK}>
            <Pressable
              style={styles.lightLoginButton}
              onPress={() =>
                navigation.navigate("blackbaudAttendeeList", {
                  id: params?.id
                })
              }
            >
              <Text style={styles.lightTextColor}>Attendee list</Text>
            </Pressable>
            <Pressable
              style={styles.darkLoginButton}
              onPress={() => navigation.navigate("blackbaudAttendeeForm", {
                eventId: params?.id
              })}
            >
              <Text style={styles.darkTextColor}>Add Attendee</Text>
            </Pressable>
          </View>
        </View>
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: "#7C7C7C",
    marginTop: 5,
    width: 341
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10
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
  listButton: {
    backgroundColor: "#0974a1",
    width: 330,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 5,
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
    backgroundColor: "#fff",
    flex: 1
  },
  mainCard: {
    backgroundColor: "#E5E5E5",
    marginBottom: 100,
    marginHorizontal: 20,
    borderRadius: 5
  },
  loaderView: {
    justifyContent: "center"
  },
  VpSsivdK: {
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
