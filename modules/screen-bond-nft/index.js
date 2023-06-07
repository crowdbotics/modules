import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";

const BondNFT = () => {
  const [para1, setPara1] = useState("");
  const [para2, setPara2] = useState("");
  const [para3, setPara3] = useState("");
  useEffect(() => {
    setPara1(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus sem justo, leo quam posuere platea rhoncus aenean massa. Semper ullamcorper in sed sollicitudin suspendisse. Arcu in ipsum, accumsan, commodo nulla consequat lectus. Sed turpis proin nulla facilisis lobortis volutpat fermentum. Interdum gravida pretium, turpis ipsum. Libero auctor sem tempor sit sed vitae, integer mauris. Pharetra euismod mauris at quisque neque suspendisse id vel quisque."
    );
    setPara2(
      "Odio diam viverra arcu quam eget aliquam mus amet. Facilisis aliquet nunc iaculis arcu, egestas facilisis. Turpis nunc, vitae arcu luctus ipsum at placerat feugiat. Convallis ut tortor sodales sit ac massa, non risus arcu. Tellus auctor consequat cursus interdum duis netus nam. Ipsum, viverra in mus facilisi. Dolor, dolor elementum morbi et. Eleifend diam velit, ornare in commodo."
    );
    setPara3(
      "Sit consectetur pharetra tincidunt quam nunc. Sed ac arcu euismod vestibulum, nisl velit. Non nulla consequat aliquam cursus tincidunt dolor accumsan, augue. "
    );
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Conditions to bond</Text>
        <Text style={styles.bondText}>{para1}</Text>
        <Text style={styles.bondText}>{para2}</Text>
        <Text style={styles.bondText}>{para3}</Text>
        <View style={styles.button}>
          <Button buttonText={"Bond NFT"} />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold"
  },
  bondText: {
    textAlign: "justify",
    marginTop: 10
  },
  button: {
    marginTop: 150
  }
});

export default BondNFT;

const Button = (params) => {
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : "#000",
    borderColor: params.outline ? "#000" : "#fff",
    borderWidth: 1
  };
  const btnText = {
    color: params.outline ? "#000" : "#fff"
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
    paddingHorizontal: 20,
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
