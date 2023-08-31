import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import SendTransaction from "../screens/sendTransaction";
import ReceiveTransaction from "../screens/receiveTransaction";
import TransactionHistory from "../screens/transactionHistory";
import MyWallet from "../screens/myWallet";

const Stack = createStackNavigator();

const Navigator = () => {
  return <Stack.Navigator screenOptions={{ headerStyle: { elevation: 0 }, cardStyle: { backgroundColor: "#fff" } }}>
    <Stack.Screen options={{ headerShown: false }} name="home" component={Home} />
    <Stack.Screen options={{ headerTitle: "Wallet Connect" }} name="MyWallet" component={MyWallet} />
    <Stack.Screen name="SendTransaction" component={SendTransaction}/>
    <Stack.Screen name="ReceiveTransaction" component={ReceiveTransaction}/>
    <Stack.Screen name="TransactionHistory" component={TransactionHistory}/>

  </Stack.Navigator>;
};
export default Navigator;
