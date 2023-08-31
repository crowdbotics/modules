import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable
} from "react-native";

const DiagnoseResultsCritical = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>Step 4</Text>
          <Text style={styles.subHeading}>Results</Text>
          <Text style={styles.subHeading}>
            Your eligibility results are ready
          </Text>
        </View>
        <Image
          style={styles.image}
          source={require("./assets/criticalHealthIcon.png")}
        />
        <Button buttonText={"Critical"} color="#D70404" />
        <Text style={styles.warningText}>
          Call 911 now! Immediate medical attention is needed.
        </Text>
        <Text style={styles.descriptionText}>
          Tell the 911 operator if you have been in contact with someone with
          COVID-19 or if you have recently been to an area where COVID-19 is
          spreading.
        </Text>
      </ScrollView>
      <Footer
        titles={["Home", "Diagnose", "Stats", "Map"]}
        images={[
          require("./assets/homeIcon.png"),
          require("./assets/diagnoseIconActive.png"),
          require("./assets/statsIcon.png"),
          require("./assets/mapIcon.png")
        ]}
        active={1}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
    marginHorizontal: 20,
    paddingBottom: 20
  },
  title: {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 10,
    color: "#000"
  },
  subHeading: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 10
  },
  heading: {
    fontSize: 16,
    color: "#000",
    marginVertical: 10,
    textTransform: "uppercase"
  },
  image: {
    alignSelf: "center",
    marginTop: 50
  },
  warningText: {
    fontSize: 16,
    textAlign: "center",
    color: "#D70404",
    width: "70%",
    alignSelf: "center"
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#464D4E",
    width: "80%",
    alignSelf: "center",
    marginTop: 30
  }
});

export default DiagnoseResultsCritical;

const Footer = props => {
  const generator = props.hideTitle ? props.images : props.titles;
  return (
    <View style={footerStyles.footer}>
      {generator.map((title, index) => (
        <View style={footerStyles.footerItem} key={index}>
          <Image
            style={footerStyles.footerImage}
            source={props.images[index]}
          />
          {props.hideTitle
            ? null
            : (
            <Text
              style={[
                footerStyles.footerItemText,
                index === props.active ? footerStyles.active : null
              ]}>
              {title}
            </Text>
              )}
        </View>
      ))}
    </View>
  );
};

const footerStyles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#C4C4C4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  footerItemText: {
    fontSize: 13,
    color: "#fff",
    marginTop: 5
  },
  footerImage: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  active: {
    color: "#000"
  }
});
const Button = params => {
  const backgroundColor = params.color ? params.color : "#000";
  const textColor = params.textColor ? params.textColor : "#fff";
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : backgroundColor,
    borderColor: params.outline ? backgroundColor : "#fff",
    borderWidth: 1
  };
  const btnText = {
    color: params.outline ? "#000" : textColor
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
