import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  ScrollView
} from "react-native";

const ReserveSeatScreen = (params) => {
  const [seats, setSeats] = useState([]);
  let count = 1;
  useEffect(() => {
    setSeats([
      [
        {
          position: 1,
          status: "booked"
        },
        {
          position: 2,
          status: "available"
        },
        {
          position: 3,
          status: "available"
        },
        {
          position: 4,
          status: "booked"
        },
        {
          position: 5,
          status: "available"
        },
        {
          position: 6,
          status: "available"
        },
        {
          position: 7,
          status: "available"
        },
        {
          position: 8,
          status: "available"
        },
        {
          position: 9,
          status: "available"
        },
        {
          position: 10,
          status: "reserved"
        },
        {
          position: 11,
          status: "reserved"
        },
        {
          position: 12,
          status: "reserved"
        },
        {
          position: 13,
          status: "available"
        },
        {
          position: 14,
          status: "available"
        },
        {
          position: 15,
          status: "available"
        },
        {
          position: 16,
          status: "booked"
        },
        {
          position: 17,
          status: "booked"
        },
        {
          position: 18,
          status: "booked"
        }
      ],
      [
        {
          position: 1,
          status: "available"
        },
        {
          position: 2,
          status: "available"
        },
        {
          position: 3,
          status: "available"
        },
        {
          position: 4,
          status: "booked"
        },
        {
          position: 5,
          status: "available"
        },
        {
          position: 6,
          status: "available"
        },
        {
          position: 7,
          status: "available"
        },
        {
          position: 8,
          status: "booked"
        },
        {
          position: 9,
          status: "available"
        },
        {
          position: 10,
          status: "available"
        },
        {
          position: 11,
          status: "available"
        },
        {
          position: 12,
          status: "available"
        },
        {
          position: 13,
          status: "booked"
        },
        {
          position: 14,
          status: "booked"
        },
        {
          position: 15,
          status: "booked"
        },
        {
          position: 16,
          status: "available"
        },
        {
          position: 17,
          status: "available"
        },
        {
          position: 18,
          status: "available"
        }
      ],
      [
        {
          position: 1,
          status: "available"
        },
        {
          position: 2,
          status: "available"
        },
        {
          position: 3,
          status: "available"
        },
        {
          position: 4,
          status: "booked"
        },
        {
          position: 5,
          status: "available"
        },
        {
          position: 6,
          status: "available"
        },
        {
          position: 7,
          status: "available"
        },
        {
          position: 8,
          status: "booked"
        },
        {
          position: 9,
          status: "available"
        },
        {
          position: 10,
          status: "available"
        },
        {
          position: 11,
          status: "available"
        },
        {
          position: 12,
          status: "available"
        },
        {
          position: 13,
          status: "booked"
        },
        {
          position: 14,
          status: "booked"
        },
        {
          position: 15,
          status: "booked"
        },
        {
          position: 16,
          status: "available"
        },
        {
          position: 17,
          status: "available"
        },
        {
          position: 18,
          status: "available"
        }
      ]
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <TabView tabTitles={["New", "Booked"]} selected={0} />
      <View style={styles.subPallet}>
        <View style={styles.planDes}>
          <Text style={[styles.fnt25, styles.boldText]}>24/03/2022</Text>
          <Text style={styles.fnt16}>Hours: 17:55 PM</Text>
        </View>
        <View style={styles.subPricing}>
          <Text style={[styles.fnt25, styles.boldText]}>$9.99 </Text>
          <Text style={styles.fnt16}>per seat</Text>
        </View>
      </View>
      <View style={styles.seatsKey}>
        <Image source={require("./assets/availableIcon.png")} />
        <Text style={styles.keyText}>Available</Text>
        <Image source={require("./assets/bookedIcon.png")} />
        <Text style={styles.keyText}>Booked</Text>
        <View style={styles.reservedIcon}>
          <Image source={require("./assets/reservedIcon.png")} />
        </View>
        <Text style={styles.keyText}>Reserved</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.seats}>
          {seats.map((side, index1) => (
            <View key={index1} style={styles.side}>
              {side.map((seat, index2) => (
                <View key={index2}>
                  {index2 < 3 && (
                    <Text style={styles.columnNumber}>{count++}</Text>
                  )}
                  <Seat status={seat.status} />
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.priceContainer}>
        <View style={styles.description}>
          <Text style={styles.fnt16}>Total</Text>
          <Text style={[styles.fnt14, styles.grey]}>Price of 3 seats</Text>
        </View>
        <View style={styles.pricing}>
          <Text style={[styles.fnt25, styles.boldText]}>$29.77</Text>
        </View>
      </View>
      <Button buttonText={"Book now"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  subPallet: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.5)",
    elevation: 10
  },
  planDes: {
    flex: 3,
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  subPricing: {
    flex: 2,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  boldText: {
    fontWeight: "bold"
  },
  fnt25: {
    fontSize: 25
  },
  fnt16: {
    fontSize: 16
  },
  fnt14: {
    fontSize: 14
  },
  grey: {
    color: "#8e8e93"
  },
  seatsKey: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    width: "70%",
    alignSelf: "center"
  },
  reservedIcon: {
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 20
  },
  keyText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    marginRight: 10
  },
  seats: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  side: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 200,
    flex: 1,
    justifyContent: "center"
  },
  columnNumber: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
    textAlign: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    marginHorizontal: 8
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderColor: "#e6e6e6",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginTop: 10
  }
});
export default ReserveSeatScreen;

const Seat = ({ status }) => {
  let color = "#fff";

  if (status === "booked") {
    color = "#F9D8D9";
  } else if (status === "reserved") {
    color = "#FCF1D6";
  } else {
    color = "#12D790";
  }

  const seatStyle = {
    backgroundColor: color,
    elevation: status === "reserved" ? 5 : 0
  };
  return <Pressable style={[seatStyles.seatContainer, seatStyle]}></Pressable>;
};

const seatStyles = StyleSheet.create({
  seatContainer: {
    width: 45,
    height: 40,
    backgroundColor: "black",
    margin: 4,
    borderRadius: 10
  }
});

const TabView = ({ tabTitles, selected }) => {
  return (
    <View style={tabViewStyles.paletteContainer}>
      {tabTitles.map((title, index) => (
        <View
          style={
            index === selected
              ? tabViewStyles.selected
              : tabViewStyles.unSelected
          }
          key={index}
        >
          <Text>{title}</Text>
        </View>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    width: "70%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10,
    marginHorizontal: 20
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
    backgroundColor: "#F1F1F1",
    borderRadius: 10
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
    marginVertical: 20
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
