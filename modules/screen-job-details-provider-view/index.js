import React from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";

const JobDetailsProviderViewScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require("./assets/back.png")} style={styles.back} />
          <Text style={styles.heading}>Job details</Text>
          <View style={styles.messageContainer}>
            <Image
              source={require("./assets/pen.png")}
              style={styles.message}
            />
            <Image
              source={require("./assets/message.png")}
              style={styles.message}
            />
          </View>
        </View>
        <View style={styles.tabView}>
          <View style={[styles.tabItem, styles.selectedTab]}>
            <Text style={styles.tabText}>Details</Text>
          </View>
          <View style={styles.tabItem}>
            <Text style={styles.tabText}>Active Jobs</Text>
          </View>
          <View style={styles.tabItem}>
            <Text style={styles.tabText}>Completed Jobs</Text>
          </View>
        </View>
        <Text style={styles.mr10}>Job title</Text>
        <View style={styles.chooseContainer}>
          <Text>Job title</Text>
        </View>
        <Text style={styles.mr10}>Department</Text>
        <View style={styles.chooseContainer}>
          <Text>Department</Text>
        </View>
        <Text style={styles.mr10}>Job requirements</Text>
        <View style={styles.tags}>
          <Text style={styles.tagText}>Tag</Text>
          <Text style={styles.tagText}>Tag</Text>
          <Text style={styles.tagText}>Tag</Text>
          <Text style={styles.tagText}>Tag</Text>
          <Text style={styles.tagText}>Tag</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>Job description</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
            faucibus nisi egestas quis etiam nec feugiat. Scelerisque
            pellentesque at in accumsan cras tristique at id. At nullam lectus
            sapien nulla. At egestas cursus elit, tortor mattis gravida ornare
            proin ipsum. Duis purus turpis libero tristique dignissim.
          </Text>
        </View>
        <Text style={styles.mr10}>Number of Hours</Text>
        <View
          style={[
            styles.chooseContainer,
            { justifyContent: "center", marginBottom: 0 }
          ]}
        >
          <Text>8</Text>
        </View>
        <View style={styles.bidContainer}>
          <Text style={styles.bidText}>Mon-Fri</Text>
        </View>
        <Text style={styles.mr10}>Starting date</Text>
        <View style={styles.chooseContainer}>
          <Text>01/06/2022</Text>
        </View>
        <Text style={styles.mr10}>Salary</Text>
        <View style={styles.sliderContainer}>
          <Image
            source={require("./assets/slider.png")}
            style={styles.sliderImg}
          />
        </View>
        <View style={styles.sliderTextContainer}>
          <Text style={styles.sliderText}>$40k</Text>
          <Text style={[styles.sliderText, { marginLeft: 170 }]}>$80k</Text>
        </View>
        <Text style={styles.mr10}>Bonus, Incentives</Text>
        <View style={styles.chooseContainer}>
          <Text>10k</Text>
        </View>
        <Text style={styles.mr10}>Candidates</Text>
        <View style={styles.chooseContainer}>
          <Text>List of interested candidates</Text>
          <Image source={require("./assets/down.png")} style={styles.downImg} />
        </View>

        <View style={styles.walletCard}>
          <View style={styles.walletInner}>
            <View style={[styles.imgContainer, { backgroundColor: "#F9D8D9" }]}>
              <Image
                source={require("./assets/edit.png")}
                style={styles.image}
              />
            </View>

            <View style={styles.walletCarder}>
              <Text style={styles.eventName}>Full name</Text>
              <Text style={styles.eventType}>Title</Text>
              <Text style={styles.attending}>Under Review</Text>
            </View>
          </View>
          <View style={styles.leftSection}>
            <Text style={styles.view}>Accept</Text>
            <Text style={styles.reject}>Reject</Text>
          </View>
        </View>

        <View style={styles.walletCard}>
          <View style={styles.walletInner}>
            <View style={[styles.imgContainer, { backgroundColor: "#FCF1D6" }]}>
              <Image
                source={require("./assets/edit.png")}
                style={styles.image}
              />
            </View>

            <View style={styles.walletCarder}>
              <Text style={styles.eventName}>Full name</Text>
              <Text style={styles.eventType}>Title</Text>
              <Text style={styles.attending}>Interested</Text>
            </View>
          </View>
          <View style={styles.leftSection}>
            <Text style={styles.view}>Accept</Text>
            <Text style={styles.reject}>Reject</Text>
          </View>
        </View>

        <View style={styles.walletCard}>
          <View style={styles.walletInner}>
            <View style={styles.imgContainer}>
              <Image
                source={require("./assets/edit.png")}
                style={styles.image}
              />
            </View>

            <View style={styles.walletCarder}>
              <Text style={styles.eventName}>Full name</Text>
              <Text style={styles.eventType}>Title</Text>
              <Text style={styles.attending}>Hired</Text>
            </View>
          </View>
          <View style={styles.leftSection}>
            <Text style={styles.view}>Accept</Text>
            <Text style={styles.reject}>Reject</Text>
          </View>
        </View>

        <View style={styles.walletCard}>
          <View style={styles.walletInner}>
            <View style={styles.imgContainer}>
              <Image
                source={require("./assets/edit.png")}
                style={styles.image}
              />
            </View>

            <View style={styles.walletCarder}>
              <Text style={styles.eventName}>Full name</Text>
              <Text style={styles.eventType}>Title</Text>
              <Text style={styles.attending}>Accepted</Text>
            </View>
          </View>
          <View style={styles.leftSection}>
            <Text style={styles.view}>Accept</Text>
            <Text style={styles.reject}>Reject</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    paddingBottom: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 20
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  messageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 45
  },
  message: { width: 20, height: 20, resizeMode: "contain", marginRight: -10 },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  tags: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 15
  },
  tagText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F1F1F1",
    borderRadius: 10
  },
  chooseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    marginHorizontal: 5,
    marginBottom: 20
  },
  descriptionContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 15
  },
  descriptionText: { fontSize: 16, fontWeight: "400", marginLeft: 10 },
  description: { fontSize: 12, marginVertical: 10, fontWeight: "500" },
  sliderContainer: {
    marginHorizontal: 7,
    paddingHorizontal: 10
  },
  sliderImg: {
    width: 340,
    height: 15,
    resizeMode: "contain"
  },
  sliderTextContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10
  },
  sliderText: { color: "#77838F", marginLeft: 33, marginTop: 3 },
  tabView: {
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10
  },
  tabItem: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    fontWeight: "bold",
    flex: 1
  },
  tabText: { fontSize: 12 },
  selectedTab: {
    backgroundColor: "#FFF",
    shadowColor: "gray",
    elevation: 10
  },
  downImg: {
    width: 15,
    height: 10,
    resizeMode: "contain"
  },
  walletCard: {
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    borderRadius: 8,
    elevation: 15,
    shadowColor: "#ccc9c9"
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
    fontSize: 16,
    marginLeft: 10,
    width: 115
  },
  eventType: {
    color: "#000",
    fontSize: 14,
    marginLeft: 10,
    width: 115,
    marginVertical: 5
  },
  view: {
    fontSize: 11,
    color: "#fff",
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 8
  },
  reject: {
    fontSize: 11,
    color: "#000",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 0.5
  },
  attending: { color: "#505050", fontSize: 12, marginLeft: 10, width: 115 },
  imgContainer: {
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: 10
  },
  image: { resizeMode: "contain", height: 32, width: 32 },
  leftSection: { justifyContent: "center", alignItems: "center" },
  bidContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3
  },
  bidText: { fontSize: 12, color: "#939396" }
});

export default JobDetailsProviderViewScreen;
