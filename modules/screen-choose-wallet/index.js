import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable
} from "react-native";

const ChooseWallet = () => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  useEffect(() => {
    setWallets([
      {
        name: "Metamask",
        icon: require("./assets/metamaskIcon.png")
      },
      {
        name: "Trust Wallet",
        icon: require("./assets/trustIcon.png")
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Let&apos;s connect your wallet</Text>
      <Text style={styles.subHeading}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <View>
        <FlatList
          style={styles.list}
          data={wallets}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.walletContainer,
                item === selectedWallet && styles.selectedWallet
              ]}
              onPress={() => setSelectedWallet(item)}>
              <Text
                style={[
                  styles.walletText,
                  item === selectedWallet && styles.selectedWallet
                ]}>
                {item.name}
              </Text>
              <Image source={item.icon} style={styles.walletIcon} />
            </Pressable>
          )}
          keyExtractor={item => item.name}
        />
      </View>
      <Text style={styles.subHeading}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus luctus
        ultricies quis sapien faucibus egestas.
      </Text>
      <Button buttonText="Continue" style={styles.button} hideShadow />
      <Button
        buttonText="Leaarn more"
        style={styles.button}
        borderColor="#000"
        textColor="#000"
        backgroundColor="#fff"
        hideShadow
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
    alignSelf: "center",
    textAlign: "center",
    width: "70%"
  },
  subHeading: {
    fontSize: 12,
    alignSelf: "center",
    textAlign: "center",
    width: "85%",
    marginBottom: 30
  },
  list: {
    backgroundColor: "#e6e6e6",
    padding: 10,
    marginBottom: 20
  },
  walletContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "100%",
    height: 80,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff"
  },
  walletText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0076E0"
  },
  walletIcon: {
    width: 40,
    height: 40
  },
  selectedWallet: {
    backgroundColor: "#0076E0",
    color: "#fff"
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 40
  }
});

export default ChooseWallet;
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
