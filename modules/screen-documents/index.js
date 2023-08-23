import React from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";

const DocumentsScreen = (params) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require(

          "./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Documents</Text>
        <Text />
      </View>
      <Text style={styles.subHeading}>List of documents</Text>
      <View style={styles.tabView}>
        <View style={[styles.tabItem, styles.selectedTab]}>
          <Text style={styles.tabText}>Signed</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={[styles.tabText, { color: "#7C7C7C" }]}>To be Signed</Text>
        </View>
      </View>

      <View style={styles.cardWrapper}>
        <View style={styles.walletCard}>
        <View style={[styles.leftSection, styles.flexItem]}>
            <Text style={styles.text}>Document ID</Text>
            <Text style={styles.text}>Document Title</Text>
            <Text style={styles.text}>Date signed</Text>
            <Text style={styles.text}>Download</Text>
          </View>
          <View style={styles.leftSection}>
            <Text style={styles.text}>#334343453</Text>
            <Text style={styles.text}>Title of the document</Text>
            <Text style={styles.text}>23/06/2022</Text>
            <Image source={require(

              "./assets/upload.png")} style={styles.downloadImg} />
          </View>
        </View>
      </View>
      <View style={styles.cardWrapper}>
        <View style={styles.walletCard}>
        <View style={[styles.leftSection, styles.flexItem]}>
            <Text style={styles.text}>Document ID</Text>
            <Text style={styles.text}>Document Title</Text>
            <Text style={styles.text}>Date signed</Text>
            <Text style={styles.text}>Download</Text>
          </View>
          <View style={styles.leftSection}>
            <Text style={styles.text}>#334343453</Text>
            <Text style={styles.text}>Title of the document</Text>
            <Text style={styles.text}>23/06/2022</Text>
            <Image source={require(

              "./assets/upload.png")} style={styles.downloadImg} />
          </View>
        </View>
      </View>
      <View style={styles.cardWrapper}>
        <View style={styles.walletCard}>
        <View style={[styles.leftSection, styles.flexItem]}>
            <Text style={styles.text}>Document ID</Text>
            <Text style={styles.text}>Document Title</Text>
            <Text style={styles.text}>Date signed</Text>
            <Text style={styles.text}>Download</Text>
          </View>
          <View style={styles.leftSection}>
            <Text style={styles.text}>#334343453</Text>
            <Text style={styles.text}>Title of the document</Text>
            <Text style={styles.text}>23/06/2022</Text>
            <Image source={require(

              "./assets/upload.png")} style={styles.downloadImg} />
          </View>
        </View>
      </View>
      <View style={styles.cardWrapper}>
        <View style={styles.walletCard}>
          <View style={[styles.leftSection, styles.flexItem]}>
            <Text style={styles.text}>Document ID</Text>
            <Text style={styles.text}>Document Title</Text>
            <Text style={styles.text}>Date signed</Text>
            <Text style={styles.text}>Download</Text>
          </View>
          <View style={styles.leftSection}>
            <Text style={styles.text}>#334343453</Text>
            <Text style={styles.text}>Title of the document</Text>
            <Text style={styles.text}>23/06/2022</Text>
            <Image source={require(

              "./assets/upload.png")} style={styles.downloadImg} />
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
  tabView: {
    width: "65%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginTop: 10,
    marginBottom: 30
  },
  tabItem: {
    height: "100%",
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    fontWeight: "bold",
    flex: 1
  },
  selectedTab: {
    backgroundColor: "#FFF",
    shadowColor: "gray",
    elevation: 10
  },
  tabText: { fontSize: 12 },
  subHeading: { fontSize: 16, marginLeft: 10, marginTop: 10, marginBottom: 10 },
  walletCard: {
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5
  },
  cardWrapper: {
    backgroundColor: "#fff",
    elevation: 15,
    shadowColor: "#ccc9c9",
    marginBottom: 20,
    borderRadius: 8
  },
  leftSection: { justifyContent: "space-evenly", alignItems: "flex-end" },
  text: { fontSize: 13, color: "#000", paddingTop: 10 },
  downloadImg: { width: 20.4, height: 14.4, resizeMode: "contain", marginTop: 10 },
  flexItem: { alignItems: "flex-start" }
});

export default DocumentsScreen;
