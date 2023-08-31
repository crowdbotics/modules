import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  ScrollView
} from "react-native";

const RewardsHistory = () => {
  const [reward, setReward] = useState({});
  const [rewardsHistory, setRewardsHistory] = useState([]);
  useEffect(() => {
    setReward({
      name: "Reward name",
      image: require("./assets/image.png"),
      points: 2.5,
      rating: 4.4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa faucibus nisi egestas quis etiam nec feugiat. Scelerisque pellentesque at in accumsan cras tristique at id. At nullam lectus sapien nulla. At egestas cursus elit, tortor mattis gravida ornare proin ipsum. Duis purus turpis libero tristique dignissim."
    });
    setRewardsHistory([
      {
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        date: "June 18, 2022",
        time: "4:00 AM",
        points: 250
      },
      {
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        date: "June 18, 2022",
        time: "4:00 AM",
        points: 100
      },
      {
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        date: "June 18, 2022",
        time: "4:00 AM",
        points: 50
      },
      {
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        date: "June 18, 2022",
        time: "4:00 AM",
        points: 100
      },
      {
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        date: "June 18, 2022",
        time: "4:00 AM",
        points: 250
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.flexRow}>
            <Text style={styles.heading}>{reward.name}</Text>
            <View style={styles.flexRow}>
              <Image
                source={require("./assets/ratingImage.png")}
                style={styles.ratingImage}
              />
              <Text>{reward.rating}</Text>
            </View>
          </View>
          <ImageBackground
            style={styles.rewardImage}
            source={require("./assets/image.png")}>
            <Text style={styles.title}>My Points</Text>
            <Text style={styles.pointsText}>
              {reward.points && reward.points.toFixed(3)}
            </Text>
            <Button
              buttonText="Redeem Gift"
              style={styles.button}
              color="#12D790"
            />
            <Image
              source={require("./assets/medalIcon.png")}
              style={styles.medalIcon}
            />
          </ImageBackground>
          <Text style={styles.heading}>Description</Text>
          <Text style={styles.description}>{reward.description}</Text>
        </View>
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.heading}>History Reward</Text>
            <View style={styles.flexRow}>
              <Text style={styles.green}>Newest</Text>
              <Image
                source={require("./assets/dropdownIcon.png")}
                style={styles.dropdownIcon}
              />
            </View>
          </View>
          {rewardsHistory.map((item, index) => (
            <View style={styles.rewardContainer} key={index}>
              <View style={styles.rewardDetails}>
                <Text style={styles.rewardTitle}>{item.title}</Text>
                <Text style={styles.subText}>
                  {item.date} | {item.time}
                </Text>
              </View>
              <View style={styles.pointsContainer}>
                <Text style={styles.points}>+{item.points}</Text>
                <Text style={styles.subText}>Pts</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1"
  },
  header: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingVertical: 10
  },
  heading: {
    fontSize: 16
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  ratingImage: {
    width: 90,
    height: 15,
    resizeMode: "contain",
    marginRight: 10
  },
  rewardImage: {
    alignSelf: "center",
    width: 345,
    height: 170,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 10,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 0.3
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000"
  },
  pointsText: {
    fontSize: 34,
    fontWeight: "bold"
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    width: 120
  },
  medalIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    position: "absolute",
    right: 10,
    top: 10
  },
  description: {
    fontSize: 12,
    textAlign: "justify",
    marginTop: 10
  },
  historyContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f1f1f1"
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  green: {
    color: "#12D790"
  },
  dropdownIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    marginLeft: 10
  },
  rewardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  rewardDetails: {
    flex: 8
  },
  rewardTitle: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10
  },
  subText: {
    fontSize: 12,
    color: "#595959"
  },
  pointsContainer: {
    flex: 2,
    alignItems: "flex-end"
  },
  points: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#12D790"
  }
});

export default RewardsHistory;

const Button = params => {
  const backgroundColor = params.color || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.outlineColor || backgroundColor,
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
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 40,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
