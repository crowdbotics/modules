import React from "react";
import { Text, StyleSheet, View, Image, TextInput, Slider, ScrollView, TouchableHighlight } from "react-native";

const MintingScreen = (params) => {
  const handleChange = () => {

  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Minting</Text>
        <Text />
      </View>
      <Text style={styles.subHeading}>Create NFT</Text>
      <View style={styles.tabSection}>
        <View style={styles.tabView}>
          <View style={[styles.tabItem, styles.selectedTab]}>
            <Text>Single</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Multiple</Text>
          </View>
        </View>
        <Image source={require("./assets/add.png")} style={styles.addImg} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Description</Text>
        <Text style={styles.description}>
          Text explaining the acceptable file types. Massa faucibus nisi egestas quis etiam nec feugiat: <Text style={styles.imgType}>gif, jpg, png, svg, mp4, mp3</Text>
        </Text>
      </View>
      <Text style={styles.mr10}>Name</Text>
        <View style={[styles.textInput, { marginBottom: 10 }]}>
          <Input placeholder='Enter' />
        </View>
      <Text style={styles.mr10}>Attach file</Text>
      <View style={styles.chooseContainer}>
        <Text>Choose file</Text>
        <Image source={require("./assets/choose.png")} style={styles.chooseImg} />
      </View>
      <Text style={styles.mt10}>External link</Text>
      <View style={styles.chooseContainer}>
        <TextInput placeholder='Input link' placeholderTextColor="#000" />
        <Image source={require("./assets/link.png")} style={styles.linkImg} />
      </View>
      <Text style={styles.mt10}>Put on sale</Text>
      <Slider
        style={styles.sliderStyle}
        disabled={false}
        maximumValue={10}
        minimumTrackTintColor='#000'
        minimumValue={1}
        onValueChange={handleChange}
        maximumTrackTintColor='#C4C4C4'
        value={2}
        thumbTintColor="#000"
      />
      <Text style={[styles.sliderText, { marginLeft: 40 }]}>$100</Text>
      <Text style={styles.mt10}>Smallest bid price</Text>
      <Slider
        style={styles.sliderStyle}
        disabled={false}
        maximumValue={10}
        minimumTrackTintColor='#000'
        minimumValue={1}
        onValueChange={handleChange}
        maximumTrackTintColor='#C4C4C4'
        value={3}
        thumbTintColor="#000"
      />
      <Text style={[styles.sliderText, { marginLeft: 75 }]}>$150</Text>
      <Text style={styles.mt10}>Unlock once purchased</Text>
      <Slider
        style={styles.sliderStyle}
        disabled={false}
        maximumValue={10}
        minimumTrackTintColor='#000'
        minimumValue={1}
        onValueChange={handleChange}
        maximumTrackTintColor='#C4C4C4'
        value={5}
        thumbTintColor="#000"
      />
      <Text style={[styles.sliderText, { marginLeft: 150 }]}>$500</Text>

      <Text style={styles.mr10}>Type</Text>
      <View style={styles.chooseContainer}>
        <Text>Art</Text>
        <Image source={require("./assets/down.png")} style={styles.downImg} />
      </View>
      <Text style={[styles.descriptionText, { marginTop: 15 }]}>Choose collections</Text>
      <View style={styles.tags}>
        <Text style={styles.tagText}>Collection</Text>
        <Text style={[styles.tagText]}>Collection</Text>
        <Text style={styles.tagText}>Collection</Text>
      </View>

      <View style={styles.chooseContainer}>
        <Text>Create collections</Text>
        <Image source={require("./assets/collection.png")} style={styles.collectionImg} />
      </View>

      <Text style={styles.mt10}>Name of collection</Text>
      <View style={[styles.chooseContainer, { paddingRight: 0 }]}>
        <TextInput placeholder='Enter' placeholderTextColor="#000" />
        <TouchableHighlight underlayColor="#DDDDDD" style={styles.buttonContainer}>
          <Text style={styles.button}>Save</Text>
        </TouchableHighlight>
      </View>

      <Text style={[styles.mr10, { marginTop: 10 }]}>Artist note <Text style={{ fontSize: 9 }}>(optional)</Text></Text>
        <View style={[styles.textInput, { height: 150 }]}>
          <Input placeholder="Enter" multiline={true} />
        </View>

      <Text style={styles.mt10}>Enter price for one piece</Text>
      <View style={[styles.chooseContainer, { justifyContent: "space-evenly" }]}>
        <Image source={require("./assets/minus.png")} style={styles.priceImg} />
        <TextInput placeholder='2.75 ETH' placeholderTextColor="#000" style={styles.inputPrice} />
        <Image source={require("./assets/plus.png")} style={styles.priceImg} />
      </View>
      <View style={styles.bidContainer}>
        <Text style={styles.bidText}>You must bid higher than 2.75 ETH</Text>
      </View>

     <View style={styles.feeContainer}>
      <View>
        <Text style={[styles.mr10, { marginLeft: 15 }]}>Service fee in $</Text>
        <View style={styles.feeSection}>
          <Text>15.25</Text>
        </View>
      </View>
      <View>
        <Text style={[styles.mr10, { marginLeft: 15 }]}>You will receive in $</Text>
        <View style={styles.feeSection}>
          <Text>5083.44</Text>
        </View>
      </View>
      </View>
      <Text style={styles.mt10}>Digital key,  redeem code</Text>
      <View style={styles.chooseContainer}>
        <TextInput placeholder='0xdC4592CFBa591e4E243fA35e2e4…' placeholderTextColor="#000" />
        <Image source={require("./assets/link.png")} style={styles.linkImg} />
      </View>

      <View style={styles.buttonBottom}>
        <Button>Create</Button>
        <Button backgroundColor="#fff" color="#000" borderWidth={1} >
          Cancel
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
  tabSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  subHeading: { fontSize: 16, fontWeight: "400", marginLeft: 20 },
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
    marginHorizontal: 15,
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
  addImg: { width: 24, height: 24, marginLeft: 30, marginBottom: 12, resizeMode: "contain" },
  descriptionContainer: { paddingHorizontal: 10, marginBottom: 20 },
  descriptionText: { fontSize: 16, fontWeight: "400", marginLeft: 10 },
  description: { fontSize: 12, marginVertical: 10, fontWeight: "500" },
  imgType: { color: "#12D790" },
  inputContainer: {
    marginBottom: 10
  },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
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
  chooseImg: { width: 11, height: 22, resizeMode: "contain" },
  linkImg: { width: 20, height: 12, resizeMode: "contain" },
  downImg: { width: 14, height: 20, resizeMode: "contain" },
  collectionImg: { width: 24, height: 24, resizeMode: "contain" },
  priceImg: { width: 27, height: 27, resizeMode: "contain" },
  sliderText: { color: "#77838F" },
  sliderStyle: { marginHorizontal: 5 },
  tags: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 0, marginTop: 15, marginBottom: 50 },
  tagText: { paddingVertical: 10, paddingHorizontal: 27, backgroundColor: "#F1F1F1", borderRadius: 10 },
  buttonContainer: { backgroundColor: "#000", borderRadius: 10, height: "95%", paddingHorizontal: 20, alignItems: "center", justifyContent: "center", width: "40%" },
  button: { color: "#fff", fontSize: 15, fontWeight: "500" },
  inputPrice: { fontSize: 16 },
  bidContainer: { justifyContent: "center", alignItems: "center", marginTop: 3 },
  bidText: { fontSize: 12, color: "#939396" },
  feeContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 5, marginTop: 20 },
  feeSection: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: 55,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    width: 170
  },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 30
  },
  textInput: { borderWidth: 1, borderRadius: 10, borderColor: "#C4C4C4", marginBottom: 10, marginHorizontal: 7, paddingHorizontal: 10 }
});

const Input = (props) => {
  return (
    <View style={InputStyles.container}>
      <TextInput
        style={InputStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor='#000'
        multiline={props.multiline}
        numberOfLines={props.multiline ? 10 : null}
        editable={props.editable !== false}
      />
    </View>
  );
};

const InputStyles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10
  },
  input: {
    backgroundColor: "#fff",
    height: 49,
    color: "#000",
    fontSize: 14
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
    marginVertical: 10,
    width: 150
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
export default MintingScreen;
