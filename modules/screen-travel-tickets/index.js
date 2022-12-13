import React, { useState, useEffect } from "react";
import { Image, Text, View, StyleSheet, Pressable, ScrollView } from "react-native";

const TravelTickets = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [flightDetails, setFlightDetails] = useState({});
  const [selectedClass, setSelectedClass] = useState(0);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  useEffect(() => {
    setSeats([
      [
        {
          position: 1,
          status: "reserved"
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
          status: "reserved"
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
          status: "reserved"
        },
        {
          position: 17,
          status: "reserved"
        },
        {
          position: 18,
          status: "reserved"
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
          status: "reserved"
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
          status: "reserved"
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
          status: "reserved"
        },
        {
          position: 14,
          status: "reserved"
        },
        {
          position: 15,
          status: "reserved"
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
    setFlightDetails({
      departureCity: "New York",
      departureAirport: "JFK",
      arrivalCity: "London",
      arrivalAirport: "LHR",
      departureDate: "2021-06-01",
      arrivalDate: "2021-06-02",
      adults: 1,
      children: 0,
      luggage: 2
    });
  }, []);
  const handleSelectSeat = seat => {
    if (seat.status === "available") {
      if (selectedSeats.includes(seat)) {
        setSelectedSeats(
          selectedSeats.filter(s => s.position !== seat.position)
        );
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };
  const handleCount = (item, type) => {
    if (type === "add") {
      setFlightDetails({
        ...flightDetails,
        [item]: flightDetails[item] + 1
      });
    } else if (item === "children") {
      if (flightDetails[item] > 0) {
        setFlightDetails({
          ...flightDetails,
          [item]: flightDetails[item] - 1
        });
      }
    } else if (flightDetails[item] > 1) {
      setFlightDetails({
        ...flightDetails,
        [item]: flightDetails[item] - 1
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TabView
          tabTitles={["One way", "Round trip", "Multi-City"]}
          selected={selectedTab}
          onPress={setSelectedTab}
          style={styles.tabView}
          tabColor="#fff"
          textColor={"#000"}
          borderColor={"#f1f1f1"}
        />
        <Text style={styles.heading}>Choose your destination</Text>
        <View style={styles.itemContainer}>
          <View style={styles.flexRow}>
            <View style={styles.departureContainer}>
              <Text style={styles.itemLabel}>From</Text>
              <Text style={styles.itemValue}>
                {flightDetails.departureCity}
              </Text>
              <Text>({flightDetails.departureAirport})</Text>
            </View>
            <View style={styles.arrivalContainer}>
              <Text style={styles.itemLabel}>To</Text>
              <Text style={styles.itemValue}>{flightDetails.arrivalCity}</Text>
              <Text>({flightDetails.arrivalAirport})</Text>
            </View>
          </View>
          <Image
            source={require("./assets/airlineImage.png")}
            style={styles.airlineImage}
          />
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.flexRow}>
            <View>
              <Text style={styles.itemLabel}>Departure</Text>
              <View style={styles.input}>
                <Image
                  source={require("./assets/calendarIcon.png")}
                  style={styles.icon}
                />
                <Text>{flightDetails.departureDate}</Text>
                <View style={styles.counterContainer}>
                  <Pressable style={styles.counter}>
                    <Image
                      source={require("./assets/incrementIcon.png")}
                      style={styles.counterIcon}
                    />
                    <Image
                      source={require("./assets/decrementIcon.png")}
                      style={styles.counterIcon}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.itemLabel}>Arrival</Text>
              <View style={styles.input}>
                <Image
                  source={require("./assets/calendarIcon.png")}
                  style={styles.icon}
                />
                <Text>{flightDetails.arrivalDate}</Text>
                <View style={styles.counterContainer}>
                  <Pressable style={styles.counter}>
                    <Image
                      source={require("./assets/incrementIcon.png")}
                      style={styles.counterIcon}
                    />
                    <Image
                      source={require("./assets/decrementIcon.png")}
                      style={styles.counterIcon}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.flexRow}>
            <View>
              <Text style={styles.itemLabel}>Adults</Text>
              <View style={styles.input}>
                <Image
                  source={require("./assets/peopleIcon.png")}
                  style={styles.icon}
                />
                <Text>{flightDetails.adults}</Text>
                <View style={styles.counterContainer}>
                  <Pressable
                    style={styles.counter}
                    onPress={() => handleCount("adults", "add")}>
                    <Image
                      source={require("./assets/incrementIcon.png")}
                      style={styles.counterIcon}
                    />
                  </Pressable>
                  <Pressable
                    style={styles.counter}
                    onPress={() => handleCount("adults", "remove")}>
                    <Image
                      source={require("./assets/decrementIcon.png")}
                      style={styles.counterIcon}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.itemLabel}>Luggage</Text>
              <View style={styles.input}>
                <Image
                  source={require("./assets/luggageIcon.png")}
                  style={styles.icon}
                />
                <Text>{flightDetails.luggage}</Text>
                <View style={styles.counterContainer}>
                  <Pressable
                    style={styles.counter}
                    onPress={() => handleCount("luggage", "add")}>
                    <Image
                      source={require("./assets/incrementIcon.png")}
                      style={styles.counterIcon}
                    />
                  </Pressable>
                  <Pressable
                    style={styles.counter}
                    onPress={() => handleCount("luggage", "remove")}>
                    <Image
                      source={require("./assets/decrementIcon.png")}
                      style={styles.counterIcon}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.itemLabel}>Kids</Text>
              <View style={styles.input}>
                <Image
                  source={require("./assets/personIcon.png")}
                  style={styles.icon}
                />
                <Text>{flightDetails.children}</Text>
                <View style={styles.counterContainer}>
                  <Pressable
                    style={styles.counter}
                    onPress={() => handleCount("children", "add")}>
                    <Image
                      source={require("./assets/incrementIcon.png")}
                      style={styles.counterIcon}
                    />
                  </Pressable>
                  <Pressable
                    style={styles.counter}
                    onPress={() => handleCount("children", "remove")}>
                    <Image
                      source={require("./assets/decrementIcon.png")}
                      style={styles.counterIcon}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.seatsContainer}>
          <Text style={styles.seatsLabel}>Select Class</Text>
          <TabView
            tabTitles={["First Class", "Business", "Economy"]}
            tabColor="#000"
            borderColor="#000"
            textColor="#fff"
            selected={selectedClass}
            onPress={setSelectedClass}
          />
          <Text style={styles.seatsLabel}>Choose seat</Text>
          <View style={styles.seatsKey}>
            <View style={styles.flexRow}>
              <View style={[styles.seatKeyDot, styles.availableColor]} />
              <Text style={styles.fnt12}>Available</Text>
            </View>
            <View style={styles.flexRow}>
              <View style={[styles.seatKeyDot, styles.reservedColor]} />
              <Text style={styles.fnt12}>Reserved</Text>
            </View>
            <View style={styles.flexRow}>
              <View style={[styles.seatKeyDot, styles.selectedColor]} />
              <Text style={styles.fnt12}>Selected</Text>
            </View>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            style={styles.list}>
            <View style={styles.seats}>
              {seats.map((side, index1) => (
                <View key={index1} style={styles.side}>
                  {side.map((seat, index2) => (
                    <View key={index2}>
                      <Seat
                        status={seat.status}
                        selected={selectedSeats.includes(seat)}
                        onPress={() => handleSelectSeat(seat)}
                      />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
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
  tabView: {
    marginHorizontal: 20,
    width: "80%"
  },
  heading: {
    fontSize: 14,
    color: "#7c7c7c",
    textTransform: "uppercase",
    marginVertical: 10,
    marginHorizontal: 20
  },
  itemContainer: {
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  departureContainer: {
    paddingBottom: 10
  },
  arrivalContainer: {
    paddingBottom: 10,
    alignItems: "flex-end"
  },
  itemLabel: {
    fontSize: 14,
    color: "#999999",
    alignSelf: "flex-start"
  },
  itemValue: {
    fontSize: 16,
    color: "#000",
    textDecorationLine: "underline",
    marginVertical: 5
  },
  airlineImage: {
    width: 270,
    height: 60,
    alignSelf: "center",
    resizeMode: "contain",
    position: "absolute",
    bottom: 10
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 10
  },
  counterContainer: {
    paddingLeft: 15,
    justifyContent: "space-between",
    alignItems: "center"
  },
  counterIcon: {
    width: 10,
    height: 10,
    resizeMode: "contain",
    marginVertical: 2
  },
  seatsContainer: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 10,
    marginVertical: 10
  },
  seatsLabel: {
    fontSize: 14,
    color: "#999999",
    paddingHorizontal: 20
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
  seatKeyDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
    marginRight: 10
  },
  fnt12: {
    fontSize: 12
  },
  seatsKey: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 60
  },
  availableColor: {
    backgroundColor: "#F9D8D9"
  },
  reservedColor: {
    backgroundColor: "#DEDEDE"
  },
  selectedColor: {
    backgroundColor: "#12D790"
  }
});

export default TravelTickets;

const TabView = ({
  tabTitles,
  selected,
  onPress,
  tabColor,
  backgroundColor,
  style,
  icons,
  textColor,
  borderColor
}) => {
  const tabColorStyle = {
    backgroundColor: tabColor || "#fff"
  };
  const borderStyle = {
    borderColor: borderColor || "#fff",
    borderWidth: 1
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
                  borderStyle,
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
          <Text
            style={
              index === selected
                ? [textColor ? { color: textColor } : {}]
                : [{ color: "#000" }]
            }>
            {title}
          </Text>
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
    flexDirection: "row",
    marginHorizontal: 5
  },
  selected: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 5
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

const Seat = ({ status, onPress, selected }) => {
  let color = "#fff";
  if (selected) {
    color = "#12D790";
  } else if (status === "reserved") {
    color = "#DEDEDE";
  } else {
    color = "#F9D8D9";
  }

  const seatStyle = {
    backgroundColor: color
  };
  return (
    <Pressable
      style={[seatStyles.seatContainer, seatStyle]}
      onPress={() => onPress()}
    />
  );
};

const seatStyles = StyleSheet.create({
  seatContainer: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    margin: 4,
    borderRadius: 10,
    marginHorizontal: 10
  }
});
