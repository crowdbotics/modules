import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView
} from "react-native";
import { Slider } from "react-native-elements";
const HotelFilter = () => {
  const [averagePrice, setAveragePrice] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [typesOfPlace, setTypesOfPlace] = useState([]);
  const [selected, setSelected] = useState([]);
  const [numBeds, setNumBeds] = useState(1);
  const [numBedrooms, setNumBedrooms] = useState(1);
  const [numBaths, setNumBaths] = useState(0);
  const [amenities, setAmenities] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  useEffect(() => {
    setAveragePrice(230);
    setTypesOfPlace([
      {
        name: "Entire place",
        description: "Have a place to yourself"
      },
      {
        name: "Private room",
        description: "Have your own room and share some common spaces"
      },
      {
        name: "Hotel room",
        description:
          "Have a private or shared room in a boutique hotel, hostel, and more."
      }
    ]);
    setAmenities([
      {
        name: "Basics",
        list: ["Kitchen", "Shampoo", "Heating"]
      },
      {
        name: "Extras",
        list: ["Washing machine", "Dryer"]
      }
    ]);
    setPropertyTypes([
      {
        name: "Home",
        list: ["House", "Flat", "Bungalow"]
      },
      {
        name: "Bed and breakfast",
        list: ["Bread and breakfast"]
      },
      {
        name: "Boutique Hotels",
        list: ["Boutique Hotels", "Serviced apartment"]
      }
    ]);
  }, []);
  const handleSelect = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <Text>$80 - $500+</Text>
          <Text style={styles.grey}>
            The average nightly price is ${averagePrice}
          </Text>
          <View style={styles.sliderContainer}>
            <Text>$80</Text>
            <Slider
              style={styles.slider}
              minimumValue={80}
              maximumValue={500}
              step={1}
              value={sliderValue}
              onValueChange={(value) => setSliderValue(value)}
              minimumTrackTintColor="#40BA00"
              maximumTrackTintColor="#eee"
              thumbTintColor="red"
              thumbStyle={styles.thumb}
            />
            <Text>$500</Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Types of Place</Text>
          {typesOfPlace.map((item, index) => (
            <View style={styles.placeItem} key={index}>
              <View>
                <Text>{item.name}</Text>
                <Text style={styles.grey}>{item.description}</Text>
              </View>
              <Checkbox
                value={selected.includes(item)}
                setValue={() => handleSelect(item)}
              />
            </View>
          ))}
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Rooms and beds</Text>
          <Counter
            name="Beds"
            value={numBeds}
            onValueChange={(x) => setNumBeds(x)}
          />
          <Counter
            name="Bedrooms"
            value={numBedrooms}
            onValueChange={(x) => setNumBedrooms(x)}
          />
          <Counter
            name="Bathrooms"
            value={numBaths}
            onValueChange={(x) => setNumBaths(x)}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          {amenities.map((item, index) => (
            <View key={index}>
              <Text>{item.name}</Text>
              {item.list.map((i, index1) => (
                <View style={styles.amenityItem} key={index1}>
                  <Text>{i}</Text>
                  <Checkbox
                    value={selected.includes(i)}
                    setValue={() => handleSelect(i)}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Property Type</Text>
          {propertyTypes.map((item, index) => (
            <View key={index}>
              <Text>{item.name}</Text>
              {item.list.map((i, index1) => (
                <View style={styles.amenityItem} key={index1}>
                  <Text>{i}</Text>
                  <Checkbox
                    value={selected.includes(i)}
                    setValue={() => handleSelect(i)}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <Button
            buttonText="Clear all"
            color="white"
            textColor="#000"
            hideShadow={true}
            onPress={() => setSelected([])}
          />
          <Button buttonText="Show 100+ stays" color="#12D790" />
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
  sectionContainer: {
    marginHorizontal: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  sectionTitle: {
    fontSize: 20,
    color: "#000",
    marginBottom: 10
  },
  grey: {
    color: "#6D7477"
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    elevation: 5,
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  slider: {
    flex: 1,
    marginHorizontal: 10
  },
  placeItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  amenityItem: {
    marginVertical: 5,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20
  }
});

export default HotelFilter;

const Checkbox = (props) => {
  return (
    <Pressable
      onPress={() => {
        props.setValue(!props.value);
      }}
      style={[checkboxStyles.container, props.style]}
    >
      <Image
        source={
          props.value
            ? require("./assets/checkboxIconActive.png")
            : require("./assets/checkboxIcon.png")
        }
        style={[checkboxStyles.checkbox]}
      />
    </Pressable>
  );
};

const checkboxStyles = StyleSheet.create({
  container: {
    height: 20,
    width: 20
  },
  checkbox: {
    height: "100%",
    width: "100%"
  }
});

const Counter = (props) => {
  const increment = (x) => {
    return x + 1;
  };
  const decrement = (x) => {
    if (x > 0) {
      return x - 1;
    } else {
      return 0;
    }
  };
  return (
    <View style={counterStyles.container}>
      <Text>{props.name}</Text>
      <View style={counterStyles.counterContainer}>
        <Pressable onPress={() => props.onValueChange(decrement(props.value))}>
          <Image
            source={require("./assets/decrementIcon.png")}
            style={[
              counterStyles.icon,
              props.value === 0 && counterStyles.disabled
            ]}
          />
        </Pressable>
        <Text>{props.value}</Text>
        <Pressable onPress={() => props.onValueChange(increment(props.value))}>
          <Image
            source={require("./assets/incrementIcon.png")}
            style={counterStyles.icon}
          />
        </Pressable>
      </View>
    </View>
  );
};

const counterStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: "#6D7477"
  },
  disabled: {
    tintColor: "#BEC2CE"
  }
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
