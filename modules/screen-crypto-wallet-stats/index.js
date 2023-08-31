import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  ScrollView
} from "react-native";

const CryptoWalletStats = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [details, setDetails] = useState({});
  const [nftList, setNftList] = useState([]);
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  useEffect(() => {
    setNftList([
      {
        id: 1,
        user: "Username",
        lastBid: "0.98 ETH",
        time: "04:25:23",
        image: require("./assets/image.png"),
        title: "NFT nulla mi quis hendrerit urna nunc",
        selected: false
      },
      {
        id: 2,
        user: "Username",
        lastBid: "0.98 ETH",
        time: "04:25:23",
        image: require("./assets/image.png"),
        title: "NFT nulla mi quis hendrerit urna nunc",
        selected: true
      }
    ]);
    setDetails({
      currentToken: 1256,
      earning: 1555,
      spent: 500
    });
  }, []);
  const handleNFTSelect = day => {
    const newSelectedNFTs = [...selectedNFTs];
    if (newSelectedNFTs.includes(day)) {
      newSelectedNFTs.splice(newSelectedNFTs.indexOf(day), 1);
    } else {
      newSelectedNFTs.push(day);
    }
    setSelectedNFTs(newSelectedNFTs);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.flexRow}>
          <TabView
            tabTitles={["Stake", "Sell", "Buy"]}
            selected={selectedTab}
            onPress={setSelectedTab}
            style={styles.tabView}
          />
          <Image
            source={require("./assets/cryptoIcon.png")}
            style={styles.cryptoIcon}
          />
        </View>
        <Text style={styles.heading}>Statistics</Text>
        <View style={styles.circularProgressBar}>
          <Text style={styles.tokenHeading}>Current token</Text>
          <Text style={styles.tokenValue}>
            {format(details.currentToken, "ETH")}
          </Text>
        </View>
        <View style={styles.earningStatContainer}>
          <View style={[styles.circularDot, styles.green]} />
          <View style={styles.itemContainer}>
            <Text style={styles.fnt12}>Earning</Text>
            <Text style={styles.greenText}>
              {format(details.earning, "ETH")}
            </Text>
          </View>
          <View style={[styles.circularDot, styles.grey]} />
          <View style={styles.itemContainer}>
            <View style={styles.flexRow}>
              <Text style={styles.fnt12}>Spent</Text>
            </View>
            <Text style={styles.greyText}>{format(details.spent, "ETH")}</Text>
          </View>
        </View>
        <Text style={styles.listHeading}>NFT list</Text>
        <FlatList
          data={nftList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <NFT
              item={item}
              selected={selectedNFTs.includes(item)}
              onPress={x => handleNFTSelect(x)}
            />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <Button buttonText={"Bond NFT"} style={styles.button} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tabView: {
    flex: 1,
    marginHorizontal: 20
  },
  cryptoIcon: {
    width: 50,
    height: 50,
    marginRight: 20
  },
  heading: {
    fontSize: 16,
    marginLeft: 20,
    marginVertical: 10
  },
  circularProgressBar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
    borderWidth: 20,
    borderColor: "#12D790"
  },
  tokenHeading: {
    fontSize: 16,
    color: "#000"
  },
  tokenValue: {
    fontSize: 24,
    color: "#000",
    marginTop: 5
  },
  earningStatContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    alignItems: "flex-start"
  },
  itemContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    // borderWidth: 1,
    width: 100
  },
  circularDot: {
    width: 14,
    height: 14,
    borderRadius: 8,
    marginLeft: 15
  },
  green: {
    backgroundColor: "#12D790"
  },
  fnt12: {
    fontSize: 12
  },
  grey: {
    backgroundColor: "#979797"
  },
  greenText: {
    color: "#12D790"
  },
  greyText: {
    color: "#979797"
  },
  button: {
    margin: 20
  },
  listHeading: {
    fontSize: 24,
    marginLeft: 20,
    marginVertical: 10
  }
});

export default CryptoWalletStats;
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

const format = (value, currency, precesion) => {
  const parts = value && value.toFixed(precesion).toString().split(".");
  if (parts) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    switch (currency) {
      case "USD":
        return "$ " + parts.join(".");
      case "ETH":
        return parts.join(".") + " ETH";
      default:
        return parts.join(".");
    }
  }
};
const Button = params => {
  const backgroundColor = params.backgroundColor || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.borderColor || backgroundColor,
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
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
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

const NFT = ({ item, selected, onPress }) => {
  return (
    <View style={nftStyles.container}>
      <View style={nftStyles.imageContainer}>
        <Image source={item.image} />
        <Checkbox
          value={selected}
          setValue={() => onPress(item)}
          style={nftStyles.checkbox}
        />
        <Text style={nftStyles.timePill}>{item.time}</Text>
      </View>
      <Text style={nftStyles.title}>{item.title}</Text>
      <Text style={nftStyles.username}>{item.user}</Text>
      <View style={nftStyles.bidContainer}>
        <View style={nftStyles.bidContent}>
          <View style={nftStyles.selector}>
            <Pressable style={nftStyles.incrementBtn}>
              <Image source={require("./assets/incrementIcon.png")} />
            </Pressable>
            <Pressable style={nftStyles.decrementBtn}>
              <Image source={require("./assets/decrementIcon.png")} />
            </Pressable>
          </View>
          <View style={nftStyles.details}>
            <Text style={nftStyles.subText}>Last Bid</Text>
            <Text style={nftStyles.mainText}>{item.lastBid}</Text>
          </View>
        </View>
        <View style={nftStyles.button}>
          <Button buttonText={"Place a bid"} />
        </View>
      </View>
    </View>
  );
};

const nftStyles = StyleSheet.create({
  container: {
    margin: 10
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 5
  },
  checkbox: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 20,
    height: 20
  },
  timePill: {
    color: "#000",
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: "bold"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black"
  },
  username: {
    fontSize: 16,
    color: "#aaa"
  },
  bidContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  button: {
    flex: 1
  },
  bidContent: {
    flex: 1,
    flexDirection: "row"
  },
  selector: {
    marginRight: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10
  },
  incrementBtn: {
    backgroundColor: "#f1f1f1",
    flex: 1,
    width: 40,
    height: 25,
    justifyContent: "flex-end",
    paddingBottom: 5,
    alignItems: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  decrementBtn: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    justifyContent: "flex-start",
    paddingTop: 5,
    alignItems: "center",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    width: 40,
    height: 25
  },
  details: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start"
  },
  subText: {
    fontSize: 12,
    color: "#313633"
  },
  mainText: {
    fontSize: 18,
    color: "#26292A"
  }
});

const Checkbox = props => {
  return (
    <Pressable
      onPress={() => {
        props.setValue(!props.value);
      }}
      style={[checkboxStyles.container, props.style]}>
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
