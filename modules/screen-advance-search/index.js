import React, { useState, useEffect } from "react";
import { Slider } from "react-native-elements";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
  Alert,
  Image,
  FlatList
} from "react-native";

const AdvanceSearchScreen = (params) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [ratingImages, setRatingImages] = useState([]);
  useEffect(() => {
    setData([
      {
        name: "Restaurants",
        selected: true
      },
      {
        name: "Entertainment",
        selected: false
      },
      {
        name: "Sports",
        selected: false
      },
      {
        name: "Events",
        selected: false
      },
      {
        name: "Charging Stations",
        selected: false
      },
      {
        name: "Pharmacies",
        selected: true
      },
      {
        name: "Gas Stations",
        selected: false
      },
      {
        name: "Festivals",
        selected: false
      },
      {
        name: "Shops",
        selected: false
      }
    ]);
    setRatingImages([
      require("./assets/1star.png"),
      require("./assets/2star.png"),
      require("./assets/3star.png"),
      require("./assets/4star.png"),
      require("./assets/5star.png")
    ]);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.header}>
                <Pressable>
                  <Text>Clear</Text>
                </Pressable>
                <Text style={styles.headerText}>Filters</Text>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                    source={require("./assets/cross.png")}
                    style={styles.cross}
                  />
                </Pressable>
              </View>
              <View style={styles.multiSelect}>
                <Text style={styles.filterText}>Establishment Type</Text>
                <FlatList
                  data={data}
                  renderItem={({ item }) => (
                    <Filter name={item.name} selected={item.selected}></Filter>
                  )}
                  contentContainerStyle={styles.filterList}
                  numColumns={3}
                  keyExtractor={(item, index) => index.toString()}
                  columnWrapperStyle={{
                    justifyContent: "space-around"
                  }} // display 3 in a row
                />
              </View>
              <View style={styles.pricing}>
                <View style={styles.pricingHeader}>
                  <Text style={styles.filterText}>Pricing</Text>
                  <Text>$10 - $100</Text>
                </View>
                <View style={styles.sliderContainer}>
                  <Slider
                    thumbStyle={{
                      height: 20,
                      width: 20
                    }}
                    thumbTintColor="#0000FF"
                    maximumValue={1}
                    minimumValue={0}
                    style={styles.slider}
                    animateTransitions={true}
                    animationType="timing"
                  ></Slider>
                </View>
              </View>
              <View style={styles.ratingContainer}>
                <View style={styles.ratingHeader}>
                  <Text style={styles.filterText}>Guest Ratings</Text>
                </View>
                <View style={styles.ratings}>
                  {ratingImages.map((image, index) => (
                    <Image source={image} key={index} />
                  ))}
                </View>
              </View>
              <Pressable
                style={styles.btn}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.btnContainer}>
          <Pressable style={styles.btn} onPress={() => setModalVisible(true)}>
            <Text style={styles.btnText}>Open Modal</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  modalView: {
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 35,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    borderColor: "#e6e6e6",
    borderWidth: 1
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  btnContainer: {
    padding: 30,
    paddingTop: 10,
    paddingHorizontal: 40,
    justifyContent: "center",
    marginTop: 20
  },
  btn: {
    backgroundColor: "black",
    height: 50,
    width: "100%",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  filterText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10
  },
  bold: {
    fontWeight: "bold"
  },
  header: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    paddingBottom: 10
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  filterList: {
    justifyContent: "center"
  },

  pricing: {},
  pricingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sliderContainer: {
    width: "100%",
    justifyContent: "center"
  },
  ratings: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 30
  }
});
export default AdvanceSearchScreen;

const Filter = ({ name, selected }) => {
  const filterStyle = selected
    ? filterStyles.selected
    : filterStyles.unSelected;
  return (
    <View style={[filterStyles.filter, filterStyle]}>
      <Text style={filterStyle}>{name}</Text>
    </View>
  );
};

const filterStyles = StyleSheet.create({
  filter: {
    height: 50,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  selected: {
    backgroundColor: "#000000",
    color: "#fff"
  },
  unSelected: {
    color: "grey"
  }
});
