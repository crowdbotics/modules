import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList
} from "react-native";

const CryptoWallet = () => {
  const [nftList, setNftList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
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
      <View style={styles.header}>
        <View>
          <Text style={styles.subText}>Current Token</Text>
          <Text style={styles.mainText}>1256 ETH</Text>
        </View>
        <Image source={require("./assets/cryptoIcon.png")} />
      </View>
      <TabView
        tabTitles={["Stake", "Sell", "Buy"]}
        selected={selectedTab}
        onPress={x => setSelectedTab(x)}
      />
      <View style={styles.separator}>
        <Text>NFT List</Text>
        <Text>Select</Text>
      </View>
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
        ListFooterComponent={() => <Button buttonText={"Bond NFT"} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  subText: {
    fontSize: 16
  },
  mainText: {
    fontSize: 36
  },
  separator: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",
    paddingHorizontal: 20
  }
});

export default CryptoWallet;

const TabView = ({
  tabTitles,
  selected,
  onPress,
  tabColor,
  backgroundColor
}) => {
  const tabColorStyle = {
    backgroundColor: tabColor || "#fff"
  };
  const backgroundColorStyle = {
    backgroundColor: backgroundColor || "#F1F1F1"
  };
  return (
    <View style={[tabViewStyles.paletteContainer, backgroundColorStyle]}>
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

const Button = params => {
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
    justifyContent: "center",
    marginVertical: 20,
    flex: 1
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
  container: {},
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
