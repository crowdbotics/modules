import React from "react";
import {
  Text,
  View,
  StyleSheet, ScrollView, Image, Pressable, TextInput, TouchableNativeFeedback, FlatList
} from "react-native";

const TasksHome = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locContainer}>
          <Image source={require("./assets/loc.png")} style={styles.loc} />
          <Text style={styles.locText}>1077 Brown Bear Drive</Text>
        </View>
        <View style={styles.bellContainer}>
          <Image source={require("./assets/bell.png")} style={styles.bell} />
          <Image source={require("./assets/file.png")} style={styles.bell} />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.mr10}>I need help with</Text>
        <Input placeholder="Enter" />
      </View>

      <Text style={[styles.mr10, styles.btnText]}>To do List</Text>
      <View style={styles.textInput}>
        <Text style={styles.text} >List down what you need help with, and well connect you with takers.</Text>
        <Pressable style={styles.createBtn}>
          <Text style={styles.btnText}>+ Create List</Text>
        </Pressable>
      </View>

      <View style={[styles.header, styles.moreContainer]}>
        <Text style={styles.title}>Taskers Available</Text>
        <View style={[styles.bellContainer, styles.mb]}>
          <Text style={styles.moreText}>More</Text>
          <Image source={require("./assets/next.png")} style={styles.next} />
        </View>
      </View>
      <View style={styles.filterContainer}><TaskerFlatList /></View>
      <View style={styles.filterContainer}><TaskerFlatList /></View>

      <View style={styles.bottom}>
        <Image source={require("./assets/home.png")} style={styles.star} />
        <Image source={require("./assets/task.png")} style={styles.task} />
        <Image source={require("./assets/taskers.png")} style={styles.tasker} />
        <Image source={require("./assets/chat.png")} style={styles.chat} />
        <Image source={require("./assets/profile.png")} style={styles.profile} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 15
  },
  loc: { width: 14, height: 18, resizeMode: "contain", marginRight: 10 },
  bell: { width: 18, height: 18, resizeMode: "contain", marginRight: 10 },
  locText: { color: "#4A4A4A" },
  locContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  bellContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  inputContainer: {
    marginBottom: 15
  },
  mr10: {
    marginLeft: 25,
    marginBottom: 10,
    fontSize: 16
  },
  textInput: { borderWidth: 1, borderRadius: 10, borderColor: "#C4C4C4", marginBottom: 10, paddingHorizontal: 20, height: 130, marginHorizontal: 15, paddingVertical: 10, flexDirection: "column", justifyContent: "space-between" },
  createBtn: { padding: 10, borderWidth: 1, borderColor: "#000", borderRadius: 10, width: 105 },
  text: { color: "#8D8D8D" },
  btnText: { color: "#4A4A4A" },
  next: { height: 16, width: 8, resizeMode: "contain" },
  moreText: { fontSize: 20, marginRight: 10 },
  mb: { marginTop: -10, marginRight: 10 },
  moreContainer: { marginBottom: 0 },
  title: { fontSize: 16, color: "#4A4A4A", marginLeft: 10, marginBottom: 10 },
  bottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 20, paddingHorizontal: 20, backgroundColor: "#C4C4C4", height: 74, marginTop: 10 },
  star: { width: 35, height: 40, resizeMode: "contain" },
  task: { width: 28, height: 34, resizeMode: "contain" },
  chat: { width: 28, height: 38, resizeMode: "contain" },
  profile: { width: 38, height: 38, resizeMode: "contain" },
  tasker: { width: 68, height: 40, resizeMode: "contain" },
  filterContainer: {
    width: "100%",
    paddingLeft: 15
  }
});

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor="#000"
        editable={props.editable !== false}
      />
      {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const textStyles = StyleSheet.create({

  input: {
    backgroundColor: "#fff",
    height: 53,
    borderColor: "#C4C4C4",
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 15
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});

const TaskerFlatList = () => {
  const colors = ["#FCF1D6", "#F9D8D9", "#FFEEA3", "#60ECBD", "#D2E6FF"];

  const titleColor = ["#D9DADD", "#D9DADD", "#D9DADD", "#D9DADD"];

  const FILTERS = [{ id: 1, price: "$30-$71", taskName: "Task name" }, { id: 2, price: "$30-$71", taskName: "Task name" }, { id: 3, price: "$30-$71", taskName: "Task name" }];
  const ItemRender = ({ taskName, price, index }) => (
    <TouchableNativeFeedback>
    <View style={[styleSheet.item, { backgroundColor: colors[index % colors.length] }]} >
      <Text style={[styleSheet.itemText]}>{taskName}</Text>
      <View style={[styleSheet.titleText, { backgroundColor: titleColor[index % colors.length] }]}>
      <Text style={[styleSheet.name]} >Project cost:</Text>
      <Text style={[styleSheet.price]} >{price}</Text>
      </View>
    </View>
    </TouchableNativeFeedback>
  );

  const Separator = () => {
    return (
      <View
        style={{
          height: 100,
          width: 7,
          backgroundColor: "white"
        }}
      />
    );
  };

  return (

    <FlatList
      data={FILTERS}
      renderItem={({ item, index }) => <ItemRender price={item.price} index={index} taskName={item.taskName}/>}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={Separator}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styleSheet = StyleSheet.create({

  titleText: {
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 10,
    width: "100%",
    color: "#FFF",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },

  item: {
    backgroundColor: "#FCF1D6",
    width: 166,
    height: 185,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10
  },

  itemText: {
    bottom: 2,
    alignSelf: "flex-start",
    marginLeft: 10

  },
  name: { fontSize: 12 },
  price: { fontSize: 12, fontWeight: "bold" }

});
export default TasksHome;
