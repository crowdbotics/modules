import React, { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { attendeeList } from "../../store";
import userIcon from "../../assets/userIcon.png";
import backIcon from "../../assets/backIcon.png";

const AttendeeList = (props) => {
  const dispatch = useDispatch();

  const { route, navigation } = props;

  const { params } = route;

  const loading = useSelector((state) => state.Events.attendeeListApi.loading);
  const token = useSelector((state) => state.Events.accessToken);
  const attendees = useSelector((state) => state.Events.attendeeList);

  useEffect(() => {
    dispatch(attendeeList({ id: params?.id, token: token }));
  }, []);

  return (
    <View style={styles.container}>
      {loading === "pending"
        ? (
        <ActivityIndicator color={"#000"} size={"large"} />
          )
        : (
        <ScrollView style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={styles.backButtonTouch}
            onPress={() => navigation.goBack()}
          >
            <Image source={backIcon} style={styles.backIconStyles} />
          </TouchableOpacity>
          {attendees.length !== 0
            ? (
                attendees.map((item, index) => (
              <View style={styles.userCard} key={index}>
                <Image source={userIcon} style={styles.imageStyles} />

                <View style={styles.contentView}>
                  <Text style={styles.nameText}>{item.name}</Text>

                  <Text style={styles.emailText}>{item.email}</Text>

                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      style={[styles.buttonStyles, { width: 60 }]}
                    >
                      <Text style={styles.buttonText}>Attended</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.buttonStyles, { width: 80 }]}
                    >
                      <Text style={styles.buttonText}>Not-Attended</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
                ))
              )
            : (
            <View style={styles.centeredView}>
              <Text>No record found.</Text>
            </View>
              )}
        </ScrollView>
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
  contentView: {
    marginVertical: 19
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center"
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
  buttonView: {
    flexDirection: "row",
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center"
  },
  buttonStyles: {
    height: 30,
    borderRadius: 12,
    backgroundColor: "#12D790",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5
  },
  nameText: {
    color: "#1E2022",
    fontWeight: "600"
  },
  emailText: {
    color: "#23AAFA",
    fontSize: 12,
    marginTop: 5
  },
  imageStyles: {
    height: 86,
    width: 86,
    borderRadius: 14,
    marginVertical: 19,
    marginLeft: 19,
    marginRight: 10
  },
  userCard: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 10,
    height: 124,
    marginHorizontal: 14,
    marginVertical: 15,
    flexDirection: "row"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ECECEC"
  }
});

export default AttendeeList;
