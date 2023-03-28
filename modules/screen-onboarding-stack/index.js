import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const OnboardingStack = () => {
  const [stack, setStack] = useState([]);
  const [stackIndex, setStackIndex] = useState(0);
  useEffect(() => {
    setStack([
      {
        title: "Sit luctus lectus felis consectetur id.",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At habitant metus, enim varius in. Morbi diam vel varius cras. ",
        image: require("./assets/stackImage1.png")
      },
      {
        title: "Lorem ipsum dolor sit amet, consectetur.",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At habitant metus, enim varius in. Morbi diam vel varius cras. ",
        image: require("./assets/stackImage2.png")
      },
      {
        title: "Habitant metus, enim varius in.",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At habitant metus, enim varius in. Morbi diam vel varius cras. ",
        image: require("./assets/stackImage1.png")
      }
    ]);
  }, []);
  const handleStackChange = direction => {
    if (direction === "next") {
      if (stackIndex < stack.length - 1) {
        setStackIndex(stackIndex + 1);
      }
    } else if (direction === "prev") {
      if (stackIndex > 0) {
        setStackIndex(stackIndex - 1);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={stack[stackIndex] && stack[stackIndex].image}
      />
      <Text style={styles.heading}>
        {stack[stackIndex] && stack[stackIndex].title}
      </Text>
      <Text style={styles.description}>
        {stack[stackIndex] && stack[stackIndex].description}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          backgroundColor="#DADADA"
          hideShadow
          style={[styles.button, styles.prevButton]}
          onPress={() => handleStackChange("prev")}>
          <View style={styles.flexRow}>
            <Image
              style={styles.btnIcon}
              source={require("./assets/leftArrowIcon.png")}
            />
            <Text style={styles.prevBtnText}>Prev</Text>
          </View>
        </Button>
        <View style={styles.stackIndexContainer}>
          {stack.map((item, index) => (
            <View
              style={[
                styles.stackIndex,
                index === stackIndex ? styles.activeStackIndex : null
              ]}
              key={index}
            />
          ))}
        </View>
        <Button
          buttonText={stackIndex === stack.length - 1 ? "Done" : "Next"}
          hideShadow
          style={[styles.button, styles.nextButton]}
          onPress={() => handleStackChange("next")}>
          <Image
            style={styles.btnIcon}
            source={require("./assets/rightArrowIcon.png")}
          />
        </Button>
      </View>
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
    height: 400,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30
  },
  heading: {
    fontSize: 24,
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 20,
    width: "70%"
  },
  description: {
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center",
    color: "#01041D",
    width: "70%"
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 20
  },
  btnIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 10
  },
  button: {
    height: 50,
    width: 100
  },
  prevBtnText: {
    color: "#9b9b9b",
    fontSize: 16,
    fontWeight: "bold"
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  prevButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingLeft: 10
  },
  nextButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingRight: 10
  },
  stackIndexContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  stackIndex: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#DADADA",
    marginHorizontal: 5
  },
  activeStackIndex: {
    backgroundColor: "#000"
  }
});

export default OnboardingStack;

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
    <View style={[buttonStyles.btnContainer]}>
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
