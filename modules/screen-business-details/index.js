import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable
} from "react-native";

const BusinessDetails = () => {
  const [business, setBusiness] = useState({});
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState([]);
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    setRatings([5, 4, 3, 2, 1]);
    setBusiness({
      name: "Business Name",
      earnings: "2,500.00"
    });
    setSkills(["Skills name", "Skills name", "Skills name"]);
  }, []);
  useEffect(() => {
    setReviews({
      count: ratings.reduce((a, b) => a + b, 0),
      rating: 4.9
    });
  }, [ratings]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{business.name}</Text>
        <View style={styles.header}>
          <Text style={styles.headerText}>Earnings</Text>
          <View style={styles.earningsContainer}>
            <Text style={styles.bold}>$ {business.earnings}</Text>
            <Image
              source={require("./assets/menuIcon.png")}
              style={styles.menuIcon}
            />
          </View>
        </View>
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
          <Text style={styles.heading}>Skills</Text>
        </View>
        <View style={styles.skillsContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.skillBox}>
                <Text>{skill}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <Button buttonText={"View History"} />
      </ScrollView>
      <Footer
        titles={["Home", "Task", "Availability", "Account", "My Business"]}
        images={[
          require("./assets/homeIcon.png"),
          require("./assets/listIcon.png"),
          require("./assets/availabilityIcon.png"),
          require("./assets/accountIcon.png"),
          require("./assets/businessIconActive.png")
        ]}
        active={4}
      />
    </View>
  );
};

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 25,
    marginLeft: 20,
    marginVertical: 10,
    color: "#111112",
    fontWeight: "bold"
  },
  header: {
    backgroundColor: "rgba(218, 218, 218, 0.15)",
    padding: 20
  },
  headerText: {
    fontSize: 16,
    marginLeft: 10
  },
  earningsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    borderRadius: 10,
    borderColor: "#c1c1c1c1",
    borderWidth: 1,
    paddingHorizontal: 15,
    marginVertical: 10
  },
  bold: {
    fontWeight: "bold",
    color: "#111112"
  },
  grey: {
    color: "grey"
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
  ratingBar: {
    flex: 1,
    height: 10,
    marginHorizontal: 20,
    maxWidth: "100%",
    backgroundColor: "#DCE0E6",
    borderRadius: 10,
    marginVertical: 10
  },
  skillsContainer: {
    backgroundColor: "rgba(218, 218, 218, 0.15)",
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  skillBox: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "#000000",
    borderWidth: 1
  }
});

export default BusinessDetails;

const Footer = (props) => {
  return (
    <View style={footerStyles.footer}>
      {props.titles.map((title, index) => (
        <View style={footerStyles.footerItem} key={index}>
          <Image
            style={footerStyles.footerImage}
            source={props.images[index]}
          />
          <Text
            style={[
              footerStyles.footerItemText,
              index === props.active ? footerStyles.active : null
            ]}
          >
            {title}
          </Text>
        </View>
      ))}
    </View>
  );
};

const footerStyles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#C4C4C4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
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
  },
  active: {
    color: "#000"
  }
});

const Button = (params) => {
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
    paddingHorizontal: 40,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 100
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
    shadowColor: "rgba(0, 0, 0, 0.3)",
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
