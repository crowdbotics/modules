import React from "react";
import { useWindowDimensions, StyleSheet } from "react-native";

import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import ReceiveTransaction from "./receiveTransaction";
import SendTransaction from "./sendTransaction";
import TransactionHistory from "./transactionHistory";

const MyWallet = (props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "Send", title: "Send" },
    { key: "Receive", title: "Receive" },
    { key: "Transactions", title: "Transactions" }
  ]);
  const renderScene = SceneMap({
    Send: SendTransaction,
    Receive: ReceiveTransaction,
    Transactions: TransactionHistory
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      indicatorContainerStyle={styles.indicatorContainer}
      labelStyle={styles.label}
      style={styles.tab}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "#F1F1F1",
    height: 48,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10
  },
  indicator: { backgroundColor: "#FFFFFF", borderRadius: 10, height: 37, shadowColor: "#000", elevation: 5 },
  indicatorContainer: { height: 37, marginTop: 6 },
  label: { color: "#000000", fontSize: 14, textTransform: "capitalize", width: "100%" }

});
export default MyWallet;
