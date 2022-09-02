import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView
} from "react-native";

const ConnectWallet = () => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallets, setSelectedWallets] = useState([]);
  useEffect(() => {
    setWallets([
      {
        name: "Metamask",
        icon: require("./assets/metamaskIcon.png")
      },
      {
        name: "Trust Wallet",
        icon: require("./assets/trustWalletIcon.png")
      }
    ]);
  }, []);
  const handleWalletPress = wallet => {
    const newSelectedWallets = [...selectedWallets];
    if (newSelectedWallets.includes(wallet)) {
      newSelectedWallets.splice(newSelectedWallets.indexOf(wallet), 1);
    } else {
      newSelectedWallets.push(wallet);
    }
    setSelectedWallets(newSelectedWallets);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Choose Wallet</Text>
        <Text style={styles.subText}>Connect</Text>
      </View>
      <View style={styles.wallets}>
        <ScrollView>
          {wallets.map((wallet, index) => (
            <Wallet
              wallet={wallet}
              key={index}
              selected={selectedWallets.includes(wallet)}
              onPress={() => handleWalletPress(wallet)}
            />
          ))}
        </ScrollView>
        <View style={styles.button}>
          <Button buttonText={"Wallet Connect"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20
  },
  heading: {
    fontSize: 24,
    color: "#000"
  },
  subText: {
    fontSize: 12,
    color: "#999999"
  },
  wallets: {
    flex: 4,
    backgroundColor: "#F1F1F1",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10
  },
  button: {
    justifyContent: "flex-end"
  }
});

export default ConnectWallet;

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

const Wallet = ({ wallet, selected, onPress }) => {
  return (
    <View style={walletStyles.container}>
      <View style={walletStyles.cardBackground}>
        <Text style={walletStyles.name}>{wallet.name}</Text>
        <Pressable onPress={() => onPress(wallet)}>
          <Image
            source={
              selected
                ? require("./assets/checkboxIconActive.png")
                : require("./assets/checkboxIcon.png")
            }
            style={walletStyles.checkbox}
          />
        </Pressable>
      </View>
      <View style={walletStyles.walletIcon}>
        <Image source={wallet.icon} />
      </View>
    </View>
  );
};

const walletStyles = StyleSheet.create({
  container: {
    height: 160,
    justifyContent: "flex-end",
    marginBottom: 10
  },
  cardBackground: {
    backgroundColor: "#fff",
    height: "60%",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: "row",
    elevation: 5,
    shadowColor: "rgba(0, 0, 0, 0.5)"
  },
  walletIcon: {
    position: "absolute",
    top: 10,
    right: "37%",
    backgroundColor: "#f1f1f1",
    height: 100,
    width: 100,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "rgba(0, 0, 0, 0.1)"
  },
  name: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 50
  },
  checkbox: {
    marginTop: 61,
    height: 20,
    width: 20,
    marginLeft: 10
  }
});
