import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Switch,
  ScrollView,
  Pressable
} from "react-native";

const NFTBondConditions = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Conditions to bond</Text>
        <View style={styles.itemContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.itemHeading}>Imperdiet lorem.</Text>
            <Image
              source={require("./assets/infoIcon.png")}
              style={styles.infoIcon}
            />
          </View>
          <BulletText
            text="Lorem ipsum dolor sit amet, consectetur. "
            textStyle={styles.bulletText}
          />
          <BulletText
            text="Lorem ipsum dolor sit amet, consectetur. "
            textStyle={styles.bulletText}
          />
          <BulletText
            text="Lorem ipsum dolor sit amet, consectetur. "
            textStyle={styles.bulletText}
          />
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.itemHeading}>Eleifend morbi et.</Text>
            <Image
              source={require("./assets/infoIcon.png")}
              style={styles.infoIcon}
            />
          </View>
          <BulletText
            text="Lorem ipsum dolor sit amet, consectetur. "
            textStyle={styles.bulletText}
          />
          <BulletText
            text="Lorem ipsum dolor sit amet, consectetur. "
            textStyle={styles.bulletText}
          />
          <BulletText
            text="Lorem ipsum dolor sit amet, consectetur. "
            textStyle={styles.bulletText}
          />
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.itemHeading}>Sed purus diam gravida.</Text>
            <Text style={styles.subText}>20/03/2022</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.itemHeading}>Leo nunc faucibus nunc.</Text>
            <Text style={styles.subText}>20/11/2022</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.itemHeading}>Pellentesque etiam duis.</Text>
          </View>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Montes,
            morbi id pulvinar faucibus laoreet praesent nisi.
          </Text>
          <View style={styles.flexRow}>
            <Text style={styles.itemHeading}>Pellentesque etiam duis.</Text>
            <Switch
              value={isEnabled}
              onValueChange={() => setIsEnabled(!isEnabled)}
              trackColor={{ false: "#e5e5e5", true: "#e5e5e5" }}
              thumbColor={isEnabled ? "#000" : "#000"}
              style={styles.switch}
            />
          </View>
        </View>
        <Button buttonText="Bond NFT" style={styles.button} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20
  },
  itemContainer: {
    padding: 20,
    backgroundColor: "#F1F1F1",
    marginBottom: 10
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5
  },
  infoIcon: {
    width: 20,
    height: 20
  },
  itemHeading: {
    fontSize: 14,
    fontWeight: "bold"
  },
  subText: {
    fontSize: 12,
    color: "#7c7c7c"
  },
  bulletText: {
    fontSize: 12,
    color: "#7C7C7C"
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }]
  },
  description: {
    fontSize: 14,
    marginVertical: 10
  },
  button: {
    marginVertical: 20,
    marginHorizontal: 40
  }
});

export default NFTBondConditions;

const BulletText = props => {
  let bulletStyle = null;
  switch (props.type) {
    default:
      bulletStyle = {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: "#000",
        marginRight: 10
      };
      break;
  }
  return (
    <View style={bulletTextStyles.bulletContainer}>
      <View style={bulletStyle} />
      <Text style={[bulletTextStyles.bulletText, props.textStyle]}>
        {props.text}
      </Text>
    </View>
  );
};
const bulletTextStyles = StyleSheet.create({
  bulletContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginVertical: 2
  },
  bulletText: {
    fontSize: 12
  }
});
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
