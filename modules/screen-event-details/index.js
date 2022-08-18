import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable
} from "react-native";

const EventDetails = () => {
  const [event, setEvent] = useState({});
  useEffect(() => {
    setEvent({
      name: "Event name 2022",
      location: "New York, USA",
      distance: "10 miles away",
      date: "28 Sep",
      time: "11:00 AM",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam feugiat tellus a mattis ornare. Fusce sit amet libero id est iaculis hendrerit in quis nibh. \n \nProin porttitor velit nec purus consequat hendrerit. Aenean vel volutpat metus. Ut ullamcorper arcu tellus, non semper nisl lobortis vitae. Nulla sit amet risus risus. Vestibulum euismod accumsan nulla."
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={require("./assets/image.png")} style={styles.image} />
        <Image
          style={styles.scroller}
          source={require("./assets/Slider.png")}
        />
        <View style={styles.body}>
          <View style={styles.header}>
            <View style={styles.details}>
              <Text style={styles.name}>{event.name}</Text>
              <View style={styles.location}>
                <Image
                  source={require("./assets/locationIcon.png")}
                  style={styles.locationIcon}
                />
                <Text style={styles.locationText}>
                  {event.location} - {event.distance}
                </Text>
              </View>
            </View>
            <Pressable style={styles.roundButton}>
              <Image
                source={require("./assets/giftIcon.png")}
                style={styles.giftIcon}
              />
              <Text style={styles.btnText}>Donate</Text>
            </Pressable>
          </View>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeItem}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.icon}
                  source={require("./assets/calendarIcon.png")}
                />
              </View>
              <View>
                <Text style={styles.mainText}>{event.date}</Text>
                <Text style={styles.subText}>Date</Text>
              </View>
            </View>
            <View style={styles.dateTimeItem}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.icon}
                  source={require("./assets/clockIcon.png")}
                />
              </View>
              <View>
                <Text style={styles.mainText}>{event.time}</Text>
                <Text style={styles.subText}>Time</Text>
              </View>
            </View>
          </View>
          <Text style={styles.heading}>Event info</Text>
          <Text style={styles.description}>{event.info}</Text>
        </View>
        <View style={styles.button}>
          <Button buttonText={"Book Event"} />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  image: {
    width: "100%",
    height: 200
  },
  scroller: {
    width: 50,
    resizeMode: "contain",
    alignSelf: "center",
    height: 8,
    marginTop: 10
  },
  body: {
    paddingHorizontal: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  roundButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },
  giftIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  btnText: {
    color: "#fff",
    fontSize: 10
  },
  info: {
    flex: 1
  },
  name: {
    fontSize: 18,
    marginBottom: 5
  },
  location: {
    flexDirection: "row",
    alignItems: "center"
  },
  locationIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    marginRight: 5
  },
  locationText: {
    fontSize: 12
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  dateTimeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20
  },
  iconContainer: {
    width: 30,
    height: 30,
    backgroundColor: "#e1e1e1",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  mainText: {
    fontSize: 12,
    color: "#000"
  },
  subText: {
    fontSize: 12,
    color: "#aaa"
  },
  heading: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold"
  },
  description: {
    marginTop: 10,
    textAlign: "justify",
    lineHeight: 20,
    color: "#737373"
  },
  button: {
    marginTop: 50
  }
});

export default EventDetails;

const Button = params => {
  const backgroundColor = params.color ? params.color : "#000";
  const textColor = params.textColor ? params.textColor : "#fff";
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : backgroundColor,
    borderColor: params.outline ? backgroundColor : null,
    borderWidth: params.outline ? 1 : 0
  };
  const btnText = {
    color: params.outline ? "#000" : textColor
  };
  return (
    <View style={buttonStyles.btnContainer}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle, params.style]}
          onPress={params.onPress}>
          <Text style={[buttonStyles.btnText, btnText]}>
            {params.buttonText}
          </Text>
          <View style={styles.childrenContainer}>{params.children}</View>
        </Pressable>
      </View>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 40,
    justifyContent: "center",
    marginVertical: 20
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    width: "100%",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
