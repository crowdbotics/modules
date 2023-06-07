import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  Pressable
} from "react-native";

const HotelAmenities = () => {
  const [hotel, setHotel] = useState({});
  const [hotelAmenities, setHotelAmenities] = useState([]);
  const [hotelServices, setHotelServices] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviewInput, setReviewInput] = useState("");
  useEffect(() => {
    setHotelAmenities(["wifi", "food", "pet", "parking", "pool"]);
    setHotelServices([
      "car-rental",
      "catering",
      "room-service",
      "massage",
      "laundry",
      "valet-parking"
    ]);
    setRatings([
      {
        name: "Location",
        value: 3
      },
      {
        name: "Cleaning",
        value: 4.8
      },
      {
        name: "Service",
        value: 4
      },
      {
        name: "Price",
        value: 3.7
      }
    ]);
    setComments([
      {
        username: "Dianne Ameter",
        comment:
          "Class aptent taciti sociosqu ad litora torquent per conubia nostra, commo inceptos himenaeos. Phasellus egete elementum mi. Nulla facilisi enam at Phasellus urna sapien, facilisis.",
        userImage: require("./assets/userImage.png"),
        rating: 5
      }
    ]);
  }, []);
  useEffect(() => {
    setHotel({
      name: "Rose Garden Hotel",
      location: "San Francisco",
      address: "20th Street, San Francisco, USA",
      rating: 4.5,
      amenities: hotelAmenities,
      services: hotelServices,
      ratings: ratings
    });
  }, [hotelAmenities, hotelServices, ratings]);
  const icons = [
    {
      name: "wifi",
      image: require("./assets/wifiIcon.png")
    },
    {
      name: "food",
      image: require("./assets/foodIcon.png")
    },
    {
      name: "pet",
      image: require("./assets/petIcon.png")
    },
    {
      name: "parking",
      image: require("./assets/parkingIcon.png")
    },
    {
      name: "pool",
      image: require("./assets/parkingIcon.png")
    },
    {
      name: "car-rental",
      image: require("./assets/carRentalIcon.png")
    },
    {
      name: "catering",
      image: require("./assets/cateringIcon.png")
    },
    {
      name: "room-service",
      image: require("./assets/roomServiceIcon.png")
    },
    {
      name: "massage",
      image: require("./assets/massageIcon.png")
    },
    {
      name: "laundary",
      image: require("./assets/laundaryIcon.png")
    },
    {
      name: "valet-parking",
      image: require("./assets/valetParkingIcon.png")
    }
  ];

  const getIcon = (name) => {
    const icon = icons.find((item) => item.name === name);
    return icon.image;
  };
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View>
            <View style={styles.shadowContainer}>
              <Image
                style={styles.hotelImage}
                source={require("./assets/hotelImage.png")}
              />
            </View>
            <View style={styles.hotelInfoContainer}>
              <View style={styles.hotelInfo}>
                <Text style={styles.hotelName}>{hotel.name}</Text>
                <Text style={styles.hotelLocation}>{hotel.location}</Text>
              </View>
              <View style={styles.ratingPill}>
                <Text style={styles.ratingText}>{hotel.rating}</Text>
              </View>
            </View>
            <View style={styles.amenitiesContainer}>
              {hotelAmenities.map((amenity, index) => (
                <View key={index}>
                  {index < 4
                    ? (
                    <View style={styles.serviceContainer}>
                      <Image
                        style={styles.serviceIcon}
                        source={getIcon(amenity)}
                      />
                      <Text style={styles.serviceText}>{amenity}</Text>
                    </View>
                      )
                    : null}
                </View>
              ))}
              <View style={styles.serviceContainer}>
                <Text style={styles.moreText}>
                  +{hotelAmenities.length - 4}
                </Text>
              </View>
            </View>
            <Text style={styles.heading}>Location</Text>
            <View style={styles.shadowContainer}>
              <Image
                source={require("./assets/mapImage.png")}
                style={styles.mapImage}
              />
            </View>
            <View style={styles.locationDetails}>
              <Image
                source={require("./assets/locationIcon.png")}
                style={styles.locationIcon}
              />
              <Text>{hotel.address}</Text>
            </View>
            <View style={styles.locationDetails}>
              <Image
                source={require("./assets/starIcon.png")}
                style={styles.locationIcon}
              />
              <Text>9,6 - Perfect Location</Text>
            </View>
            <Text style={styles.heading}>Services</Text>
          </View>
        )}
        data={hotelServices}
        renderItem={({ item }) => (
          <View style={styles.serviceContainer}>
            <Image style={styles.serviceIcon} source={getIcon(item)} />
            <Text style={styles.serviceText}>{item.replace("-", " ")}</Text>
          </View>
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        columnWrapperStyle={styles.columnWrapperStyle}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View>
            <View style={styles.ratingsHeader}>
              <Text style={styles.heading}>Ratings</Text>
              <View style={styles.ratingPill}>
                <Text style={styles.ratingText}>{hotel.rating}</Text>
              </View>
            </View>
            <View style={styles.reviewsContainer}>
              {ratings.map((rating, index) => (
                <View style={styles.ratingContainer} key={index}>
                  <Text style={styles.ratingTypeText}>{rating.name}</Text>
                  <Rating rating={rating.value} total={5} />
                  <Text style={styles.grey}>{rating.value}</Text>
                </View>
              ))}
            </View>
            <View>
              <Text style={styles.heading}>Comments</Text>
              {comments.map((comment, index) => (
                <Comment comment={comment} key={index} />
              ))}
            </View>
            <View>
              <Text style={styles.heading}>Review</Text>
              {ratings.map((rating, index) => (
                <View style={styles.reviewContainer} key={index}>
                  <Text style={styles.ratingTypeText}>{rating.name}</Text>
                  <Image
                    source={require("./assets/ratingIcon.png")}
                    style={styles.ratingImage}
                  />
                </View>
              ))}
            </View>
            <View style={styles.separator}>
              <View style={styles.bar} />
              <Text style={styles.separatorText}>Or</Text>
              <View style={styles.bar} />
            </View>
            <Input
              text="Text review"
              onChange={setReviewInput}
              value={reviewInput}
              textArea={true}
            />
            <Button buttonText="Submit" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden"
  },
  hotelImage: {
    width: 350,
    height: 170,
    borderRadius: 10,
    alignSelf: "center",
    resizeMode: "cover"
  },
  hotelInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20
  },
  hotelInfo: {
    flex: 1
  },
  hotelName: {
    fontSize: 18,
    color: "#000"
  },
  hotelLocation: {
    fontSize: 12
  },
  ratingPill: {
    backgroundColor: "#FFD500",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  ratingText: {
    fontSize: 12,
    color: "#000"
  },
  amenitiesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20
  },
  servicesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    flexWrap: "wrap",
    alignContent: "center"
  },
  serviceContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70
  },
  serviceIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    alignSelf: "center"
  },
  serviceText: {
    fontSize: 12,
    color: "gray",
    textTransform: "capitalize",
    marginTop: 5,
    textAlign: "center"
  },
  moreText: {
    fontSize: 16,
    color: "gray"
  },
  heading: {
    fontSize: 14,
    textTransform: "uppercase",
    marginRight: 10
  },
  mapImage: {
    width: 350,
    height: 130,
    borderRadius: 10,
    alignSelf: "center",
    resizeMode: "cover"
  },
  locationDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  locationIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    marginRight: 10
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  reviewsContainer: {
    padding: 20
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  ratingsHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  ratingBar: {
    height: 10,
    backgroundColor: "#DCE0E6",
    borderRadius: 10,
    width: 180
  },
  ratingTypeText: {
    fontSize: 14,
    width: 60,
    color: "#989898"
  },
  grey: {
    color: "#989898",
    width: 30
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  ratingImage: {
    width: 170,
    height: 20,
    marginLeft: 30,
    resizeMode: "contain"
  },
  separator: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  bar: {
    width: 100,
    height: 2,
    backgroundColor: "#DCE0E6"
  },
  separatorText: {
    fontSize: 14,
    color: "#989898",
    marginHorizontal: 20
  }
});

