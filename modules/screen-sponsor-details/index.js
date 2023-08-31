import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";

const SponsorDetails = () => {
  const [sponsor, setSponsor] = useState({});
  useEffect(() => {
    setSponsor({
      name: "Sponsor Name",
      location: "Location",
      email: "Email",
      phone: "Phone",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam feugiat tellus a mattis ornare. Fusce sit amet libero id est iaculis hendrerit in quis nibh. "
    });
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("./assets/sponsorImage.png")}
      />
      <View style={styles.body}>
        <Image
          style={styles.sliderIcon}
          source={require("./assets/sliderIcon.png")}
        />
        <Text style={styles.title}>{sponsor.name}</Text>
        <View style={styles.flexRow}>
          <Image
            style={styles.icon}
            source={require("./assets/locationIcon.png")}
          />
          <Text>{sponsor.location}</Text>
        </View>
        <View style={styles.flexRow}>
          <Image
            style={styles.icon}
            source={require("./assets/messageIcon.png")}
          />
          <Text>{sponsor.email}</Text>
        </View>
        <View style={styles.flexRow}>
          <Image
            style={styles.icon}
            source={require("./assets/callIcon.png")}
          />
          <Text>{sponsor.phone}</Text>
        </View>
        <Text style={styles.heading}>Sponsor info</Text>
        <Text style={styles.description}>{sponsor.description}</Text>
        <Button buttonText="Visit Website" style={styles.button} />
        <Pressable style={styles.roundButton}>
          <Image
            style={styles.roundButtonImage}
            source={require("./assets/giftIcon.png")}
          />
          <Text style={styles.roundButtonText}>Donate</Text>
        </Pressable>
      </View>
      <Footer
        images={[
          require("./assets/homeIconActive.png"),
          require("./assets/starIcon.png"),
          require("./assets/taskIcon.png"),
          require("./assets/mapIcon.png")
        ]}
        titles={["Home", "Sponsors", "Tasks", "Map"]}
        active={0}
        activeColor="#7C7C7C"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  image: {
    width: "100%",
    height: 200
  },
  sliderIcon: {
    alignSelf: "center",
    width: 50,
    resizeMode: "contain",
    marginBottom: 10
  },
  body: {
    paddingHorizontal: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 10
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 10
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#737373",
    textAlign: "justify"
  },
  button: {
    marginTop: 60
  },
  roundButton: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    position: "absolute",
    right: 20,
    top: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  roundButtonImage: {
    width: 20,
    height: 20,
    marginBottom: 2
  },
  roundButtonText: {
    color: "#fff",
    fontSize: 10
  }
});

export default SponsorDetails;

const Footer = (props) => {
  const generator = props.hideTitle ? props.images : props.titles;
  const bgColor = {
    backgroundColor: props.backgroundColor ? props.backgroundColor : "#C4C4C4"
  };
  const titleColor = {
    color: props.titleColor ? props.titleColor : "#fff"
  };
  const activeColor = {
    color: props.activeColor ? props.activeColor : "#000"
  };
  return (
    <View style={[footerStyles.footer, bgColor]}>
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
                titleColor,
                footerStyles.footerItemText,
                index === props.active ? activeColor : null
              ]}
            >
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
  }
});

const Button = (params) => {
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
          onPress={params.onPress}
        >
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
