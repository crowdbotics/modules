import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";

const ReviewListScreen = (params) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setReviews([
      {
        id: 1,
        user: "Amanda",
        review: "A lacus mauris cras volutpat amet.",
        image: require("./assets/profile.png")
      },
      {
        id: 2,
        user: "Amanda",
        review: "A lacus mauris cras volutpat amet.",
        image: require("./assets/profile.png")
      },
      {
        id: 3,
        user: "Amanda",
        review: "A lacus mauris cras volutpat amet.",
        image: require("./assets/profile.png")
      },
      {
        id: 4,
        user: "Amanda",
        review: "A lacus mauris cras volutpat amet.",
        image: require("./assets/profile.png")
      },
      {
        id: 5,
        user: "Amanda",
        review: "A lacus mauris cras volutpat amet.",
        image: require("./assets/profile.png")
      },
      {
        id: 6,
        user: "Amanda",
        review: "A lacus mauris cras volutpat amet.",
        image: require("./assets/profile.png")
      },
      {
        id: 7,
        user: "Amanda",
        review: "A lacus mauris cras volutpat amet.",
        image: require("./assets/profile.png")
      },
      {
        id: 8,
        user: "Amanda",
        review: "A lacus mauris cras volutpat amet.",
        image: require("./assets/profile.png")
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Reviews</Text>
      <View style={styles.separator}>
        <Text>Recent</Text>
      </View>
      <ScrollView>
        {reviews.map((review, index) => (
          <Review review={review} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginVertical: 10
  },
  separator: {
    marginTop: 10,
    backgroundColor: "#DADADA",
    paddingVertical: 15,
    paddingHorizontal: 40
  }
});
export default ReviewListScreen;

const Review = ({ review }) => {
  return (
    <View style={reviewStyles.main}>
      <Image style={reviewStyles.profileCircle} source={review.image} />
      <View style={reviewStyles.details}>
        <Text style={reviewStyles.desText}>{review.review}</Text>
        <View style={reviewStyles.rating}>
          <Text style={reviewStyles.nameText}>{review.user}</Text>
          <Image
            style={reviewStyles.star}
            source={require("./assets/ratings.png")}
          />
        </View>
      </View>
    </View>
  );
};

const reviewStyles = StyleSheet.create({
  main: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#CACACA",
    marginHorizontal: 20
  },
  profileCircle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#D9DADD",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginTop: 10
  },
  details: {
    paddingLeft: 15
  },
  rating: {
    flexDirection: "row",
    alignItems: "center"
  },
  nameText: {
    fontSize: 12,
    paddingTop: 5
  },
  star: {
    marginLeft: 7,
    marginTop: 5
  },
  desText: {
    fontSize: 14
  },
  border: {
    borderWidth: 0.5,
    borderColor: "#CACACA",
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    opacity: 0.4
  }
});
