import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
// @ts-ignore
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import ReceiveTransaction from './receiveTransaction';
import SendTransaction from './sendTransaction';
import TransactionHistory from './transactionHistory';

const MyWallet = (props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Send', title: 'Send' },
    { key: 'Receive', title: 'Receive' },
    { key: 'Transactions', title: 'Transactions' },
  ]);
  const renderScene = SceneMap({
    Send: SendTransaction,
    Receive: ReceiveTransaction,
    Transactions: TransactionHistory,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#FFFFFF', borderRadius: 10, height: 37, shadowColor: '#000', elevation: 5}}
      indicatorContainerStyle={{ height: 37, marginTop: 6}}
      labelStyle={{color: '#000000', fontSize: 14, textTransform: 'capitalize', width: '100%'}}
      style={{
        backgroundColor: '#F1F1F1',
        height: 48,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10
      }}
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
  )
}
export default MyWallet