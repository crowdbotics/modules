import { View, Text, StyleSheet, Image, Pressable, FlatList, ScrollView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

const Search = ({ navigation }) => {
  const [productsList, setProductsList] = useState([]);
  const data = [
    {
      id: 1,
      title: "Dr. Sara Thomson",
      rating: 4.7,
      specialty: "Cardiology",
      designation: "Doctor",
      image: "https://raw.githubusercontent.com/crowdbotics/modules/master/modules/screen-explore-list/assets/eventImage-lg.png"
    },
    {
      id: 2,
      title: "Dr. Eric Snow",
      rating: 4.6,
      specialty: "Pulmonolgy",
      designation: "Doctor",
      image: "https://raw.githubusercontent.com/crowdbotics/modules/master/modules/screen-explore-list/assets/eventImage-lg.png"
    },
    {
      id: 3,
      title: "Dr. Eric Snow",
      rating: 4.6,
      specialty: "Pulmonolgy",
      designation: "Doctor",
      image: "https://raw.githubusercontent.com/crowdbotics/modules/master/modules/screen-explore-list/assets/eventImage-lg.png"
    },
    {
      id: 4,
      title: "Dr. Eric Snow",
      rating: 4.6,
      specialty: "Pulmonolgy",
      designation: "Doctor",
      image: "https://raw.githubusercontent.com/crowdbotics/modules/master/modules/screen-explore-list/assets/eventImage-lg.png"
    }
  ];
  useEffect(() => {
    setProductsList([
      {
        id: 1,
        name: "Cardiologist",
        image: require("./assets/heart.png"),
        selected: true
      },
      {
        id: 2,
        name: "Pulmonologist ",
        image: require("./assets/lungs.png")
      },
      {
        id: 3,
        name: "Orthopedic",
        image: require("./assets/bone.png")
      }
    ]);
  }, []);
  const handleSearch = (value) => {
    console.log("Entered Value", value);
  };

  return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>

                <View style={styles.searchContainer}>
                    <Text style={styles.headText}>Search</Text>
                    <View style={styles.inputText}>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                // value={searchText}
                                onChangeText={handleSearch}
                                placeholder='Enter'
                                placeholderTextColor={"#000"}
                                style={{ paddingLeft: 10 }}
                            />
                        </View>
                        <Image source={require(
                          // @ts-ignore
                          "./assets/search.png")} style={styles.mr10} />
                    </View>
                </View>

                <View style={styles.headingContainer}>
                    <Text style={styles.title}>Category</Text>
                    <Text style={styles.subTitle}>View all</Text>
                </View>
                <FlatList
                    style={styles.courseList}
                    data={productsList}
                    renderItem={({ item }) => <Course course={item} />}
                    numColumns={3}
                    keyExtractor={item => item.id.toString()}
                    columnWrapperStyle={styles.columnWrapper}
                />
            </View>
            <View style={[styles.headingContainer, styles.topsec]}>
                <Text style={styles.title}>4 Doctors Found</Text>
                <Text></Text>
            </View>
            <ScrollView style={{ marginBottom: 65 }}>
                {
                    data.map((doc, index) =>
                        <View style={styles.walletCard} key={index}>
                            <View style={styles.walletInner}>
                                <View style={styles.imgContainer}>
                                    <Image source={{ uri: "etrwet" }} style={styles.image} />
                                </View>
                                <View style={styles.walletCarder}>
                                    <Text style={styles.eventName}>{doc.title}</Text>
                                    <Text style={styles.eventType}>{doc.specialty} </Text>
                                    <View style={styles.ratingContainer}>
                                        <Image source={require("./assets/rating.png")} style={styles.image} />
                                        <Text style={styles.attending}>(16 reviews)</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.leftSection}>
                                <Text style={styles.date}>Book now</Text>
                            </View>
                        </View>
                    )
                }
            </ScrollView>

            <View style={styles.footer}>
                <Footer
                    images={[
                      // @ts-ignore
                      require("./assets/home.png"),
                      // @ts-ignore
                      require("./assets/calender.png"),
                      // @ts-ignore
                      require("./assets/fsearch.png"),
                      // @ts-ignore
                      require("./assets/user.png")
                    ]}
                    routes={["homeScreen", "orderStatusScreen", "searchScreen", "accountScreen"]}
                    navigation={navigation}
                />
            </View>
        </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: { paddingHorizontal: 10, backgroundColor: "#fff" },

  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0
  },
  columnWrapper: {
    justifyContent: "space-around"
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 10
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#1E2022" },
  courseList: { marginBottom: 20 },
  topsec: { marginHorizontal: 5, marginTop: 20, marginBottom: 5 },
  walletCard: {
    backgroundColor: "#fff",
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderRadius: 8,
    elevation: 15,
    shadowColor: "#ccc9c9",
    marginHorizontal: 15
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
    fontWeight: "bold",
    marginTop: -5
  },
  eventType: {
    color: "#23AAFA",
    fontSize: 12,
    marginLeft: 10,
    fontWeight: "bold",
    marginBottom: 15
  },
  attending: { color: "#ACAEAF", fontSize: 14, marginLeft: 10, fontWeight: "bold" },
  imgContainer: {
    height: 75,
    width: 95,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: 10
  },
  image: { resizeMode: "stretch", height: 10, width: 60, marginLeft: 10, marginRight: -5 },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  searchContainer: { margin: 10 },
  headText: {
    marginLeft: 10,
    marginVertical: 10
  },
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    backgroundColor: "#f7f7f7"
  },
  mr10: {
    marginRight: 10,
    height: 15,
    width: 15,
    resizeMode: "contain"
  },
  leftSection: { alignSelf: "flex-start", marginTop: 7 },
  date: { fontSize: 12, color: "#1E2022", backgroundColor: "#12D790", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14 },
  subTitle: { fontSize: 12, fontWeight: "bold", color: "#1E2022" }
});

const Footer = props => {
  return (
        <View style={[footerStyles.footer]}>
            {props.images.map((image, index) => (
                <Pressable style={footerStyles.footerItem} key={index} onPress={() => props.navigation.navigate(props.routes[index])}>
                    <Image
                        style={footerStyles.footerImage}
                        source={image}
                    />
                </Pressable>
            ))}
        </View>
  );
};

const footerStyles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  footerItemText: {
    fontSize: 13,
    color: "#fff",
    marginTop: 5
  },
  footerImage: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  }
});

const Course = ({ course }) => {
  return (
        <View style={courseStyles.container}>
            <Image source={course.image} style={courseStyles.image} />
            <Text style={[courseStyles.text]}>{course.name}</Text>
        </View>
  );
};

const courseStyles = StyleSheet.create({
  container: {
    marginBottom: 10,
    height: 110,
    width: 110,
    backgroundColor: "#FCF1D6",
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "4%"
  },
  image: { height: 27, width: 35, resizeMode: "contain", alignSelf: "flex-start", marginLeft: 10 },
  text: { color: "#23AAFA", textAlign: "center", fontSize: 12 }

});
