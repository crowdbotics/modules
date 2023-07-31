import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput
} from "react-native";

const Untitled16 = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.sideBarView}>
        <Image
          source={require("./assets/companyLogo.png")}
          style={styles.sideBarFirstIcon}
        />

        <View style={styles.sideBarIcons}>
          <Image
            source={require("./assets/dashboards.png")}
            style={styles.sideBarIconStyle}
          />
          <Text style={styles.sideBarIconLabel}>Dashboard</Text>
        </View>

        <View style={styles.sideBarIcons}>
          <Image
            source={require("./assets/user.png")}
            style={styles.sideBarIconStyle}
          />
          <Text style={styles.sideBarIconLabel}>Employees</Text>
        </View>

        <View style={styles.sideBarIcons}>
          <Image
            source={require("./assets/bullish.png")}
            style={styles.sideBarIconStyle}
          />
          <Text style={styles.sideBarIconLabel}>E-Learning</Text>
        </View>

        <View style={styles.sideBarIcons}>
          <Image
            source={require("./assets/bell-ring.png")}
            style={styles.sideBarIconStyle}
          />
          <Text style={styles.sideBarIconLabel}>Activities</Text>
        </View>

        <View style={styles.sideBarIcons}>
          <Image
            source={require("./assets/page.png")}
            style={styles.sideBarIconStyle}
          />
          <Text style={styles.sideBarIconLabel}>Candidates</Text>
        </View>

        <View style={[styles.sideBarIcons, { marginTop: 60 }]}>
          <Image
            source={require("./assets/crowdbotics.jpeg")}
            style={styles.userLogo}
          />
          <Text style={[styles.sideBarIconLabel, { color: "#9765f7" }]}>
            Crowdbotics
          </Text>
          <Image
            source={require("./assets/logout.png")}
            style={styles.logoutIcon}
          />
        </View>
      </View>
      <ScrollView style={styles.scrollviewContainer}>
        {/* <Text style={styles.title}>New onboarding</Text> */}
        <View style={styles.breadcrumbWrapper}>
          <Text>Dashboard </Text>
          <Text> &gt; </Text>
          <Text> New Onboarding</Text>
        </View>
        <View style={styles.headingWrapper}>
          <Text style={styles.onBoardHeadingRight}>New onboarding</Text>
          <View style={styles.jobRoleWrapper}>
            <View style={styles.onBoardHeadingLeft}>
              <Text style={styles.onBoardHeadingLeftText}>2</Text>
            </View>
            <View style={styles.justifyContentCenter}>
              <Text style={styles.stepText}>Step 02</Text>
              <Text style={styles.jobRoleText}>Job role and resources</Text>
            </View>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require("./assets/profile.png")}
            style={styles.profileImage}
          />
          <View style={styles.cameraIcon}>
            <Image
              source={require("./assets/camera.png")}
              style={{ height: 10, width: 15 }}
            />
          </View>
        </View>

        <View style={styles.inputView}>
          <View style={styles.inputColumn}>
            <Text>First Name</Text>
            <TextInput style={styles.textInputStyles} />
          </View>
          <View style={styles.inputColumn}>
            <Text>Last Name</Text>
            <TextInput style={styles.textInputStyles} />
          </View>
        </View>

        <View style={styles.inputView}>
          <View style={styles.inputColumn}>
            <Text>Email</Text>
            <TextInput style={styles.textInputStyles} />
          </View>
          <View style={styles.inputColumn}>
            <Text>Phone number </Text>
            <TextInput style={styles.textInputStyles} />
          </View>
        </View>

        <View style={styles.inputView}>
          <View style={styles.inputColumn}>
            <Text>Country</Text>
            <TextInput style={styles.textInputStyles} />
          </View>
          <View style={styles.inputColumn}>
            <Text>Manager</Text>
            <TextInput style={styles.textInputStyles} />
          </View>
        </View>

        <View style={styles.inputView}>
          <View style={styles.inputColumn}>
            <Text>Office</Text>
            <TextInput style={styles.textInputStyles} />
          </View>
          <View style={styles.inputColumn}>
            <Text>Team</Text>
            <TextInput style={styles.textInputStyles} />
          </View>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.touchableStyle}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>
              Job role and resources
            </Text>
            <Image
              source={require("./assets/rightArrow.png")}
              style={styles.arrowImage}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.rightBar}>
        <View
          style={styles.rightBarFirstContainer}
        >
          <Image
            source={require("./assets/rocket.png")}
            style={{ width: 100, height: 120 }}
          />

          <View>
            <Text style={styles.rightBarFirstText}>Start</Text>
            <Text style={styles.rightBarSecondText}>a new journey</Text>
            <Text style={styles.rightBarThirdText}>at Engage Dynamics</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: "row"
  },
  rightBarFirstContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center"
  },
  rightBar: {
    backgroundColor: "#9765f7",
    width: "25%"
  },
  breadcrumbWrapper: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 20
  },
  lightBackground: {
    backgroundColor: "#EFEFFF"
  },
  headingWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20
  },
  onBoardHeadingRight: {
    fontSize: 30,
    color: "#272B30",
    fontWeight: "600"
  },
  onBoardHeadingLeft: {
    backgroundColor: "#9765F7",
    padding: 10,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    borderRadius: 60 / 2,
    marginRight: 20
  },
  jobRoleWrapper: {
    flexDirection: "row",
    marginRight: 30
  },
  onBoardHeadingLeftText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center"
  },
  stepText: {
    color: "#9765F7"
  },
  jobRoleText: {
    color: "black"
  },
  logoutIcon: {
    height: 20,
    width: 20,
    alignSelf: "center",
    marginTop: 10
  },
  userLogo: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignSelf: "center"
  },
  sideBarFirstIcon: {
    height: 130,
    width: 70,
    marginTop: 15,
    alignSelf: "center"
  },
  sideBarIconStyle: {
    height: 30,
    width: 30,
    alignSelf: "center"
  },
  rightBarThirdText: {
    fontSize: 18,
    marginRight: 20
  },
  rightBarFirstText: {
    fontSize: 18,
    textAlign: "right",
    marginRight: 20
  },
  rightBarSecondText: {
    fontSize: 18,
    textAlign: "right",
    fontWeight: "700",
    marginRight: 20
  },
  sideBarView: {
    backgroundColor: "#fff",
    width: "10%"
  },
  scrollviewContainer: {
    padding: 10,
    width: "70%",
    height: "100%",
    // alignSelf: "center",
    backgroundColor: "#f0efff"
  },
  inputColumn: {
    width: "48%"
  },
  sideBarIconLabel: {
    alignSelf: "center",
    fontWeight: "500",
    color: "#adb5bd",
    marginTop: 10,
    fontSize: 14
  },
  sideBarIcons: {
    alignSelf: "center",
    marginTop: 40
  },
  arrowImage: {
    height: 7,
    width: 20,
    marginLeft: 10
  },
  touchableStyle: {
    width: 220,
    backgroundColor: "#9765f7",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  buttonView: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 30,
    marginHorizontal: 20
  },
  textInputStyles: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 5,
    marginTop: 5
  },
  inputView: {
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: "space-between"
  },
  cameraIcon: {
    position: "absolute",
    marginTop: 80,
    height: 30,
    width: 30,
    backgroundColor: "#9765f8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
    marginTop: 10
  },
  profileContainer: {
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    width: 100,
    height: 100,
    borderRadius: 60,
    // justifyContent: "center",
    alignSelf: "center"
  },
  profileImage: {
    width: 60,
    marginTop: 20,
    height: 60
    // borderRadius: 50
  },
  inputContainer: {
    marginTop: 20
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    fontWeight: "bold"
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10
  }
});
export default Untitled16;
