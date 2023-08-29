import React from "react";
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableHighlight } from "react-native";

const EventsAdvancedScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require("./assets/back.png")} style={styles.back} />
          <Text style={styles.heading}>Events</Text>
          <View style={styles.IconContainer}>
            <Image source={require("./assets/star.png")} style={styles.star} />
            <Image source={require("./assets/settings.png")} style={styles.settings} />
          </View>
        </View>
        <View style={styles.emailContainer}>
          <Text style={styles.mr10}>Search</Text>
          <Input placeholder="Enter" />
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.subHeading}>List of events</Text>

          <View style={styles.cardWrapper}>
            <View style={styles.walletCard}>
              <View style={styles.walletInner}>
                <View style={styles.imgContainer}>
                  <Image
                    source={require(
                      "./assets/edit.png")}
                    style={styles.image}
                  />
                </View>
                <View style={styles.walletCarder}>
                  <Text style={styles.eventName}>Title of event</Text>
                  <Text style={styles.eventType}>06.12.2022</Text>
                  <Text style={styles.attending}>12:45 PM</Text>
                </View>
              </View>
              <View style={styles.leftSection}>
                <Text style={styles.date}>+21</Text>
                <Text style={styles.time}>Age group</Text>
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>Description</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa faucibus nisi egestas
                quis etiam nec feugiat. Scelerisque pellentesque at in accumsan cras tristique at id. At
                nullam lectus sapien nulla. At egestas cursus elit, tortor mattis gravida ornare proin
                ipsum. Duis purus turpis libero tristique dignissim.
              </Text>
            </View>
          </View>
          <View style={styles.cardWrapper}>
            <View style={styles.walletCard}>
              <View style={styles.walletInner}>
                <View style={styles.imgContainer}>
                  <Image source={require("./assets/edit.png")} style={styles.image} />
                </View>
                <View style={styles.walletCarder}>
                  <Text style={styles.eventName}>Title of event</Text>
                  <Text style={styles.eventType}>06.12.2022</Text>
                  <Text style={styles.attending}>12:45 PM</Text>
                </View>
              </View>
              <View style={styles.leftSection}>
                <Text style={styles.date}>14-24</Text>
                <Text style={styles.time}>Age group</Text>
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>Description</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa faucibus nisi egestas
                quis etiam nec feugiat. Scelerisque pellentesque at in accumsan cras tristique at id. At
                nullam lectus sapien nulla. At egestas cursus elit, tortor mattis gravida ornare proin
                ipsum. Duis purus turpis libero tristique dignissim.
              </Text>
            </View>
          </View>
          <Button>Confirm</Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10
  },
  mainContainer: { width: "100%" },
  subHeading: { fontSize: 16, fontWeight: "bold", marginLeft: 30, marginVertical: 20 },
  walletCard: {
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10
  },
  cardWrapper: {
    backgroundColor: "#fff",
    elevation: 15,
    shadowColor: "#ccc9c9",
    marginBottom: 20,
    paddingBottom: 15,
    borderRadius: 8
  },
  walletInner: {
    display: "flex",
    flexDirection: "row"
  },
  walletCarder: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column"
  },
  eventName: {
    color: "#000",
    fontSize: 14,
    marginLeft: 10,
    width: 115
  },
  eventType: {
    color: "#000",
    fontSize: 12,
    marginLeft: 10,
    width: 115,
    marginVertical: 5
  },
  date: { fontSize: 38, color: "#000" },
  time: { fontSize: 12, color: "#000", marginTop: -5 },
  attending: { color: "#dadada", fontSize: 14, marginLeft: 10, width: 115 },
  imgContainer: {
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: 10
  },
  image: { resizeMode: "contain" },
  leftSection: { justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 40
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -20 },
  heading: { fontSize: 16, color: "#000", marginLeft: 20 },
  star: { width: 20, height: 20, resizeMode: "contain" },
  settings: { width: 20, height: 19.4, resizeMode: "contain" },
  IconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 55,
    marginRight: -20
  },
  emailContainer: {
    marginBottom: 10
  },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  descriptionContainer: { paddingHorizontal: 20 },
  descriptionText: { marginVertical: 10, marginHorizontal: 20 },
  description: { fontSize: 12, textAlign: "justify" }
});

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor="#000"
        editable={props.editable !== false}
      />
      {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const textStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 53,
    borderColor: "#C4C4C4",
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
            height: props.height ? props.height : 49,
            borderWidth: props.borderWidth ? props.borderWidth : 0,
            borderColor: props.borderColor ? props.borderColor : "#000000"
          }
        ]}
      >
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>
          {props.children}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});

export default EventsAdvancedScreen;
