import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const ClientTaskerProfile = () => {
  const [taskerProfile, setTaskerProfile] = useState({});
  const [task, setTask] = useState({});
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState([5, 4, 3, 2, 1]);
  useEffect(() => {
    setRatings([5, 4, 3, 2, 1]);
    setTaskerProfile({
      name: "Tasker name",
      rate: "$40/hr",
      rating: "4.9",
      reviews: "15",
      job: "Cleaning",
      image: require("./assets/profileImage.png")
    });
    setTask({
      title: "How can I help",
      description:
        "Fast and has great attention to details, that describes my work! "
    });
  }, []);
  useEffect(() => {
    setReviews({
      count: ratings.reduce((a, b) => a + b, 0),
      rating: 4.9
    });
  }, [ratings]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.taskerProfile}>
          <Image source={taskerProfile.image} style={styles.profileImage} />
          <View style={styles.taskerInfo}>
            <Text style={styles.taskerName}>{taskerProfile.name}</Text>
            <Text style={styles.rating}>
              {taskerProfile.rating}{" "}
              <Text style={styles.grey}>({taskerProfile.reviews} Reviews)</Text>
            </Text>
            <Text>
              {taskerProfile.reviews} {taskerProfile.job} jobs
            </Text>
          </View>
          <Text style={styles.rateText}>{taskerProfile.rate}</Text>
        </View>
        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
        </View>
      </View>
      <View style={styles.separator}>
        <Text style={styles.heading}>{taskerProfile.job} Reviews</Text>
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
      <View style={styles.buttonContainer}>
        <Button buttonText="Select" onPress={() => {}} />
        <Text style={styles.rateText}>{taskerProfile.rate}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  taskerProfile: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20
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
  taskInfo: {
    padding: 20,
    backgroundColor: "rgba(218, 218, 218, 0.15)"
  },
  taskTitle: {
    fontSize: 18
  },
  taskDescription: {
    fontSize: 14,
    color: "#7E7D7D",
    marginTop: 5
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
  heading: {
    fontSize: 18
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
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default ClientTaskerProfile;

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

const Button = params => {
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : "#000",
    borderColor: params.outline ? "#000" : "#fff",
    borderWidth: 1
  };
  const btnText = {
    color: params.outline ? "#000" : "#fff"
  };
  return (
    <View style={buttonStyles.btnContainer}>
      <Pressable style={[buttonStyles.btn, btnStyle]} onPress={params.onPress}>
        <Text style={[buttonStyles.btnText, btnText]}>{params.buttonText}</Text>
        <View style={styles.childrenContainer}>{params.children}</View>
      </Pressable>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    marginVertical: 20
  },
  btn: {
    backgroundColor: "black",
    height: 50,
    width: "80%",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    elevation: 10,
    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
