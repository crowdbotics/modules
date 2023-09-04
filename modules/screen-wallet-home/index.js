import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const walletHomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
        <View style={styles.headerIcons}>
            <Image source={require(

              "./assets/back.png")} />
             <Image source={require(

               "./assets/bell.png")} />
        </View>
        <View>
          <Text style={styles.availText}>Available</Text>
          <Text style={styles.coinsText}>Coins/Cash</Text>
        </View>
        <View style={styles.amounts}>
          <Text style={styles.getAmount}>$1,893.90 <Text style={styles.totalAmount}>/ $5,250.35</Text></Text>
        </View>
        <View style={styles.slider}>
          <Image style={styles.sliderImg} source={require(

            "./assets/slider.png")} />
        </View>
        <View style={styles.tabSection}>
            <View>
              <Text style={styles.heading}>Coin</Text>
              <Text style={styles.subHeading}>$232.99</Text>
            </View>
            <View style={styles.border}></View>
            <View>
              <Text style={styles.heading}>Cash</Text>
              <Text style={styles.subHeading}>$432.90</Text>
            </View>
            <View style={styles.border}></View>
            <View>
              <Text style={styles.heading}>Staked Coins</Text>
              <Text style={styles.subHeading}>$150.00</Text>
            </View>
        </View>
      </View>
      <View style={styles.tabView}>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Exchange</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Pay</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Deposit</Text>
        </View>
      </View>
      <View style={styles.walletHeadings}>
            <Text style={styles.mainHeading}>List of wallets</Text>
            <Text style={styles.mainHeading}>Balance</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.innerView}>
            <View style={styles.innerHalfView}>
              <Image style={styles.sliderImg} source={require(

                "./assets/ethereum.png")} />
            <View>
              <Text style={styles.coinText}>Ethereum</Text>
              <Text style={styles.coinSubText}>ETH</Text>
            </View>
          </View>
          <View>
            <Text style={styles.balanceText}>$1.893,04</Text>
            <Text style={styles.balanceAmountTextPositive}>+%11.89</Text>
          </View>
        </View>
        <View style={styles.borderWhite}></View>

        <View style={styles.innerView}>
            <View style={styles.innerHalfView}>
              <Image style={styles.sliderImg} source={require(

                "./assets/bitcoin.png")} />
            <View>
              <Text style={styles.coinText}>Bitcoin</Text>
              <Text style={styles.coinSubText}>BTC</Text>
            </View>
          </View>
          <View>
            <Text style={styles.balanceText}>$37.818,60</Text>
            <Text style={styles.balanceAmountTextNegative}>-%9.89</Text>
          </View>
        </View>
        <View style={styles.borderWhite}></View>

        <View style={styles.innerView}>
            <View style={styles.innerHalfView}>
              <Image style={styles.sliderImg} source={require(

                "./assets/ripple.png")} />
            <View>
              <Text style={styles.coinText}>Ripple</Text>
              <Text style={styles.coinSubText}>XRP</Text>
            </View>
          </View>
          <View>
            <Text style={styles.balanceText}>$142,12</Text>
            <Text style={styles.balanceAmountTextPositive}>+%1.89</Text>
          </View>
        </View>
      </View>
        <View style={styles.walletAreaSection}>
            <Text style={styles.mainHeading}>Currency chat</Text>
            <Image style={styles.sliderImg} source={require(

              "./assets/dropdown.png")} />
        </View>
        <View style={styles.imageGraph}>
          <Image style={styles.graphImg} source={require(

            "./assets/card.png")} />
        </View>

        <View style={styles.indicatorsSection}>
            <View style={styles.innerIndicator}>
              <View style={styles.blueCircle}></View>
              <Text style={styles.subHeadingTwo}>Ethereum</Text>
            </View>
            <View style={styles.border}></View>
            <View style={styles.innerIndicator}>
              <Text style={styles.greenCircle}></Text>
              <Text style={styles.subHeadingTwo}>Bitcoin</Text>
            </View>
            <View style={styles.border}></View>
            <View style={styles.innerIndicator}>
              <Text style={styles.redCircle}></Text>
              <Text style={styles.subHeadingTwo}>Ripple</Text>
            </View>
        </View>
      <View style={styles.tabParent}>
        <View style={styles.tabViewTwo}>
          <View style={styles.tabItem}>
            <Text style={styles.tabText}>Buy</Text>
          </View>
          <View style={styles.tabItem}>
            <Text style={styles.tabText}>Sell</Text>
          </View>
          <View style={styles.tabItem}>
            <Text style={styles.tabText}>Swap</Text>
          </View>
          <View style={styles.tabItem}>
            <Text style={styles.tabText}>History</Text>
          </View>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: "white",
    display: "flex",
    paddingVertical: 20,
    height: "100%"
  },
  header: {
    height: 237,
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 25,
    paddingVertical: 25
  },
  headerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  availText: {
    fontSize: 14,
    color: "#111112",
    marginTop: 15
  },
  coinsText: {
    fontSize: 11,
    color: "#7C7C7C"
  },
  getAmount: {
    fontSize: 26,
    color: "#12D790",
    fontWeight: "500"
  },
  totalAmount: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "500"
  },
  amounts: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  slider: {
    marginTop: 14
  },
  sliderImg: {
    borderRadius: 5
  },
  tabSection: {
    height: 77,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10
  },
  heading: {
    fontSize: 14,
    color: "#26292A",
    fontWeight: "500",
    textAlign: "center"
  },
  subHeading: {
    fontSize: 16,
    color: "#12D790",
    fontWeight: "500",
    textAlign: "center"
  },
  subHeadingTwo: {
    fontSize: 14,
    color: "#26292A",
    fontWeight: "500",
    marginLeft: 10
  },
  border: {
    borderWidth: 1,
    height: 49,
    borderColor: "#F2F2F2"
  },
  tabView: {
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    width: 282,
    marginTop: 40
  },
  tabViewTwo: {
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
    marginTop: 40
  },
  tabItem: {
    height: 37,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FFF",
    shadowColor: "gray",
    elevation: 10,
    borderRadius: 10,
    color: "#000",
    width: 81,
    marginHorizontal: 10
  },
  tabText: {
    fontSize: 12,
    color: "#7C7C7C",
    textAlign: "center"
  },
  walletHeadings: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 40
  },
  walletAreaSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 32,
    paddingTop: 40
  },
  mainHeading: {
    fontSize: 16,
    color: "#000000"
  },
  mainContainer: {
    height: 266,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 20
  },
  innerView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18
  },
  innerHalfView: {
    flexDirection: "row",
    alignItems: "center"
  },
  coinText: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 20,
    marginBottom: 10
  },
  coinSubText: {
    fontSize: 12,
    color: "#ADB1B2",
    marginLeft: 20
  },
  balanceText: {
    fontSize: 18,
    color: "#26292A",
    marginBottom: 10
  },
  balanceAmountTextPositive: {
    fontSize: 12,
    color: "#12D790",
    textAlign: "right"
  },
  balanceAmountTextNegative: {
    fontSize: 12,
    color: "#EA4335",
    textAlign: "right"
  },
  borderWhite: {
    height: 1,
    marginHorizontal: 25,
    borderWidth: 1,
    borderColor: "#FFFFFF"
  },
  imageGraph: {
    marginHorizontal: 15,
    height: 226
  },
  graphImg: {
    resizeMode: "contain",
    width: "100%",
    height: 226
  },
  indicatorsSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 68,
    justifyContent: "space-around",
    paddingHorizontal: 10,
    marginTop: -30
  },
  blueCircle: {
    width: 12,
    height: 12,
    backgroundColor: "#3443CF",
    borderRadius: 100 / 2,
    marginTop: 4
  },
  greenCircle: {
    width: 12,
    height: 12,
    backgroundColor: "#41C174",
    borderRadius: 100 / 2,
    marginTop: 4
  },
  redCircle: {
    width: 12,
    height: 12,
    backgroundColor: "#F81506",
    borderRadius: 100 / 2,
    marginTop: 4
  },
  innerIndicator: {
    flexDirection: "row"
  },
  tabParent: {
    paddingHorizontal: 10,
    marginTop: -30,
    marginBottom: 10
  }
});

export default walletHomeScreen;
