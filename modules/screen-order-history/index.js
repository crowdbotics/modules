import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable
} from "react-native";

const OrderHistory = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [ordersHistory, setOrdersHistory] = useState([]);
  useEffect(() => {
    setOrdersHistory([
      {
        id: 1,
        name: "Order Name",
        date: "03 June 2022",
        time: "19:00",
        description: "lorem ipsum dolor sit amet",
        itemsCount: 2,
        totalPrice: 25,
        image: require("./assets/productImage.png")
      },
      {
        id: 2,
        name: "Order Name",
        date: "03 June 2022",
        time: "19:00",
        description: "lorem ipsum dolor sit amet",
        itemsCount: 2,
        totalPrice: 25,
        image: require("./assets/productImage.png")
      },
      {
        id: 3,
        name: "Order Name",
        date: "03 June 2022",
        time: "19:00",
        description: "lorem ipsum dolor sit amet",
        itemsCount: 2,
        totalPrice: 25,
        image: require("./assets/productImage.png")
      },
      {
        id: 4,
        name: "Order Name",
        date: "03 June 2022",
        time: "19:00",
        description: "lorem ipsum dolor sit amet",
        itemsCount: 2,
        totalPrice: 25,
        image: require("./assets/productImage.png")
      },
      {
        id: 5,
        name: "Order Name",
        date: "03 June 2022",
        time: "19:00",
        description: "lorem ipsum dolor sit amet",
        itemsCount: 2,
        totalPrice: 25,
        image: require("./assets/productImage.png")
      },
      {
        id: 6,
        name: "Order Name",
        date: "03 June 2022",
        time: "19:00",
        description: "lorem ipsum dolor sit amet",
        itemsCount: 2,
        totalPrice: 25,
        image: require("./assets/productImage.png")
      },
      {
        id: 7,
        name: "Order Name",
        date: "03 June 2022",
        time: "19:00",
        description: "lorem ipsum dolor sit amet",
        itemsCount: 2,
        totalPrice: 25,
        image: require("./assets/productImage.png")
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <TabView
            tabTitles={["Rejected", "Accepted", "Pending", "Completed"]}
            selected={selectedTab}
            onPress={setSelectedTab}
            style={styles.tabView}
          />
        )}
        data={ordersHistory}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.infoContainer}>
              <Image source={item.image} style={styles.productImage} />
              <View>
                <Text style={styles.mainText}>{item.name}</Text>
                <Text style={styles.subText}>
                  {item.date} | {item.time}
                </Text>
                <Text>{item.description}</Text>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.mainText}>
                {item.itemsCount} Item | ${item.totalPrice.toFixed(2)}
              </Text>
              <Pressable style={styles.button}>
                <Text style={styles.btnText}>Completed</Text>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  tabView: {
    marginHorizontal: 20
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginBottom: 20
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 30,
    marginRight: 20
  },
  mainText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
    fontWeight: "bold"
  },
  subText: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 5
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10
  },
  button: {
    width: 90,
    height: 40,
    backgroundColor: "#12D790",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 30
  },
  btnText: {
    color: "#fff",
    fontSize: 12
  }
});

export default OrderHistory;

const TabView = ({
  tabTitles,
  selected,
  onPress,
  tabColor,
  backgroundColor,
  style,
  icons
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
          onPress={() => (onPress ? onPress(index) : null)}
          style={
            index === selected
              ? [tabViewStyles.selected, tabColorStyle, tabViewStyles.tabItem]
              : [
                  tabViewStyles.unSelected,
                  backgroundColorStyle,
                  tabViewStyles.tabItem
                ]
          }
          key={index}>
          {icons
            ? (
            <Image
              source={icons[index]}
              style={[
                tabViewStyles.icon,
                index === selected
                  ? tabViewStyles.selectedIcon
                  : tabViewStyles.unSelectedIcon
              ]}
            />
              )
            : null}
          <Text>{title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    height: 48,
    backgroundColor: "#E4E4E4",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10
  },
  tabItem: {
    borderRadius: 10,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  selected: {
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    backgroundColor: "#f1f1f1"
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 5
  },
  selectedIcon: {
    tintColor: "#000"
  },
  unSelectedIcon: {
    tintColor: "#7C7C7C"
  }
});
