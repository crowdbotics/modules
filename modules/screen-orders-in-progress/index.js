import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  FlatList
} from "react-native";

const OrdersInProgress = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setOrders([
      {
        id: 1,
        customer: "Customer name",
        orderNumber: "546589",
        location: "Street name, City, State, Zip",
        time: "12:00 PM",
        status: "in-progress",
        paymentOption: "Cash on Delivery",
        totalPrice: 14,
        image: require("./assets/orderImage.png"),
        date: "05/07/22"
      },
      {
        id: 2,
        customer: "Customer name",
        orderNumber: "546589",
        location: "Street name, City, State, Zip",
        time: "12:00 PM",
        status: "in-progress",
        paymentOption: "Cash on Delivery",
        totalPrice: 14,
        image: require("./assets/orderImage.png"),
        date: "05/07/22"
      },
      {
        id: 3,
        customer: "Customer name",
        orderNumber: "546589",
        location: "Street name, City, State, Zip",
        time: "12:00 PM",
        status: "in-progress",
        paymentOption: "Cash on Delivery",
        totalPrice: 14,
        image: require("./assets/orderImage.png"),
        date: "05/07/22"
      },
      {
        id: 4,
        customer: "Customer name",
        orderNumber: "546589",
        location: "Street name, City, State, Zip",
        time: "12:00 PM",
        status: "in-progress",
        paymentOption: "Cash on Delivery",
        totalPrice: 14,
        image: require("./assets/orderImage.png"),
        date: "05/07/22"
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <TabView
            tabTitles={["In Progress", "Completed"]}
            selected={selectedTab}
            onPress={setSelectedTab}
            style={styles.tabView}
          />
        )}
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <View style={styles.productHeader}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.mainText}>{item.customer}</Text>
                <Text style={styles.subText}>#{item.orderNumber}</Text>
              </View>
              <Pressable
                style={[
                  styles.statusBtn,
                  item.status === "in-progress" ? null : styles.green
                ]}
              >
                <Image
                  source={
                    item.status === "in-progress"
                      ? require("./assets/plusIcon.png")
                      : require("./assets/doubleTickIcon.png")
                  }
                  style={styles.plusIcon}
                />
                <Text style={styles.statusText}>
                  {item.status === "in-progress" ? "Accept" : "Delivered"}
                </Text>
              </Pressable>
            </View>
            <View style={styles.flexRow}>
              <Image
                source={require("./assets/locationIcon.png")}
                style={styles.icon}
              />
              <Text style={styles.text}>{item.location}</Text>
            </View>
            <View style={styles.flexRow}>
              <Image
                source={require("./assets/clockIcon.png")}
                style={styles.icon}
              />
              <Text style={styles.text}>
                Ordered: {item.time} {item.date}
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Image
                source={require("./assets/walletIcon.png")}
                style={styles.icon}
              />
              <Text style={styles.text}>{item.paymentOption}</Text>
              <Text style={styles.pricingText}>
                ${item.totalPrice.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
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
    width: "70%",
    marginHorizontal: 20,
    marginBottom: 20
  },
  productContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    marginBottom: 20
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#E0E0E0",
    paddingBottom: 10,
    borderBottomWidth: 1
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  productInfo: {
    flex: 1,
    justifyContent: "space-around",
    marginLeft: 20,
    height: 60
  },
  mainText: {
    fontSize: 16,
    color: "#3E4462",
    fontWeight: "bold"
  },
  subText: {
    fontSize: 16,
    color: "#7C7C7C"
  },
  statusBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#E84C4F"
  },
  green: {
    backgroundColor: "#12D790"
  },
  statusText: {
    color: "#fff",
    fontSize: 12
  },
  plusIcon: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: "contain"
  },
  text: {
    color: "#3E4462",
    fontSize: 14
  },
  pricingText: {
    color: "#000",
    fontSize: 24,
    textAlign: "right",
    flex: 1
  }
});

export default OrdersInProgress;

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
      style={[tabViewStyles.paletteContainer, backgroundColorStyle, propStyle]}
    >
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
          key={index}
        >
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
