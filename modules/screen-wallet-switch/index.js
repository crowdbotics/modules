import React from "react";
import { Image, Text, View, StyleSheet, ScrollView, TouchableHighlight } from "react-native";

const WalletSwitchScreen = () => {
  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={[styles.account]}>
            <Image source={require("./assets/edit.png")} style={styles.image} />
          </View>
          <View style={[styles.pt10, styles.balance]}>
            <View>
              <Text style={styles.balanceText}>$1244.84</Text>
              <Text style={styles.balanceTxt}>Balance</Text>
            </View>
          </View>
        </View>
        <View style={styles.tabView}>
          <View style={styles.tabItem}>
            <Text>Send</Text>
          </View>
          <View  style={styles.tabItem}>
            <Text>Receive</Text>
          </View>
          <View style={[styles.tabItem, styles.selectedTab]}>
            <Text>Switch</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Transaction</Text>
          </View>
        </View>
        <Text style={styles.ReceiveTransaction}>Switch</Text>
        <View style={styles.wp50}>
          <View style={styles.tabView}>
            <View style={[styles.tabItem,styles.selectedTab]}>
              <Text>Buy</Text>
            </View>
            <View style={styles.tabItem}>
              <Text>Sell</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.heading}>Buy ETH</Text>
          <View style={styles.conversion}> 
            <Text style={styles.conversionText}>ETH 2 = ETH 1.32</Text>
            <Text style={styles.conversionText}>+%11.89</Text>
          </View>
        </View>
        <View style={styles.buyCard}>
          <View>
            <Text >Ethereum</Text>
            <Text style={styles.balanceTxt}>Balance: 250.00</Text>
          </View>
          <Text style={styles.amount}>16,0|</Text>
        </View>
        <View style={styles.img}>
          <Image source={require('./assets/Icon.png')}/>
        </View>
        <View style={styles.buyCard}>
          <View>
            <Text >Bitcoin</Text>
            <Text style={styles.balanceTxt}>Balance: 250.00</Text>
          </View>
          <Text style={styles.amount}>14,0|</Text>
        </View>
        <View style={styles.btnContainer}>
          <Button>Buy</Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#FFF"
  },
  walletIcon: {
    width: "100%"
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20
  },
  account: {
    width: 61,
    height: 61,
    backgroundColor: "#D9DADD",
    borderRadius: 30.5,
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  accountText: { width: 115 },
  pt10: { paddingVertical: 10 },
  balance: { display: "flex", flexDirection: "row", marginTop: 15 },
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
    color: "#7C7C7C", fontSize: 12, alignSelf: "flex-end", textAlign: "right", fontWeight: "bold"
  },
  wp50:{
    width:'50%'
  },
  walletBalance: {
    display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 28, marginTop: 14, paddingHorizontal: 23
  },
  walletText: {
    fontSize: 16
  },
  tabView: {
    width: "100%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    padding: 6
    
  },
  selectedTab: {
    backgroundColor: "#FFF",
    shadowColor: "gray",
    elevation: 10
  },
  tabItem: {
    height: "100%",
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    fontWeight: "bold",
    flex:1
  },
  receive: { display: "flex", flex: 1, alignSelf: "center", marginTop: 25 },
  ReceiveTransaction: {
    margin: 20,
    fontSize: 16,
    fontWeight: "bold"
  },
  qrCode: {
    borderColor: "#C4C4C4", borderWidth: 2, padding: 25, borderRadius: 10
  },
  btnContainer: {
    marginTop:'10%',
    paddingHorizontal:'10%',
    marginBottom:20
  },
  cardWallet: {
    padding: 14,
    shadowColor: "lightgrey",
    elevation: 10,
    height: 134,
    borderRadius: 10
  },
  image:{
    height:30,
    width:30
  },
  walletDetails: {
    paddingTop: 12,
    paddingLeft: 14,
    paddingRight: 14,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  border: {
    borderWidth: 1,
    borderColor: "#F0F2F7",
    marginHorizontal: 14,
    marginTop: 6
  },
  priceText: {
    fontSize: 14,
    color: "#12D790"
  },
  contentContainer: {
    display: "flex", flexDirection: "column"
  },
  bottomContainer:{
    padding:10
  },
  heading:{
    fontSize:24,
    fontWeight:'bold',
    margin:10
  },
  conversion:{
    flexDirection:'row',
    alignItems:"center"
  },
  conversionText:{
    color:'#999999',
    marginHorizontal:10
  },
  buyCard:{
    backgroundColor:'#fff',
    borderRadius:10,
    padding:20, 
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:10
  },
  amount:{
    fontSize:22,
    fontWeight:"bold"
  },
  img:{
    justifyContent:"center",
    alignItems:'center',
    marginVertical:10
  }
});

export default WalletSwitchScreen;

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} disabled={props.disabled} underlayColor='#DDDDDD'>
      <View style={[btnStyles.button, {
        backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
        height: props.height ? props.height : 49
      }]}>
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>{props.children}</Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
