import React from "react";
import { Text, StyleSheet, View, Image, ScrollView, TextInput } from "react-native";

const FavoritesScreen = (params) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require(

          "./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Favorites</Text>
        <Text />
      </View>
      <View>
        <Text style={styles.mr10}>Search</Text>
        <Input placeholder="Enter" />
      </View>
      <View style={styles.mainContainer}>
          <Text style={styles.subHeading}>List of favorites</Text>
      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <View style={styles.imgContainer}>
            <Image source={require("./assets/edit.png")} style={styles.editImage} />
          </View>

          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Favorites name</Text>
            <Text style={styles.eventType}>$25</Text>
          </View>
        </View>
        <View style={styles.leftSection}>
        <Image source={require(

          "./assets/dots.png")} style={styles.dotsImg} />
          <Image source={require(

            "./assets/heart.png")} style={styles.heartImg} />
        </View>
      </View>
      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <View style={[styles.imgContainer, { backgroundColor: "#DADADA" }]}>
            <Image source={require("./assets/edit.png")} style={styles.editImage} />
          </View>

          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Favorites name</Text>
            <Text style={styles.eventType}>$45</Text>
          </View>
        </View>
        <View style={styles.leftSection}>
        <Image source={require(

          "./assets/dots.png")} style={styles.dotsImg} />
          <Image source={require(

            "./assets/heart.png")} style={styles.heartImg} />
        </View>
      </View>
      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <View style={[styles.imgContainer, { backgroundColor: "#FCF1D6" }]}>
            <Image source={require("./assets/edit.png")} style={styles.editImage} />
          </View>

          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Favorites name</Text>
            <Text style={styles.eventType}>$35</Text>
          </View>
        </View>
        <View style={styles.leftSection}>
        <Image source={require(

          "./assets/dots.png")} style={styles.dotsImg} />
          <Image source={require(

            "./assets/heart.png")} style={styles.heartImg} />
        </View>
      </View>
      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <View style={styles.imgContainer}>
            <Image source={require("./assets/edit.png")} style={styles.editImage} />
          </View>

          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Favorites name</Text>
            <Text style={styles.eventType}>$25</Text>
          </View>
        </View>
        <View style={styles.leftSection}>
        <Image source={require(

          "./assets/dots.png")} style={styles.dotsImg} />
          <Image source={require(

            "./assets/heart.png")} style={styles.heartImg} />
        </View>
      </View>
      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <View style={styles.imgContainer}>
            <Image source={require("./assets/edit.png")} style={styles.editImage} />
          </View>

          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Favorites name</Text>
            <Text style={styles.eventType}>$25</Text>
          </View>
        </View>
        <View style={styles.leftSection}>
        <Image source={require(

          "./assets/dots.png")} style={styles.dotsImg} />
          <Image source={require(

            "./assets/heart.png")} style={styles.heartImg} />
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
    backgroundColor: "#FFF"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 30
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  mainContainer: { width: "100%", marginVertical: 20 },
  subHeading: { fontSize: 16, fontWeight: "bold", marginLeft: 15, marginBottom: 15 },
  walletCard: {
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    borderRadius: 8,
    elevation: 50,
    shadowColor: "#7C7C7C"
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
    fontSize: 16,
    marginLeft: 10,
    width: 115,
    marginBottom: -5
  },
  eventType: {
    color: "#000",
    fontSize: 44,
    marginLeft: 10,
    width: 115
  },
  leftSection: { height: 70, width: 40, justifyContent: "space-between", alignItems: "center" },
  imgContainer: {
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9D8D9",
    borderRadius: 10
  },
  editImage: { resizeMode: "contain", height: 32, width: 32 },
  dotsImg: { resizeMode: "contain", height: 20, width: 20 },
  heartImg: { resizeMode: "contain", height: 20, width: 22, marginBottom: 5 }
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
export default FavoritesScreen;
