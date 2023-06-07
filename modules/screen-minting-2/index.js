import React from "react";
import { Text, StyleSheet, View, Image, TextInput, ScrollView, TouchableHighlight } from "react-native";

// @ts-ignore
const Minting2Screen = (params) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require(
          // @ts-ignore
          "./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>NFT</Text>
        <Text />
      </View>
      <View style={styles.tabView}>
        <View style={[styles.tabItem, styles.selectedTab]}>
          <Text>Info</Text>
        </View>
        <View style={styles.tabItem}>
          <Text>Owner</Text>
        </View>
        <View style={styles.tabItem}>
          <Text>Creator</Text>
        </View>
        <View style={styles.tabItem}>
          <Text>Collection</Text>
        </View>
      </View>
      <View style={styles.cardWrapper}>
        <View style={styles.walletCard}>
          <View style={styles.walletInner}>
            <Image
              source={require(// @ts-ignore
                "./assets/pen.png")}
              style={styles.image}
            />
            <View style={styles.walletCarder}>
              <Text style={styles.eventName}>Creator name</Text>
              <Text style={styles.attending}>Creator</Text>
            </View>
          </View>
          <Image
            source={require(// @ts-ignore
              "./assets/war.png")}
            style={styles.war}
          />
        </View>
      </View>
      <View style={styles.centerBox}>
        <View style={styles.box}>
          <View style={styles.imageBox}>
            <Image source={require(
              // @ts-ignore
              "./assets/edit.png")} style={styles.edit} />
          </View>
          <Image source={require(
            // @ts-ignore
            "./assets/fullscreen.png")} style={styles.vector} />
        </View>
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.subRatings}>
          <Image source={require(
            // @ts-ignore
            "./assets/heart.png")} style={styles.heart} />
          <Text style={styles.ratingText}>2216</Text>
        </View>
        <View style={styles.subRatings}>
          <Image source={require(
            // @ts-ignore
            "./assets/copy.png")} style={styles.copy} />
          <Text style={styles.ratingText}>2216</Text>
        </View>
      </View>
      <View style={styles.costSection}>
        <View style={styles.subSection}>
          <Text>Cost of NFT</Text>
          <Text style={styles.cost}>2.803.23$</Text>
        </View>
        <View style={[styles.subSection, { marginTop: 5 }]}>
          <View style={styles.typeSection}>
            <Text style={[styles.cost, { color: "#ADB1B2" }]}>$ vs ETH</Text>
            <Image source={require(
              // @ts-ignore
              "./assets/eth.png")} style={styles.eth} />
          </View>
          <Text style={styles.ethCost}>2.75 ETH</Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Artist note</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa faucibus nisi egestas quis etiam nec feugiat. Scelerisque pellentesque at in accumsan cras tristique at id. At nullam lectus sapien nulla. At egestas cursus elit, tortor mattis gravida ornare proin ipsum. Duis purus turpis libero tristique dignissim.
        </Text>
      </View>
      <Text style={styles.mt10}>Amount of bid</Text>
      <View style={[styles.chooseContainer, { justifyContent: "space-evenly" }]}>
        <Image source={require(
          // @ts-ignore
          "./assets/minus.png")} style={styles.priceImg} />
        <TextInput placeholder='2.75 ETH' placeholderTextColor="#000" style={styles.inputPrice} />
        <Image source={require(
          // @ts-ignore
          "./assets/plus.png")} style={styles.priceImg} />
      </View>
      <View style={styles.bidContainer}>
        <Text style={styles.bidText}>You must bid higher than 2.75 ETH</Text>
      </View>
      <View style={styles.cardWrapper}>
        <View style={[styles.walletCard, { backgroundColor: "#D9D9D9" }]}>
          <View style={styles.walletInner}>
            <Image
              source={require(// @ts-ignore
                "./assets/pen.png")}
              style={styles.image}
            />
            <View style={styles.walletCarder}>
              <Text style={styles.userText}>Highest bid by</Text>
              <Text style={styles.eventName}>@username</Text>
            </View>
          </View>
          <View style={{ marginRight: 20 }}>
            <Text style={[styles.userText, { marginLeft: 0 }]}>Highest bid</Text>
            <View style={[styles.typeSection, { width: 50 }]}>
              <Image
                source={require(// @ts-ignore
                  "./assets/eth.png")}
                style={styles.eth}
              />
              <Text style={[styles.attending, { color: "#000" }]}>3.60 ETH</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.subSection2}>
        <Text>History of Bid</Text>
        <Text style={styles.cost}>05.30.2022</Text>
      </View>
      <View style={[styles.cardWrapper, styles.mp0]}>
        <View style={[styles.walletCard, { backgroundColor: "#D9D9D9" }]}>
          <View style={styles.walletInner}>
            <Image
              source={require(// @ts-ignore
                "./assets/pen.png")}
              style={styles.image}
            />
            <View style={styles.walletCarder}>
              <Text style={styles.userText}>08:10am</Text>
              <Text style={styles.eventName}>@username</Text>
            </View>
          </View>
          <View style={styles.lefSection}>
            <Text style={[styles.userText, { marginRight: -5 }]}>Bid</Text>
            <View style={[styles.typeSection]}>
              <Image
                source={require(// @ts-ignore
                  "./assets/eth.png")}
                style={styles.eth}
              />
              <Text style={[styles.attending, { color: "#000" }]}>3.60 ETH</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.cardWrapper, styles.mp0]}>
        <View style={[styles.walletCard, { backgroundColor: "#D9D9D9" }]}>
          <View style={styles.walletInner}>
            <Image
              source={require(// @ts-ignore
                "./assets/pen.png")}
              style={styles.image}
            />
            <View style={styles.walletCarder}>
              <Text style={styles.userText}>08:10am</Text>
              <Text style={styles.eventName}>@username</Text>
            </View>
          </View>
          <View style={styles.lefSection}>
            <Text style={[styles.userText, { marginRight: -5 }]}>Bid</Text>
            <View style={[styles.typeSection]}>
              <Image
                source={require(// @ts-ignore
                  "./assets/eth.png")}
                style={styles.eth}
              />
              <Text style={[styles.attending, { color: "#000" }]}>3.60 ETH</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.cardWrapper, styles.mp0]}>
        <View style={[styles.walletCard, { backgroundColor: "#D9D9D9" }]}>
          <View style={styles.walletInner}>
            <Image
              source={require(// @ts-ignore
                "./assets/pen.png")}
              style={styles.image}
            />
            <View style={styles.walletCarder}>
              <Text style={styles.userText}>08:10am</Text>
              <Text style={styles.eventName}>@username</Text>
            </View>
          </View>
          <View style={styles.lefSection}>
            <Text style={[styles.userText, { marginRight: -5 }]}>Bid</Text>
            <View style={[styles.typeSection]}>
              <Image
                source={require(// @ts-ignore
                  "./assets/eth.png")}
                style={styles.eth}
              />
              <Text style={[styles.attending, { color: "#000" }]}>3.60 ETH</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Image
          source={require(// @ts-ignore
            "./assets/down.png")}
          style={styles.down}
        />
        <View style={styles.line} />
      </View>
      <View style={styles.buttonBottom}>
        <Button>Buy Now</Button>
        <Button backgroundColor="#fff" color="#000" borderWidth={1} >
          Bid
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#FFF"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 40
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  tabView: {
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginTop: 10,
    marginHorizontal: 10
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

  walletCard: {
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderRadius: 10
  },
  cardWrapper: {
    marginTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 5
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
    fontWeight: "500",
    marginLeft: 10,
    width: 115
  },
  attending: { color: "#dadada", fontSize: 12, marginLeft: 10, width: 115 },
  image: { resizeMode: "contain", height: 33, width: 33 },
  war: { resizeMode: "contain", height: 15, width: 17 },
  box: {
    height: 170,
    width: 347,
    backgroundColor: "#fdf1d6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  imageBox: { height: 150, alignItems: "center", justifyContent: "center" },
  vector: { height: 18, width: 18, alignSelf: "flex-end", marginRight: 5, resizeMode: "contain", marginBottom: 10 },
  centerBox: { justifyContent: "center", alignItems: "center" },
  edit: { marginTop: 20, resizeMode: "contain", height: 32, width: 32 },
  ratingContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 25, marginTop: 15 },
  subRatings: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 50 },
  heart: { height: 16, width: 18, resizeMode: "contain" },
  copy: { height: 16, width: 16, resizeMode: "contain" },
  ratingText: { fontSize: 12, color: "#7C7C7C" },
  costSection: { marginTop: 30, marginBottom: 20, paddingVertical: 10, borderTopColor: "#F2F2F2", borderTopWidth: 1, borderBottomColor: "#F2F2F2", borderBottomWidth: 1, marginHorizontal: 15 },
  subSection: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 },
  typeSection: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 65 },
  cost: { fontSize: 12 },
  ethCost: { fontSize: 18 },
  eth: { height: 10, width: 10, resizeMode: "contain" },
  descriptionContainer: { paddingHorizontal: 10, marginBottom: 10 },
  descriptionText: { fontSize: 16, fontWeight: "400", marginLeft: 10 },
  description: { fontSize: 12, marginVertical: 10, fontWeight: "500" },
  mt10: {
    marginLeft: 25,
    marginBottom: 10,
    marginTop: 10
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
    marginHorizontal: 5
  },
  priceImg: { width: 27, height: 27, resizeMode: "contain" },
  inputPrice: { fontSize: 16 },
  bidContainer: { justifyContent: "center", alignItems: "center", marginTop: 3 },
  bidText: { fontSize: 12, color: "#939396" },
  userText: { fontSize: 10, color: "#939396", marginLeft: 15 },
  mp0: { marginTop: 0, paddingBottom: 0 },
  subSection2: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 8, marginTop: 20 },
  lefSection: { justifyContent: "space-between", alignItems: "flex-end", paddingRight: 5 },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "46%"
  },
  lineContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10, paddingHorizontal: 10 },
  down: { width: 10, height: 15, resizeMode: "contain" },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10
  }
});

// @ts-ignore
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
    marginVertical: 10,
    width: 150
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
export default Minting2Screen;
