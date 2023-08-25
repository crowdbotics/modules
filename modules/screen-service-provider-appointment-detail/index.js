import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  Dimensions
} from "react-native";
import React, { useState } from "react";

const Profile = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const [modalVisible, setModalVisible] = useState(false);
  const data = [
    {
      id: 1,
      title: "Electrocardiogram (ECG)",
      timing: "Sara Smith 09:00 am",
      image: require("./assets/heart.png")
    },
    {
      id: 2,
      title: "Nuclear cardiac stress test",
      timing: "Tara Thompson 10:00 am",
      image: require("./assets/heart.png")
    },
    {
      id: 3,
      title: "Magnetic resonance imaging",
      timing: "Loyd Smith 12:00 am",
      image: require("./assets/beat.png")
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.walletCard}>
            <View style={styles.walletInner}>
              <View style={styles.imgContainer}>
                <Image source={{ uri: "etrwet" }} style={styles.image} />
              </View>
              <View style={styles.walletCarder}>
                <Text style={styles.eventName}>Dr. Tara Simpsons</Text>
                <Text style={styles.experience}>Working Time</Text>
                <Text style={styles.eventType}>
                  Mon - Sat ( 09:30AM - 09:00PM)
                </Text>
              </View>
            </View>
            <View style={styles.leftSection}>
              <Image
                source={require("./assets/phone.png")}
                style={styles.phone}
              />
              <Image
                source={require("./assets/message.png")}
                style={styles.phone}
              />
            </View>
          </View>
          <View style={styles.scheduledContainer}>
            <Text style={styles.dateTitle}>Schedule/Available time</Text>
            <Text style={styles.subTitle}>View now</Text>
          </View>
        </View>
        <View style={styles.headingContainer}>
          <TabView tabTitles={["Appointments", "Biography"]} selected={0} />
          <Image
            source={require("./assets/notification.png")}
            style={styles.notification}
          />
        </View>

        {data.map((item, index) => (
          <View style={styles.mainCard} key={index}>
            <View style={styles.walletCard}>
              <View style={styles.walletInner}>
                <View style={styles.imgContainer2}>
                  <Image source={item.image} style={styles.image} />
                </View>
                <View style={styles.walletCarder}>
                  <Text style={styles.date}>{item.title}</Text>
                  <Text style={styles.eventName}>{item.timing}</Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonBottom}>
              <Button buttonText={"ACCEPTED"} backgroundColor={"#23AAFA"} />
              <Button
                buttonText={"DETAILS"}
                backgroundColor={"#FFF"}
                color={"#23AAFA"}
                borderColor={"#23AAFA"}
                borderWidth={1}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[styles.centeredView, { width: windowWidth }]}>
          <AppointmentDetails setModalVisible={setModalVisible} />
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10
  },
  headerContainer: { backgroundColor: "#fff" },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 30,
    paddingLeft: 10,
    marginVertical: 15
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#1E2022" },

  walletCard: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 5,
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
    color: "#1E2022",
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "bold"
  },
  eventType: {
    color: "#7C7C7C",
    fontSize: 12,
    marginLeft: 10,
    fontWeight: "bold"
  },
  experience: {
    color: "#354259",
    fontSize: 12,
    marginVertical: 5,
    marginLeft: 10,
    fontWeight: "bold"
  },
  attending: {
    color: "#ACAEAF",
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "bold"
  },
  imgContainer: {
    height: 80,
    width: 95,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: 10
  },
  imgContainer2: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 10
  },
  image: { resizeMode: "contain", height: 22, width: 24 },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  leftSection: {
    marginTop: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "17%"
  },

  subTitle: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#23AAFA",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14
  },
  phone: { height: 20, width: 20, resizeMode: "contain" },
  scheduledContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    marginBottom: 25,
    paddingRight: 10
  },
  dateTitle: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold"
  },
  time: {
    fontSize: 14,
    color: "#7C7C7C",
    fontWeight: "bold"
  },
  notification: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  mainCard: {
    elevation: 15,
    shadowColor: "#ccc9c9",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 12,
    marginBottom: 5
  },
  view: { fontSize: 30, color: "#000", fontWeight: "bold" },
  info: { marginHorizontal: 15, marginVertical: 5 },
  infoTitle: {},
  infoText: { fontSize: 12, color: "#7E7D7D" },
  rating: { color: "#000" },
  date: {
    fontSize: 14,
    marginLeft: 10,
    color: "#7E7D7D",
    marginBottom: 7
  },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 10,
    borderTopColor: "#F2F2F2",
    borderTopWidth: 1
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%"
  }
});

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} underlayColor="#DDDDDD">
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : "#000000",
            height: props.height ? props.height : 38,
            borderWidth: props.borderWidth ? props.borderWidth : 0,
            borderColor: props.borderColor ? props.borderColor : "#000000"
          }
        ]}
      >
        <Text
          style={[
            btnStyles.text,
            { color: props.color ? props.color : "#ffffff" }
          ]}
        >
          {props.buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 21,
    paddingHorizontal: "13%"
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});

