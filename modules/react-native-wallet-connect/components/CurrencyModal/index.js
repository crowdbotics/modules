import React from "react";
import { View, Text, Modal, StyleSheet, FlatList } from "react-native";
import { currencyData } from "../../utils";
import Button from "../Button";
import CurrencyList from "../CurrencyList";

const CurrencyModal = ({ setModalVisible, modalVisible, onItemPress }) => {
  const renderItem = ({ item }) => (
    <CurrencyList data={item} setModalVisible={setModalVisible} modalVisible={modalVisible} onItemPress={onItemPress}/>
  );

  return (
    <Modal
      presentationStyle='overFullScreen'
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.modalView}>
        <Text style={styles.heading}>Currency</Text>
        <FlatList
        data={currencyData}
        renderItem={renderItem}
        keyExtractor={item => item.chainId}

        />
        <View style={{ width: 100 }}>
          <Button onPress={() => setModalVisible(false)}>Close</Button>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginBottom: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  heading: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    marginRight: 40
  }
});

export default CurrencyModal;
