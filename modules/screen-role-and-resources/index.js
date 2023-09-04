import React from "react";
import { SafeAreaView, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const RoleAndResources = () => {
  const equipments = [{
    titie: "Mobile",
    image: require("./assets/mobile.png")
  }, {
    titie: "Dell Laptop",
    image: require("./assets/dellLaptop.png")
  }, {
    titie: "Surface Notebook",
    image: require("./assets/surfaceNotebook.png")
  }];

  const eLearningResources = [{
    titie: "Platform Overview",
    description: "Discover the full potential of our platform in this quick overview."
  }, {
    titie: "Platform Overview",
    description: "Meet our CEO in a short video, as he shares the company goals and values."
  }, {
    titie: "Platform Overview",
    description: "Get to know our company security and compliance processes for a safe working experience."
  }];

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
      <View style={[styles.container, styles.lightBackground]}>
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
        <View>
          <View style={styles.selectRoleInputWrapper}>
            <Text style={styles.selectInput}>Select Role</Text>
            <TextInput placeholder="Select role" style={styles.selectRoleInput} />
          </View>
        </View>
        <View style={{ marginTop: 50 }}>
          <Text style={styles.selectEquipment}>Select equipment</Text>
          <View style={styles.selectEquipmentContainer}>
            {equipments.map((equipment, index) => (
              <View key={index} style={styles.equipment}>
                <Image resizeMode="contain" style={styles.equipmentImage} source={equipment.image} />
                <Text style={styles.equipmentTitie}>{equipment.titie}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ marginTop: 50 }}>
          <Text style={styles.selectELearning}>Select e-learning resources</Text>
          <View style={{ marginTop: 20 }}>
            {eLearningResources.map((eLearningResource, index) => (
              <View key={index} style={styles.eLearningResourceContainer}>
                <Text style={styles.eLearningResourceTitie}>{eLearningResource.titie}</Text>
                <Text style={styles.eLearningResourceDescription}>{eLearningResource.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
    <View style={{ backgroundColor: "#9765f7", width: "25%" }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center"
          }}
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
  scrollviewContainer: {
    padding: 10,
    width: "70%",
    height: "100%",
    backgroundColor: "#F0EFFF"
  },
  sideBarView: {
    backgroundColor: "#fff",
    width: "10%"
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
  sideBarIcons: {
    alignSelf: "center",
    marginTop: 40
  },
  sideBarIconLabel: {
    alignSelf: "center",
    fontWeight: "500",
    color: "#adb5bd",
    marginTop: 10,
    fontSize: 14
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
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff"
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
    fontWeight: "bold"
  },
  onBoardHeadingLeft: {
    backgroundColor: "#9765F7",
    padding: 10,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#ffffff",
    justifyContent: "center",
    borderRadius: 60 / 2,
    marginRight: 20
  },
  jobRoleWrapper: {
    flexDirection: "row",
    marginRight: 30
  },
  onBoardHeadingLeftText: {
    color: "#ffffff",
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
  justifyContentCenter: {
    justifyContent: "center"
  },
  selectRoleInputWrapper: {
    width: "40%"
  },
  selectInput: {
    fontSize: 16,
    marginBottom: 10
  },
  selectRoleInput: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 20
  },
  selectEquipment: {
    fontSize: 22,
    color: "#384671",
    fontWeight: "700"
  },
  selectEquipmentContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  equipment: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    padding: 20,
    width: "47%",
    minHeight: 200,
    display: "flex",
    flexDirection: "row"
  },
  equipmentImage: {
    width: 120,
    height: 120
  },
  equipmentTitie: {
    fontSize: 22,
    color: "#384671",
    fontWeight: "700",
    marginLeft: 10
  },
  selectELearning: {
    fontSize: 22,
    color: "#384671",
    fontWeight: "700"
  },
  eLearningResourceContainer: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    padding: 20,
    minHeight: 200
  },
  eLearningResourceTitie: {
    fontSize: 22,
    color: "#384671",
    fontWeight: "700"
  },
  eLearningResourceDescription: {
    fontSize: 18,
    marginTop: 20
  }
});

export default RoleAndResources;
