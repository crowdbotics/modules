import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable
} from "react-native";

const DiagnoseUndertaking = () => {
  const [undertaking1, setUndertaking1] = useState("");
  const [undertaking2, setUndertaking2] = useState("");
  const [undertaking3, setUndertaking3] = useState("");
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    setUndertaking1(
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed qui."
    );
    setUndertaking2(
      "Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non vnumquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. "
    );
    setUndertaking3(
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam.Corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur."
    );
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.body}>
        <Text style={styles.title}>Step 1</Text>
        <Text style={styles.subHeading}>
          Review and sign authorization form
        </Text>
        <Text style={styles.undertakingText}>{undertaking1}</Text>
        <Text style={styles.undertakingText}>{undertaking2}</Text>
        <Text style={styles.undertakingText}>{undertaking3}</Text>
        <View style={styles.confirmationContainer}>
          <Checkbox value={confirm} setValue={x => setConfirm(x)} />
          <Text style={styles.confirmationText}>
            I confirm I am at least 18 years old and have read and understood
            the information provided
          </Text>
        </View>
        <Button buttonText="Next" />
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
  body: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 60
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
  undertakingText: {
    textAlign: "justify",
    fontSize: 16,
    marginVertical: 10,
    color: "#464D4E"
  },
  confirmationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "space-between"
  },
  confirmationText: {
    fontSize: 14,
    color: "#464D4E",
    marginLeft: 10
  }
});

export default DiagnoseUndertaking;
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
    borderColor: params.outline ? backgroundColor : null,
    borderWidth: params.outline ? 1 : 0
  };
  const btnText = {
    color: params.outline ? "#000" : textColor
  };
  return (
    <View style={buttonStyles.btnContainer}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle, params.style]}
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
    paddingHorizontal: 40,
    justifyContent: "center",
    marginVertical: 20
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    width: "100%",
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

const Checkbox = props => {
  return (
    <Pressable
      onPress={() => {
        props.setValue(!props.value);
      }}>
      <Image
        source={
          props.value
            ? require("./assets/checkboxIconActive.png")
            : require("./assets/checkboxIcon.png")
        }
        style={checkboxStyles.checkbox}
      />
    </Pressable>
  );
};

const checkboxStyles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20
  }
});
