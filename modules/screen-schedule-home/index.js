// @ts-nocheck
import { View, Text, StyleSheet, Image, Pressable, Dimensions, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

const Home = ({ navigation }) => {
  const [screenWidth, setScreenWidth] = useState(null);
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

  useEffect(() => {
    const windowWidth = Dimensions.get("window").width;
    setScreenWidth(windowWidth);
  }, []);

  return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Image
                        // @ts-ignore
                        source={require("./assets/file.png")}
                        style={styles.message}
                    />
                    <Text style={styles.heading}>Home</Text>
                    <Image
                        // @ts-ignore
                        source={require("./assets/search.png")}
                        style={styles.search}
                    />
                </View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <ExploreItem event={item} width={screenWidth} navigation={navigation} />}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />

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
                <Text style={styles.title}>Top Rated Doctors</Text>
                <Text style={styles.subTitle}>View all</Text>
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

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: { paddingHorizontal: 10, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 15
  },
  back: { width: 11.25, height: 20, marginLeft: -15 },
  heading: { fontSize: 16, color: "#000", fontWeight: "bold" },
  message: { width: 18, height: 12, resizeMode: "contain" },
  search: { width: 20, height: 15, resizeMode: "contain" },
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
  topsec: { marginHorizontal: 10, marginTop: 15, marginBottom: 10 },
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

const ExploreItem = ({ event, width, navigation }) => {
  return (
        <View style={[exploreItemStyles.container, { width: width - 120 }]}>
            <Pressable onPress={() => { navigation.navigate("searchScreen"); }}>
                <View style={exploreItemStyles.header}>
                    <View style={exploreItemStyles.heading}>
                        <Text style={exploreItemStyles.headingText}>{event.title}</Text>
                        <Text style={exploreItemStyles.text}>{event.specialty}</Text>
                        <Text style={exploreItemStyles.text}>{event.designation}</Text>
                    </View>
                </View>
            </Pressable>
            <View style={exploreItemStyles.detailsContainer}>
                <Image source={require("./assets/star.png")} style={exploreItemStyles.star} />
                <Text style={{ color: "#979797" }}>{event.rating}</Text>
            </View>
        </View>
  );
};

const exploreItemStyles = StyleSheet.create({
  container: {
    width: 310,
    height: 220,
    marginHorizontal: 5,
    elevation: 1,
    marginVertical: 10,
    backgroundColor: "#f7eec4",
    overflow: "hidden",
    borderRadius: 10
  },
  image: {
    width: 20,
    height: 18,
    resizeMode: "contain"
  },
  imgContainer: {
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: 5,
    marginTop: -20
  },

  heading: {
    marginVertical: 10,
    paddingHorizontal: 10
  },
  headingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#000"
  },
  text: { color: "#77838F", fontWeight: "bold" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  detailsContainer: {
    position: "absolute",
    bottom: 15,
    left: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  star: {
    width: 12,
    height: 12,
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
