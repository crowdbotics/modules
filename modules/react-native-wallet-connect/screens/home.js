import React, { useEffect, useState, Fragment } from "react";

import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { getBalance, globalConnector, setGlobalConnector, switchMetamask } from "../utils";
import Button from "../components/Button";

import refreshIcon from "../assets/refresh-icon.png";

import LinearGradient from "react-native-linear-gradient";

import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import CurrencyModal from "../components/CurrencyModal";

import walletIcon from "../assets/wallet.png";

const Home = (props) => {
  const connector = useWalletConnect();
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [isSwitch, setIsSwitch] = useState(false);
  const [changeWallet, setChangeWallet] = useState(false);
  const [balance, setBalance] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (connector._peerMeta) {
        setConnectedWallet(connector._peerMeta);
      }
      if (connector.connected) {
        setIsSwitch(false);
        setGlobalConnector(connector);
      }
    }, [connector])
  );

  useEffect(() => {
    if (isSwitch) {
      if (!connector.connected) {
        connector.connect();
      }
    }
  }, [isSwitch]);

  const switchSession = async () => {
    await connector.killSession();
    setBalance(null);
    setGlobalConnector(null);
    setChangeWallet(true);
  };

  useEffect(() => {
    if (!connector.connected && changeWallet) {
      setIsSwitch(true);
      setChangeWallet(false);
    }
  }, [connector]);

  useFocusEffect(
    React.useCallback(() => {
      if (globalConnector) {
        getAccount();
      }
    }, [])
  );
  useEffect(() => {
    if (globalConnector) {
      getAccount();
    }
  }, [globalConnector]);
  useEffect(() => {
    if (connector.connected) {
      connector.on("session_update", (error, payload) => {
        getAccount();
        if (error) {
          throw error;
        }
      });
    }
  }, [connector]);

  const getAccount = () => {
    setBalance(null);
    getBalance().then(res => setBalance(res));
  };

  const switchCurrencyHandler = () => {
    setModalVisible(!modalVisible);
  };

  const handleCurrencyModalItemPress = async (chainId) => {
    await switchMetamask(chainId);
  };
  return (
    <>

      {connector.connected && connectedWallet &&
        <View style={styles.top}>
          <View style={[styles.account, styles.accounted]}>
            <TouchableOpacity onPress={switchCurrencyHandler}>
              <Text style={styles.accountText} numberOfLines={1} ellipsizeMode='middle'>{globalConnector && globalConnector._accounts}</Text>
            </TouchableOpacity>
            <View style={styles.switched}>
              <Button height={40} backgroundColor="#F1F1F1" color="#000000" onPress={switchSession}>Switch wallet</Button>
            </View>
          </View>
          <View style={[styles.pt10, styles.balance]}>
            <TouchableOpacity style={styles.getAccount} onPress={async () => await getAccount()}>
              <Image style={styles.refreshIcon} source={refreshIcon} />
            </TouchableOpacity>
            <View>
              <Text style={styles.balanceText}>{balance ? `${balance}` : <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={50} height={15} LinearGradient={LinearGradient} />}</Text>
              <Text style={styles.balanceTxt}>Balance</Text>
            </View>
          </View>
        </View>
      }

      <View style={connector.connected ? styles.container : styles.homeContainer}>
        <View>
          {connector.connected && connectedWallet && <Fragment>
            <View>
              <View style={styles.walletBalance}>
                <Text style={styles.walletText}>Wallet</Text>
                <Text style={styles.walletText}>Balance</Text>
              </View>
              <TouchableOpacity style={styles.walletCard} onPress={() => props.navigation.navigate("MyWallet")}>
                <View style={styles.myWallet}>
                  <Image source={walletIcon} />
                  <Text style={styles.walletName}>{connectedWallet.name}</Text>
                </View>
                <View>
                  <Text>
                    {balance}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.walletCardDetailContainer}>
                <View style={styles.walletCardDetail}>
                  <View>
                    <Text>Wallet</Text>
                  </View>
                  <View>
                    <Text>
                      {connectedWallet.url}
                    </Text>
                  </View>
                </View>
                <View style={styles.walletCardDetail}>
                  <View>
                    <Text>Status</Text>
                  </View>
                  <View>
                    <Text style={styles.onlineText}>
                      Online
                    </Text>
                  </View>
                </View>
                <View style={styles.walletCardDetail}>
                  <View>
                    <Text>Connect to</Text>
                  </View>
                  <View>
                    <Text>
                      {connectedWallet.description}
                    </Text>
                  </View>
                </View>
                <View style={styles.walletCardDetail}>
                  <View>
                    <Text>Address</Text>
                  </View>
                  <View>
                    <Text style={styles.accountText} numberOfLines={1} ellipsizeMode='middle'>
                      {globalConnector && globalConnector._accounts}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Fragment>}
        </View>
        {
          !connector.connected && <View style={styles.connectText}>

            {!connector.connected && <Image style={styles.walletIcon} source={walletIcon} />}
            {!connector.connected && <Text style={styles.fwb}>Connect your Wallet</Text>}
          </View>
        }
        <View style={styles.btn}>
          {!connector.connected
            ? <Button onPress={() => connector.connect()}>Connect to wallet</Button>
            : <Button onPress={() => connector.killSession()} style={styles.kill}>Kill Session</Button>}
        </View>
      </View>
      <View>
        <CurrencyModal modalVisible={modalVisible} setModalVisible={setModalVisible} onItemPress={handleCurrencyModalItemPress} />
      </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    height: "75%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#F1F1F1"
  },
  homeContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#F1F1F1"
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "25%",
    padding: 10
  },
  account: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 30
  },
  accounted: {
    display: "flex",
    flexDirection: "column"
  },
  accountText: { width: 115 },
  kill: { backgroundColor: "red", color: "white", fontWeight: "bold", marginRight: "15" },
  pt10: { paddingVertical: 10 },
  funds: { display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", marginTop: 20 },
  fundButton: { width: "48%" },
  connectText: { display: "flex", justifyContent: "center", alignItems: "center" },
  refreshIcon: {
    width: 20,
    height: 20
  },
  balance: { display: "flex", flexDirection: "row", marginTop: 15 },
  fwb: { fontWeight: "bold" },
  btn: { textAlign: "center", marginBottom: 20, paddingHorizontal: 30 },
  walletCard: { backgroundColor: "white", borderRadius: 10, height: 76, width: "100%", padding: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  walletCardDetailContainer: {
    marginTop: 17,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column"
  },
  walletCardDetail: {
    height: 45,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  switched: {
    marginTop: 25, width: 120
  },
  getAccount: {
    marginRight: 5, marginTop: 4
  },
  balanceText: {
    fontSize: 20, fontWeight: "bold"
  },
  balanceTxt: {
    color: "#7C7C7C", fontSize: 14, alignSelf: "flex-end", textAlign: "right"
  },
  walletBalance: {
    display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 28, marginTop: 14, paddingHorizontal: 23
  },
  walletText: {
    fontSize: 16
  },
  myWallet: {
    display: "flex", flexDirection: "row"
  },
  walletName: {
    color: "#26292A", fontSize: 14, marginLeft: 10, alignSelf: "center"
  },
  onlineText: {
    color: "#12D790"
  },
  walletIcon: {
    marginBottom: 10
  }
});
export default Home;
