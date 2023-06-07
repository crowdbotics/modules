import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";

const BusinessReviewsList = () => {
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState([5, 4, 3, 2, 1]);
  const [taskerProfile, setTaskerProfile] = useState({});
  const [task, setTask] = useState({});
  useEffect(() => {
    setRatings([5, 4, 3, 2, 1]);
    setTaskerProfile({
      name: "Tasker name",
      rate: "$40/hr",
      rating: "4.9",
      reviews: "15",
      job: "Cleaning Jobs",
      image: require("./assets/profileImage.png")
    });
    setTask({
      title: "The Task",
      description:
        "Fast and has great attention to details, that describes my work! "
    });
  }, []);
  useEffect(() => {
    setReviews({
      count: ratings.reduce((a, b) => a + b, 0),
      rating: 4.9,
      list: [
        {
          tasker: taskerProfile,
          task: task
        },
        {
          tasker: taskerProfile,
          task: task
        },
        {
          tasker: taskerProfile,
          task: task
        },
        {
          tasker: taskerProfile,
          task: task
        },
        {
          tasker: taskerProfile,
          task: task
        }
      ]
    });
  }, [ratings, taskerProfile, task]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.separator}>
          <Text style={styles.heading}>Reviews</Text>
          <Text>
            {reviews.rating}{" "}
            <Text style={styles.grey}>({reviews.count} Reviews)</Text>
          </Text>
        </View>
        <View style={styles.reviewsContainer}>
          {ratings.map((rating, index) => (
            <View style={styles.ratingContainer} key={index}>
              <Text>{5 - index}</Text>
              <Rating rating={rating} total={reviews.count} />
              <Text style={styles.grey}>({rating})</Text>
            </View>
          ))}
        </View>
        <View style={styles.separator}>
          <Text style={[styles.grey, styles.fnt16]}>
            March 19, 2022 8:00 AM
          </Text>
        </View>
        <View style={styles.reviewsList}>
          <Business taskerProfile={taskerProfile} task={task} />
          <Business taskerProfile={taskerProfile} task={task} />
          <Business taskerProfile={taskerProfile} task={task} />
          <Business taskerProfile={taskerProfile} task={task} />
        </View>
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
    fontSize: 20
  },
  separator: {
    marginLeft: 20,
    marginVertical: 10
  },
  reviewsContainer: {
    backgroundColor: "rgba(218, 218, 218, 0.15)",
    padding: 20,
    paddingHorizontal: 40
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  ratingBar: {
    flex: 1,
    height: 10,
    marginHorizontal: 20,
    maxWidth: "100%",
    backgroundColor: "#DCE0E6",
    borderRadius: 10,
    marginVertical: 10
  },
  reviewsList: {
    backgroundColor: "rgba(218, 218, 218, 0.15)"
  },
  fnt16: {
    fontSize: 16
  },
  grey: {
    color: "#4A4A4A"
  }
});

export default BusinessReviewsList;

const Rating = ({ total, rating }) => {
  const calculatedRating = rating / total;
  const fill = Math.round(calculatedRating * 100);
  const ratingFill = {
    width: `${fill}%`,
    maxWidth: "100%",
    backgroundColor: "#FFBD0A",
    height: 10,
    borderRadius: 10
  };
  return (
    <View style={styles.ratingBar}>
      <View style={ratingFill} />
    </View>
  );
};

const Business = ({ taskerProfile, task }) => {
  return (
    <View style={businessStyles.container}>
      <View style={businessStyles.taskerProfile}>
        <Image
          source={taskerProfile.image}
          style={businessStyles.profileImage}
        />
        <View style={businessStyles.taskerInfo}>
          <Text style={businessStyles.taskerName}>{taskerProfile.name}</Text>
          <Text style={businessStyles.rating}>
            {taskerProfile.rating}{" "}
            <Text style={businessStyles.grey}>
              ({taskerProfile.reviews} Reviews)
            </Text>
          </Text>
          <Text>
            {taskerProfile.reviews} {taskerProfile.job}
          </Text>
        </View>
        <Text style={businessStyles.rateText}>{taskerProfile.rate}</Text>
      </View>
      <View style={businessStyles.taskInfo}>
        <Text style={businessStyles.taskDescription}>{task.description}</Text>
      </View>
    </View>
  );
};

const businessStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 20
  },
  taskerProfile: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center"
  },
  taskerInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-around",
    marginVertical: 10
  },
  rateText: {
    fontSize: 30
    // fontWeight: "bold"
  },
  grey: {
    color: "#8e8e93"
  },
  profileImage: {
    borderRadius: 12,
    width: 80,
    height: 80,
    resizeMode: "cover"
  },
  taskInfo: {},
  taskTitle: {
    fontSize: 18
  },
  taskDescription: {
    fontSize: 14,
    color: "#7E7D7D",
    marginTop: 5
  }
});
