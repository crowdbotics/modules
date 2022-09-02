import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList
} from "react-native";

const HotelAmenities = () => {
  const [amenitiesProvided, setAmenitiesProvided] = useState([]);
  const [allAmenities, setAllAmenities] = useState([]);
  useEffect(() => {
    setAmenitiesProvided([
      "WiFi",
      "Air conditioning",
      "Cable TV",
      "Essentials",
      "Parking"
    ]);
    setAllAmenities([
      {
        name: "WiFi",
        description: "Continuous Wi-Fi internet access"
      },
      {
        name: "Air conditioning"
      },
      {
        name: "Cable TV"
      },
      {
        name: "Essentials",
        description: "Towels, bed sheets, soap, and toilet paper"
      },
      {
        name: "Parking",
        description: "Free on premises"
      },
      {
        name: "Carbon Monoxide Detector"
      },
      {
        name: "Smoke Detector"
      },
      {
        name: "Heating"
      },
      {
        name: "Washing Machine"
      }
    ]);
  }, []);
  const isProvided = (amenityName) => {
    return amenitiesProvided.find((amenity) => amenity === amenityName);
  };
  const icons = [
    {
      name: "WiFi",
      image: require("./assets/wifiIcon.png")
    },
    {
      name: "Air conditioning",
      image: require("./assets/airConditioningIcon.png")
    },
    {
      name: "CableTV",
      image: require("./assets/tvIcon.png")
    },
    {
      name: "Essentials",
      image: require("./assets/essentialsIcon.png")
    },
    {
      name: "Parking",
      image: require("./assets/parkingIcon.png")
    }
  ];
  const getIcon = (name) => {
    const icon = icons.find((item) => item.name === name);
    if (icon) {
      return icon.image;
    } else {
      return null;
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={allAmenities}
        renderItem={({ item }) => (
          <View style={styles.amenityContainer}>
            <Image source={getIcon(item.name)} style={styles.icon} />
            <View>
              <Text
                style={
                  isProvided(item.name) ? styles.amenityName : styles.crossed
                }
              >
                {item.name}
              </Text>
              {item.description && isProvided(item.name)
                ? (
                <Text style={styles.description}>{item.description}</Text>
                  )
                : null}
              {!isProvided(item.name) && (
                <Text style={styles.description}>
                  The host hasn&apos;t reported a carbon monoxide detector on
                  the property
                </Text>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => <Button buttonText="Back" />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20
  },
  amenityContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
    resizeMode: "contain"
  },
  amenityName: {
    fontSize: 14,
    color: "#000",
    marginBottom: 5
  },
  description: {
    fontSize: 14,
    color: "#6D7477",
    width: 300
  },
  crossed: {
    fontSize: 14,
    color: "#6D7477",
    textDecorationLine: "line-through",
    marginBottom: 5
  }
});

export default HotelAmenities;

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
