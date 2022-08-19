import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Image
} from "react-native";

const ExploreList = () => {
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState([]);
  const [related, setRelated] = useState([]);
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    setData([
      {
        id: 1,
        title: "Stays",
        location: "New York, USA",
        views: 48,
        image: require("./assets/eventImage-lg.png")
      },
      {
        id: 2,
        title: "Experiences",
        location: "New York, USA",
        views: 48,
        image: require("./assets/eventImage-lg.png")
      },
      {
        id: 3,
        title: "Hotels",
        location: "New York, USA",
        views: 48,
        image: require("./assets/eventImage-lg.png")
      }
    ]);
    setRelated([
      {
        id: 1,
        title: "Iceland",
        rating: 4.7,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed leo, ultrices pellentesque nibh neque. Sed tempus ut mi a. Turpis.",
        image: require("./assets/relatedImage1.png")
      },
      {
        id: 2,
        title: "Cuba",
        rating: 4.7,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed leo, ultrices pellentesque nibh neque. Sed tempus ut mi a. Turpis.",
        image: require("./assets/relatedImage2.png")
      },
      {
        id: 3,
        title: "America",
        rating: 4.7,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed leo, ultrices pellentesque nibh neque. Sed tempus ut mi a. Turpis.",
        image: require("./assets/relatedImage1.png")
      },
      {
        id: 4,
        title: "America",
        rating: 4.7,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed leo, ultrices pellentesque nibh neque. Sed tempus ut mi a. Turpis.",
        image: require("./assets/relatedImage2.png")
      }
    ]);
  }, []);
  const handleSelectFavourite = item => {
    if (favourites.includes(item)) {
      setFavourites(favourites.filter(fav => fav !== item));
    } else {
      setFavourites([...favourites, item]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        ListHeaderComponent={() => (
          <View>
            <Input
              text="Search"
              value={search}
              onChange={text => setSearch(text)}
              containerStyle={styles.inputContainer}
            />
            <TabView
              tabTitles={["Dates", "Guests", "Filters"]}
              selected={selectedTab}
              onPress={index => setSelectedTab(index)}
              tabColor="#F0F2F7"
              backgroundColor="#fff"
              style={styles.tabView}
            />
            <FlatList
              data={data}
              renderItem={({ item }) => <ExploreItem event={item} />}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
            <View style={styles.listHeader}>
              <Text style={styles.heading}>Top-related experiences</Text>
              <Text style={styles.subHeading}>
                Book activities led by local hosts on your next trip
              </Text>
            </View>
          </View>
        )}
        data={related}
        renderItem={({ item }) => (
          <RelatedItem
            event={item}
            isFav={favourites.includes(item)}
            onPress={x => handleSelectFavourite(x)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
      <Footer
        images={[
          require("./assets/homeIconActive.png"),
          require("./assets/starIcon.png"),
          require("./assets/taskIcon.png"),
          require("./assets/mapIcon.png")
        ]}
        titles={["Home", "Spnsors", "Tasks", "Map"]}
        active={0}
        activeColor="#7C7C7C"
      />
    </View>
  );
};

const RelatedItem = ({ event, isFav, onPress }) => {
  return (
    <View style={relatedItemStyles.container}>
      <Image source={event.image} style={relatedItemStyles.image} />
      <View style={relatedItemStyles.title}>
        <Text style={relatedItemStyles.titleText}>{event.title}</Text>
        <View style={relatedItemStyles.rating}>
          <Text style={relatedItemStyles.ratingText}>{event.rating}</Text>
        </View>
      </View>
      <Text style={relatedItemStyles.description}>{event.description}</Text>
      <Pressable
        style={relatedItemStyles.favIconContainer}
        onPress={() => onPress(event)}>
        <Image
          source={
            isFav
              ? require("./assets/isFavIcon.png")
              : require("./assets/favIcon.png")
          }
          style={relatedItemStyles.favIcon}
        />
      </Pressable>
    </View>
  );
};

const relatedItemStyles = StyleSheet.create({
  container: {
    width: 170,
    overflow: "hidden",
    borderRadius: 10,
    marginVertical: 10
  },
  image: {
    height: 170,
    width: 170
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  titleText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold"
  },
  rating: {
    backgroundColor: "#FFD500",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10
  },
  ratingText: {
    fontSize: 12,
    color: "#000"
  },
  description: {
    fontSize: 12,
    color: "#7C7C7C",
    marginLeft: 10
  },
  favIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 20,
    height: 20
  },
  favIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  }
});
const ExploreItem = ({ event }) => {
  return (
    <View style={exploreItemStyles.container}>
      <Image source={event.image} style={exploreItemStyles.image} />
      <View style={exploreItemStyles.content}>
        <Text style={exploreItemStyles.title}>{event.title}</Text>
        <Text style={exploreItemStyles.location}>{event.location}</Text>
        <View style={exploreItemStyles.details}>
          <Image
            source={require("./assets/usersJoined.png")}
            style={exploreItemStyles.icon}
          />
          <Text style={exploreItemStyles.detailsText}>
            {event.views} Viewed
          </Text>
        </View>
      </View>
    </View>
  );
};

const exploreItemStyles = StyleSheet.create({
  container: {
    width: 220,
    height: 250,
    marginHorizontal: 10,
    elevation: 5,
    marginVertical: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: 10
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  content: {
    paddingLeft: 10
  },
  title: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5
  },
  location: {
    fontSize: 12,
    color: "#B6B6B6",
    marginBottom: 10
  },
  details: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    height: 20,
    width: 50,
    resizeMode: "contain",
    marginRight: 10
  },
  detailsText: {
    fontSize: 12,
    color: "#27AE60"
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  inputContainer: {
    paddingHorizontal: 10,
    marginTop: 10
  },
  list: {
    flex: 1,
    marginBottom: 60
  },
  tabView: {
    marginLeft: 10
  },
  listHeader: {
    marginVertical: 10,
    paddingHorizontal: 10
  },
  heading: {
    fontSize: 24,
    color: "#22292E",
    lineHeight: 40
  },
  subHeading: {
    fontSize: 14,
    color: "#8A8A8E"
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10
  }
});

export default ExploreList;

const Footer = props => {
  const generator = props.hideTitle ? props.images : props.titles;
  const bgColor = {
    backgroundColor: props.backgroundColor ? props.backgroundColor : "#C4C4C4"
  };
  const titleColor = {
    color: props.titleColor ? props.titleColor : "#fff"
  };
  const activeColor = {
    color: props.activeColor ? props.activeColor : "#000"
  };
  return (
    <View style={[footerStyles.footer, bgColor]}>
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
                titleColor,
                footerStyles.footerItemText,
                index === props.active ? activeColor : null
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

const TabView = ({
  tabTitles,
  selected,
  onPress,
  tabColor,
  backgroundColor,
  style
}) => {
  const tabColorStyle = {
    backgroundColor: tabColor || "#fff"
  };
  const backgroundColorStyle = {
    backgroundColor: backgroundColor || "#F1F1F1"
  };
  const propStyle = style || {};
  return (
    <View
      style={[tabViewStyles.paletteContainer, backgroundColorStyle, propStyle]}>
      {tabTitles.map((title, index) => (
        <Pressable
          onPress={() => onPress(index)}
          style={
            index === selected
              ? [tabViewStyles.selected, tabColorStyle]
              : [tabViewStyles.unSelected, backgroundColorStyle]
          }
          key={index}>
          <Text>{title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    width: "80%",
    height: 48,
    backgroundColor: "#E4E4E4",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10
  },
  selected: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
    borderRadius: 10
  }
});
