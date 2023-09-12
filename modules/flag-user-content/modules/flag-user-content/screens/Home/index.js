import React, { useContext, useState, Fragment, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  TextInput
} from "react-native";
import { OptionsContext } from "@options";

import { useDispatch, useSelector } from "react-redux";
import { createReport, getChoices } from "../../store";

const Home = () => {
  const dispatch = useDispatch();
  // const { FLAG_TYPES } = useContext(OptionsContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalState, setModalState] = useState(1);
  const [reason, setReason] = useState("");

  const { entities } = useSelector(
    (state) => state?.FlagUserContent?.getChoices
  );
  console.log(entities);

  const onItemPress = (value, key) => {
    console.log("KEYYYY", key)
    if (value === "Others") {
      setModalState(2);
    } else {
      dispatch(
        createReport({
          model_name: "user",
          reported_id: 2,
          reason: key,
          other: ""
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getChoices());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.postHeader}>
          <Text style={styles.postTitle}>Image title</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.reportPostText}>Report Post</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
          }}
          style={styles.postImage}
        />
      </View>

      <Modal
        visible={modalVisible}
        backdropOpacity={0.7}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          {modalState === 1 ? (
            <Fragment>
              <Text style={styles.modalTitle}>Select a Reason</Text>
              <FlatList
                data={entities}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.reportItem}
                    onPress={() => onItemPress(item?.value, item?.id)}
                  >
                    <Text>{item?.value}</Text>
                  </TouchableOpacity>
                )}
              />
            </Fragment>
          ) : (
            <View>
              <TextInput value={reason} onChangeText={setReason} style={{}} />
            </View>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  reportPostText: { textDecorationLine: "underline" },
  postImage: { height: 350, width: 357, borderRadius: 10 },
  postTitle: { fontSize: 18, color: "#000" },
  postHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 20
  },
  mainView: {
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
      shadowOpacity: 0.29,
      shadowRadius: 4.65
    },
    elevation: 7
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },

  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginTop: 150,
    borderWidth: 3,
    marginHorizontal: 10
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  reportItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 5
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default Home;
