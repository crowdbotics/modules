import React from "react";
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Linking
} from "react-native";

const ActivityDetails = ({ route, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.firstView}>
          <Image
            style={styles.topImageStyle}
            source={{ uri: route?.params?.data?.image }}
          />
          <Image
            source={require("./assets/SummitGraphic.jpg")}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.textContainer}>
          <View style={{
            width: 60,
            position: "absolute"
          }}>
            <Pressable style={styles.verticalView} onPress={() => { navigation.navigate("activities"); }}>
              <Text allowFontScaling={false} style={styles.verticalText}>Activities</Text>
            </Pressable>
          </View>

          <View style={{
            flex: 1,
            marginTop: 40,
            marginHorizontal: 45,
            justifyContent: "center",
            alignItems: "flex-start"
          }}>
            <Text allowFontScaling={false} style={styles.sessionTitle}>{route?.params?.data?.title}</Text>
            <View
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              <Text allowFontScaling={false} style={styles.descriptionStyle}>
                {route?.params?.data?.description}
              </Text>
            </View>
            {route?.params?.data?.attachments && route?.params?.data?.attachments.length > 0 && (
              <View style={{ width: "100%" }}>
                <Text allowFontScaling={false} style={styles.verticleTitle}>Attachments</Text>
                {route?.params?.data?.attachments?.map((item, index) => {
                  const isPDF = item.attachment?.includes(".pdf");
                  const openAttachment = () => {
                    Linking.openURL(item.attachment);
                  };
                  return (
                    <Pressable
                      style={styles.cardContainer}
                      onPress={openAttachment}
                      key={index}
                    >
                      {isPDF
                        ? (
                        <Image
                          source={require("./assets/attachment.png")} // Placeholder image for PDF
                          style={styles.cardImage}
                        />
                          )
                        : (
                        <Image
                          source={{ uri: item.attachment }}
                          style={styles.cardImage}
                        />
                          )
                      }
                      <Text allowFontScaling={false} style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  descriptionStyle: {
    textAlign: "justify",
    marginTop: 30,
    fontSize: 17,
    fontFamily: "Avenir-Regular",
    color: "#000"
  },
  descriptionContainer: {
    flex: 1,
    marginTop: 40,
    marginHorizontal: 45,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  sideView: {
    width: 55,
    alignItems: "flex-start"
  },
  textContainer: {
    flexDirection: "row",
    flex: 1
  },
  firstView: {
    marginHorizontal: 20
  },
  sessionTitle: {
    color: "#6C170B",
    fontSize: 26,
    fontWeight: "700",
    alignSelf: "center",
    textAlign: "center",
    letterSpacing: 1
  },
  verticleTitle: {
    color: "#6C170B",
    fontSize: 18,
    fontWeight: "700",
    alignSelf: "center"
  },
  verticleTitleView: {
    flexDirection: "column",
    transform: [{ rotate: "270deg" }],
    marginTop: 150,
    marginLeft: -90,
    padding: 10,
    width: 220
  },
  verticalText: {
    transform: [{ rotate: "180deg" }],
    fontSize: 26,
    color: "#fff",
    fontFamily: "GaramondPremrPro-It"
  },
  logoImage: {
    position: "absolute",
    width: 150,
    height: 100,
    alignSelf: "flex-start",
    opacity: 0.7,
    marginTop: 150
  },
  verticalView: {
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginTop: 50,
    marginLeft: -70,
    width: 180,
    transform: [{ rotate: "90deg" }],
    paddingVertical: 7,
    alignItems: "center"
  },
  scrollView: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  topImageStyle: {
    height: 250,
    width: "75%",
    position: "relative",
    alignSelf: "center",
    marginTop: 40,
    backgroundColor: "#d3d3d3"
  },
  cardContainer: {
    backgroundColor: "white",
    margin: 10,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    overflow: "hidden"
  },
  cardImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  attachmentLabel: {
    color: "white"
  },
  cardTitle: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 5,
    textAlign: "center",
    fontSize: 18,
    borderWidth: 1
  }
});

export default ActivityDetails;