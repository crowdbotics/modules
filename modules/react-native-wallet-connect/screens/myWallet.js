import React from 'react';
import { View, useWindowDimensions } from 'react-native';
// @ts-ignore
import { TabView, SceneMap } from 'react-native-tab-view';
import ReceiveTransaction from './receiveTransaction';
import SendTransaction from './sendTransaction';
import TransactionHistory from './transactionHistory';

const MyWallet = (props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Send', title: 'Send' },
    { key: 'Receive', title: 'Receive' },
    { key: 'Switch', title: 'Switch' },
    { key: 'Transactions', title: 'Transactions' },
  ]);
  const renderScene = SceneMap({
    Send: SendTransaction,
    Receive: ReceiveTransaction,
    Switch: ReceiveTransaction,
    Transactions: TransactionHistory,
  });
  
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}
export default MyWallet