export default HotelAmenities;

const Rating = ({ total, rating }) => {
  const calculatedRating = rating / total;
  const fill = Math.round(calculatedRating * 100);
  const ratingFill = {
    width: `${fill}%`,
    maxWidth: "100%",
    backgroundColor: "#000",
    height: 10,
    borderRadius: 10
  };
  return (
    <View style={styles.ratingBar}>
      <View style={ratingFill} />
    </View>
  );
};

const Comment = ({ comment }) => {
  return (
    <View style={commentStyles.container}>
      <Image source={comment.userImage} style={commentStyles.userImage} />
      <View style={commentStyles.commentContainer}>
        <Text style={commentStyles.username}>{comment.username}</Text>
        <Text style={commentStyles.comment}>{comment.comment}</Text>
      </View>
    </View>
  );
};

const commentStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    marginRight: 10
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  commentContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    marginLeft: 10
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333"
  },
  comment: {
    fontSize: 14,
    color: "#757575",
    marginTop: 5,
    lineHeight: 20,
    textAlign: "justify"
  }
});

const Input = (props) => {
  return (
    <View style={[inputStyles.inputContainer, props.containerStyle]}>
      {props.text
        ? (
        <Text style={inputStyles.inputText}>{props.text}</Text>
          )
        : null}

      <TextInput
        style={[
          inputStyles.input,
          props.style,
          props.textArea ? inputStyles.textArea : null
        ]}
        placeholder={props.placeholder ? props.placeholder : "Enter"}
        value={props.value}
        onChangeText={(text) => props.onChange(text)}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : "#9B9B9B"
        }
        editable={props.editable !== false}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={!!props.textArea}
      />
      {props.errorText
        ? (
        <Text style={inputStyles.error}>{props.errorText}</Text>
          )
        : null}
      {props.icon
        ? (
        <Image
          source={props.icon}
          style={
            props.text ? inputStyles.iconWithText : inputStyles.iconWithoutText
          }
        />
          )
        : null}
      <View style={styles.children}>{props.children}</View>
    </View>
  );
};

const inputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center"
    // flex: 1
  },
  inputText: {
    fontSize: 14,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50
  },
  iconWithText: {
    position: "absolute",
    right: 30,
    top: 48,
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  iconWithoutText: {
    position: "absolute",
    right: 30,
    top: 28,
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  textArea: {
    height: 150
  },
  children: {}
});
const Button = (params) => {
  const backgroundColor = params.color ? params.color : "#000";
  const textColor = params.textColor ? params.textColor : "#fff";
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : backgroundColor,
    borderColor: params.outline ? backgroundColor : null,
    borderWidth: params.outline ? 1 : 0
  };
  const btnText = {
    color: params.outline ? "#000" : textColor
  };
  return (
    <View style={buttonStyles.btnContainer}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle, params.style]}
          onPress={params.onPress}
        >
          <Text style={[buttonStyles.btnText, btnText]}>
            {params.buttonText}
          </Text>
          <View style={styles.childrenContainer}>{params.children}</View>
        </Pressable>
      </View>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 40,
    justifyContent: "center",
    marginVertical: 20
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    width: "100%",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

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
