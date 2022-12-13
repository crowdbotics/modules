import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  FlatList
} from "react-native";

const SearchHotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setHotels([
      {
        id: 1,
        name: "Airstream 'Glamping' Andalucia",
        image: require("./assets/hotelImage.png"),
        rating: 4.5,
        price: "$187",
        reviewCount: 130,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed leo, ultrices pellentesque nibh neque. Sed tempus ut mi a. Turpis."
      },
      {
        id: 2,
        name: "Pool Apartment",
        image: require("./assets/hotelImage2.png"),
        rating: 4.5,
        price: "$217",
        reviewCount: 130,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed leo, ultrices pellentesque nibh neque. Sed tempus ut mi a. Turpis."
      },
      {
        id: 3,
        name: "Beautiful flat in Rome",
        image: require("./assets/hotelImage3.png"),
        rating: 4.5,
        price: "$187",
        reviewCount: 130,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed leo, ultrices pellentesque nibh neque. Sed tempus ut mi a. Turpis."
      }
    ]);
  }, []);
  const handleFavourite = obj => {
    if (favourites.includes(obj)) {
      setFavourites(favourites.filter(fav => fav.id !== obj.id));
    } else {
      setFavourites([...favourites, obj]);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        ListHeaderComponentStyle={styles.listHeader}
        ListHeaderComponent={() => (
          <View>
            <Input
              text="Search"
              value={search}
              onChange={() => setSearch()}
              icon={require("./assets/searchIcon.png")}
              placeholder='Try "Work Trip in Paris"'
            />
            <View style={styles.filtersContainer}>
              <View style={styles.filter}>
                <Text style={styles.filterText}>Dates</Text>
              </View>
              <View style={styles.filter}>
                <Text style={styles.filterText}>Guest</Text>
              </View>
              <View style={styles.filter}>
                <Text style={styles.filterText}>Filters</Text>
              </View>
            </View>
            <Text style={styles.heading}>300+ places to stay</Text>
            <Text style={styles.subHeading}>Explore perfect places</Text>
          </View>
        )}
        data={hotels}
        renderItem={({ item }) => (
          <View>
            <Image source={item.image} style={styles.hotelImage} />
            <Pressable
              onPress={() => handleFavourite(item)}
              style={styles.heartIconContainer}>
              <Image
                source={
                  favourites.includes(item)
                    ? require("./assets/isFavIcon.png")
                    : require("./assets/favIcon.png")
                }
                style={styles.heartIcon}
              />
            </Pressable>
            <View style={styles.infoContainer}>
              <View style={styles.hotelName}>
                <Text style={styles.title}>{item.name}</Text>
                <View style={styles.ratingPill}>
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
                <Text style={[styles.fnt12, styles.grey]}>
                  ({item.reviewCount})
                </Text>
              </View>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.pricingContainer}>
                <Text style={styles.pricingText}>
                  {item.price} / <Text style={styles.grey}>night</Text>
                </Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Footer
        titles={["Explore", "Saved", "Trip", "Inbox", "Profile"]}
        images={[
          require("./assets/homeIcon.png"),
          require("./assets/savedIconActive.png"),
          require("./assets/tripIcon.png"),
          require("./assets/inboxIcon.png"),
          require("./assets/userIcon.png")
        ]}
        active={1}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  list: {
    flex: 1,
    marginBottom: 60
  },
  listHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  filter: {
    width: 80,
    height: 40,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F2F7",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.2
  },
  heading: {
    fontSize: 24,
    color: "#000"
  },
  subHeading: {
    fontSize: 14,
    color: "#8A8A8E"
  },
  hotelImage: {
    width: 370,
    height: 150,
    borderRadius: 10,
    alignSelf: "center"
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
  heartIconContainer: {
    position: "absolute",
    top: 10,
    right: 20,
    width: 20,
    height: 20
  },
  heartIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
});

export default SearchHotelsList;
const Footer = props => {
  const generator = props.hideTitle ? props.images : props.titles;
  return (
    <View style={footerStyles.footer}>
      {generator.map((title, index) => (
        <View style={footerStyles.footerItem} key={index}>
          <Image
            style={footerStyles.footerImage}
            source={props.images[index]}
          />
          {props.hideTitle
            ? null
            : (
            <Text
              style={[
                footerStyles.footerItemText,
                index === props.active ? footerStyles.active : null
              ]}>
              {title}
            </Text>
              )}
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
    height: 60,
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

const Input = props => {
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
        onChangeText={text => props.onChange(text)}
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