const TabView = ({ tabTitles, selected }) => {
  return (
    <View style={tabViewStyles.paletteContainer}>
      {tabTitles.map((title, index) => (
        <View
          style={
            index === selected
              ? tabViewStyles.selected
              : tabViewStyles.unSelected
          }
          key={index}
        >
          <Text
            style={{
              color: index === selected ? "#000" : "#7C7C7C",
              fontSize: 12
            }}
          >
            {title}
          </Text>
        </View>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    width: "70%",
    height: 48,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10,
    marginHorizontal: 20
  },
  selected: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#23AAFA",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10
  }
});

const AppointmentDetails = ({ setModalVisible }) => {
  const profile = {
    age: "25",
    gender: "Male",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, faucibus aliquet hac proin in. Turpis iaculis nulla ultrices tincidunt. Velit leo facilisi feugiat eleifend. Viverra id pharetra quam egestas orci. Metus, ipsum libero, tempor, vel posuere. Aliquet lacus at sit nisl."
  };

  return (
    <View style={appointmentStyles.modalView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={appointmentStyles.headingContainer}>
          <Text style={appointmentStyles.title}>Patient name</Text>
          <Pressable onPress={() => setModalVisible(false)}>
            <Image
              source={require("./assets/close.png")}
              style={appointmentStyles.image}
            />
          </Pressable>
        </View>

        <View style={[appointmentStyles.mainContainer]}>
          <View style={[appointmentStyles.docContainer]}>
            <Text style={appointmentStyles.descr}>
              Nuclear cardiac stress test
            </Text>
            <Text style={appointmentStyles.titleText}>Tara Tomphson</Text>
          </View>
          <View style={appointmentStyles.inner}>
            <Image
              source={require("./assets/phone.png")}
              style={[appointmentStyles.check, { marginRight: 10 }]}
            />
            <Image
              source={require("./assets/message.png")}
              style={appointmentStyles.check}
            />
          </View>
        </View>
        <Text style={[appointmentStyles.title, { marginTop: 15 }]}>
          Date/time
        </Text>
        <View style={appointmentStyles.topWrapper}>
          <View style={appointmentStyles.topContainer}>
            <Image />
            <Text style={appointmentStyles.dateText}>June 2022</Text>
            <Image />
          </View>
          <View style={[appointmentStyles.inner, { marginVertical: 20 }]}>
            <View style={appointmentStyles.dateContainer}>
              <Text style={appointmentStyles.month}>Mon</Text>
              <Text>20</Text>
            </View>
            <View style={appointmentStyles.dateContainer}>
              <Text style={appointmentStyles.month}>Mon</Text>
              <Text>20</Text>
            </View>
            <View style={appointmentStyles.dateContainer}>
              <Text style={appointmentStyles.month}>Mon</Text>
              <Text>20</Text>
            </View>
            <View
              style={[
                appointmentStyles.dateContainer,
                { backgroundColor: "#12D790" }
              ]}
            >
              <Text style={[appointmentStyles.month, appointmentStyles.color]}>
                Mon
              </Text>
              <Text style={appointmentStyles.color}>20</Text>
            </View>
            <View style={appointmentStyles.dateContainer}>
              <Text style={appointmentStyles.month}>Mon</Text>
              <Text>20</Text>
            </View>
            <View style={appointmentStyles.dateContainer}>
              <Text style={appointmentStyles.month}>Mon</Text>
              <Text>20</Text>
            </View>
            <View style={appointmentStyles.dateContainer}>
              <Text style={appointmentStyles.month}>Mon</Text>
              <Text>20</Text>
            </View>
          </View>
        </View>

        <View style={[appointmentStyles.inner, { marginVertical: 10 }]}>
          <Text style={appointmentStyles.text}>09:00 am</Text>
          <Text style={appointmentStyles.text}>10:00 am</Text>
        </View>

        <View style={appointmentStyles.cardInfo}>
          <Text style={appointmentStyles.subHeading}>Profile details</Text>
          <View style={appointmentStyles.feeContainer}>
            <View>
              <Text style={[appointmentStyles.mr10]}>Age</Text>
              <View style={appointmentStyles.feeSection}>
                <TextInput
                  placeholder={profile.age}
                  placeholderTextColor={"#000"}
                  editable={false}
                />
              </View>
            </View>
            <View>
              <Text style={[appointmentStyles.mr10]}>Gender</Text>
              <View style={appointmentStyles.feeSection}>
                <TextInput
                  placeholder={profile.gender}
                  placeholderTextColor={"#000"}
                  editable={false}
                />
              </View>
            </View>
          </View>
          <Text style={appointmentStyles.mr10}>Notes</Text>
          <View style={appointmentStyles.textInput}>
            <Text style={appointmentStyles.notes}>{profile.notes}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const appointmentStyles = StyleSheet.create({
  modalView: {
    height: "95%",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    position: "absolute",
    bottom: 0
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#1E2022" },
  image: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  docContainer: {},
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FCF0EF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  check: {
    height: 19,
    width: 19,
    resizeMode: "contain"
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleText: {
    fontWeight: "bold",
    color: "#2D2D2D",
    marginBottom: 5
  },
  descr: {
    marginBottom: 5,
    fontSize: 12,
    color: "#828586"
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  dateText: {
    fontSize: 14,
    color: "#2D2D2D",
    fontWeight: "bold",
    marginHorizontal: 20
  },
  dateContainer: {
    backgroundColor: "#F4F8FA",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 10
  },
  month: {
    marginBottom: 5,
    fontSize: 12,
    color: "#828586"
  },
  topWrapper: { backgroundColor: "#fff", paddingHorizontal: 5, width: "100%" },
  color: { color: "#fff" },
  cardInfo: {
    backgroundColor: "#fff",
    marginBottom: 60
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 20,
    color: "#2D2D2D"
  },
  mr10: {
    marginLeft: 15,
    marginBottom: 10
  },
  InputBox: {
    paddingHorizontal: 10,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f7f7f7"
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    paddingHorizontal: 5,
    height: 140,
    backgroundColor: "#f7f7f7"
  },
  feeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  feeSection: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: 49,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: "33%",
    backgroundColor: "#f7f7f7"
  },
  text: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#12D790",
    paddingHorizontal: "13%",
    paddingVertical: "3%",
    borderRadius: 5
  },
  notes: { color: "#7C7C7C", padding: 10 }
});
