import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView
} from "react-native";

const HotelTripDetails = () => {
  const [hotelDetails, setHotelDetails] = useState({});
  const [allAmenities, setAllAmenities] = useState([]);
  useEffect(() => {
    setHotelDetails({
      name: 'Airstream "Glamping" Andalucia',
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed leo, ultrices pellentesque nibh neque. Sed tempus ut mi a. Turpis.",
      price: "$187",
      rating: "4.6",
      reviewCount: "130",
      image: require("./assets/hotelImage.png"),
      features: [
        {
          name: "Entire Flat",
          description: "2 guests, 1bedroom, 1 bed, 1 bathroom"
        },
        {
          name: "Outstanding Hospitality",
          description:
            "15 recent guests complimented Brooke Calgefor outstanding hospitality."
        },
        {
          name: "Great Check-in Experience",
          description:
            "98% of recent guests gave check-in process 5 star rating"
        },
        {
          name: "Great Communication",
          description: " 90% of recent guests gave communication 5 star rating"
        }
      ],
      space: [
        {
          key: "bed",
          name: "Bedroom 1",
          description: "1 double bed"
        },
        {
          key: "bed",
          name: "Common Spaces",
          description: "1 sofa bed"
        }
      ],
      free: "Fiber Optic Internet Connectin bedroom apartment with a king size bed",
      amenities: ["Wifi", "Parking", "Air Conditioning", "Cable TV"],
      location: "Malaga, Andalusia, Spain",
      locationImage: require("./assets/mapImage.png"),
      host: {
        name: "First Last Name",
        image: require("./assets/userImage.png"),
        joined: "January 2017",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed leo, ultrices pellentesque nibh neque. Sed tempus ut mi a. Turpis."
      },
      reviews: [
        {
          name: "First Last Name",
          image: require("./assets/userImage.png"),
          date: "June 2022",
          review:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed leo, ultrices pellentesque nibh neque. Sed tempus ut mi a. Turpis."
        }
      ]
    });
    setAllAmenities([
      "Wifi",
      "Parking",
      "Air Conditioning",
      "Cable TV",
      "Carbon monoxide detector",
      "Smoke detector",
      "Heating",
      "Washing machine"
    ]);
  }, []);
  const icons = [
    {
      name: "Wifi",
      image: require("./assets/wifiIcon.png")
    },
    {
      name: "Air Conditioning",
      image: require("./assets/airConditioningIcon.png")
    },
    {
      name: "Cable TV",
      image: require("./assets/tvIcon.png")
    },
    {
      name: "Parking",
      image: require("./assets/parkingIcon.png")
    },
    {
      name: "bed",
      image: require("./assets/bedIcon.png")
    }
  ];
  const getIcon = name => {
    const icon = icons.find(item => item.name === name);
    if (icon) {
      return icon.image;
    } else {
      return null;
    }
  };
  const isProvided = amenity => {
    return hotelDetails.amenities.includes(amenity);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={hotelDetails.image} style={styles.hotelImage} />
        <View style={styles.infoContainer}>
          <View style={styles.hotelName}>
            <Text style={styles.title}>{hotelDetails.name}</Text>
            <View style={styles.ratingPill}>
              <Text style={styles.ratingText}>{hotelDetails.rating}</Text>
            </View>
            <Text style={[styles.fnt12, styles.grey]}>
              ({hotelDetails.reviewCount})
            </Text>
          </View>
          <Text style={styles.description}>{hotelDetails.description}</Text>
          <View style={styles.pricingContainer}>
            <Text style={styles.pricingText}>
              {hotelDetails.price} / <Text style={styles.grey}>night</Text>
            </Text>
            <Button buttonText="Check Availability" color="#12D790" />
          </View>
        </View>
        <View style={styles.featuresContainer}>
          {hotelDetails.features &&
            hotelDetails.features.map((item, index) => (
              <View style={styles.featureItem} key={index}>
                <Text>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            ))}
          <View style={styles.bar} />
          <Text style={styles.featureQuestion}>
            Question about Brooke Calge&apos;s place?
          </Text>
          <Button
            buttonText="Contact host"
            color="#f2f2f2"
            outlineColor="#000"
            textColor="#000"
            hideShadow={true}
            style={styles.button}
          />
        </View>
        <View style={styles.spaceDetailsContainer}>
          <Text style={styles.title}>About this space</Text>
          <View style={styles.spaceItemsContainer}>
            {hotelDetails.space &&
              hotelDetails.space.map((item, index) => (
                <View style={styles.spaceItem} key={index}>
                  <Image source={getIcon(item.key)} style={styles.spaceIcon} />
                  <Text style={styles.grey}>{item.name}</Text>
                  <Text style={[styles.fnt12, styles.grey]}>
                    {item.description}
                  </Text>
                </View>
              ))}
            <Text style={[styles.grey, styles.textAlignCenter]}>
              FREE: {hotelDetails.free}
            </Text>
          </View>
          <View style={styles.spaceFooter}>
            <Text style={styles.spaceFooterText}>
              Show more about the space
            </Text>
            <Image
              source={require("./assets/dropdownIcon.png")}
              style={styles.dropdownIcon}
            />
          </View>
        </View>
        <View style={styles.amenitiesContainer}>
          <Text style={styles.title}>Amenities</Text>
          <View style={styles.amenitiesContent}>
            {allAmenities &&
              allAmenities.map((item, index) => (
                <View style={styles.amenityItem} key={index}>
                  <Image style={styles.icon} source={getIcon(item)} />
                  <Text style={isProvided(item) ? null : styles.crossed}>
                    {item}
                  </Text>
                </View>
              ))}
            <Text style={styles.amenitiesText}>Show more about amenities</Text>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.marginTitle}>{hotelDetails.location}</Text>
          <Image
            source={hotelDetails.locationImage}
            style={styles.locationImage}
          />
        </View>
        <View style={styles.reviewsContainer}>
          <Text style={styles.marginTitle}>Reviews</Text>
          <View style={styles.reviewsContent}>
            <View style={styles.userDetails}>
              <Image
                source={require("./assets/userImage.png")}
                style={styles.userImage}
              />
              <View>
                <Text style={styles.name}>
                  {hotelDetails.reviews && hotelDetails.reviews[0].name}
                </Text>
                <Text style={styles.grey}>
                  {hotelDetails.reviews && hotelDetails.reviews[0].date}
                </Text>
              </View>
            </View>
            <Text style={styles.descriptionText}>
              {hotelDetails.reviews && hotelDetails.reviews[0].review}
            </Text>
            <Text style={styles.userFooterText}>
              See all {hotelDetails.reviewCount} reviews
            </Text>
          </View>
        </View>
        <View style={styles.reviewsContainer}>
          <Text style={styles.marginTitle}>About this host</Text>
          <View style={styles.reviewsContent}>
            <View style={styles.userDetails}>
              <Image
                source={require("./assets/userImage.png")}
                style={styles.userImage}
              />
              <View>
                <Text style={styles.name}>
                  {hotelDetails.host && hotelDetails.host.name}
                </Text>
                <Text style={styles.grey}>
                  Joined in {hotelDetails.host && hotelDetails.host.joined}
                </Text>
              </View>
            </View>
            <Text style={styles.descriptionText}>
              {hotelDetails.reviews && hotelDetails.reviews[0].review}
            </Text>
            <Text style={styles.userFooterText}>Contact host</Text>
          </View>
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
  hotelImage: {
    width: "100%",
    height: 200
  },
  ratingPill: {
    backgroundColor: "#FFD500",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    width: 30,
    marginRight: 5
  },
  ratingText: {
    fontSize: 12,
    color: "#000"
  },
  hotelName: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10
  },
  title: {
    fontSize: 16,
    flex: 1
  },
  fnt12: {
    fontSize: 12
  },
  grey: {
    color: "#999"
  },
  description: {
    textAlign: "justify",
    fontSize: 12,
    color: "#7C7C7C",
    width: "90%"
  },
  pricingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10
  },
  pricingText: {
    fontSize: 18,
    flex: 1
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  featuresContainer: {
    padding: 20,
    backgroundColor: "#F2F2F2"
  },
  featureItem: {
    marginBottom: 10
  },
  bar: {
    width: "80%",
    height: 2,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginVertical: 10
  },
  featureQuestion: {
    fontSize: 12,
    color: "#999",
    textAlign: "center"
  },
  button: {
    marginTop: 20,
    marginHorizontal: 20
  },
  spaceDetailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  spaceItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center"
  },
  spaceItem: {
    alignItems: "center",
    justifyContent: "center",
    height: 115,
    width: 170,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10
  },
  spaceIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain"
  },
  textAlignCenter: {
    textAlign: "center"
  },
  spaceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 20
  },
  spaceFooterText: {
    fontSize: 14,
    color: "#12D790"
  },
  dropdownIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  amenitiesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  amenitiesContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10
  },
  amenityItem: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 150,
    marginBottom: 10
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 10
  },
  crossed: {
    textDecorationLine: "line-through",
    color: "#aaa"
  },
  amenitiesText: {
    fontSize: 14,
    color: "#12D790",
    textAlign: "center",
    marginTop: 10
  },
  locationContainer: {
    paddingBottom: 20
  },
  locationImage: {
    width: "100%",
    height: 200
  },
  marginTitle: {
    fontSize: 16,
    color: "#000",
    paddingHorizontal: 20,
    marginBottom: 10
  },
  reviewsContainer: {
    paddingBottom: 20
  },
  reviewsContent: {
    backgroundColor: "#F2F2F2",
    padding: 20
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center"
  },
  name: {
    fontSize: 14,
    color: "#000"
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10
  },
  descriptionText: {
    fontSize: 14,
    color: "#000",
    textAlign: "justify",
    marginTop: 10
  },
  userFooterText: {
    fontSize: 14,
    color: "#12D790",
    textAlign: "center",
    marginTop: 10
  }
});

export default HotelTripDetails;

const Button = params => {
  const backgroundColor = params.color || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.outlineColor || backgroundColor,
    borderWidth: 1
  };
  const btnText = {
    color: textColor
  };
  return (
    <View style={[buttonStyles.btnContainer, params.style]}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle]}
          onPress={params.onPress}>
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
    justifyContent: "center"
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
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
