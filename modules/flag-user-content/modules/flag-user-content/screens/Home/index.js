import React, { useContext, useState, Fragment, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  TextInput,
  Alert
} from "react-native";
import { OptionsContext } from "@options";
import { useDispatch, useSelector } from "react-redux";
import { createReport, getChoices } from "../../store";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { IMAGE_LINK, POST_ID, USER_ID, POST_TITLE, styles } =
    useContext(OptionsContext);
  const [reportModal, setReportModal] = useState(false);
  const [modalState, setModalState] = useState(1);
  const [reason, setReason] = useState("");
  const [blockUserModal, setBlockUserModal] = useState(false);

  // Get report choices from Redux store
  const { entities } = useSelector(
    (state) => state?.FlagUserContent?.getChoices
  );

  // Fetch report choices from backend when the component mounts
  useEffect(() => {
    dispatch(getChoices());
  }, []);

  // Report the post with predefined choices
  const onItemPress = (value, key) => {
    if (value === "Others") {
      setModalState(2);
    } else {
      dispatch(
        createReport({
          model_name: "user",
          reported_id: POST_ID,
          reason: key,
          other: ""
        })
      ).then(() => {
        setReportModal(false);
        setModalState(1);
        setBlockUserModal(true);
      });
    }
  };

  // Report post with other reason
  const onOtherReasonSubmit = () => {
    if (reason) {
      dispatch(
        createReport({
          model_name: "user",
          reported_id: POST_ID,
          reason: 10,
          other: reason
        })
      ).then(() => {
        setReportModal(false);
        setModalState(1);
        setReason("");
        setBlockUserModal(true);
      });
    } else {
      Alert.alert("Error", "Please write a reason to report this post.");
    }
  };

  // Find the reason id for block user
  const blockId = entities?.findIndex((item) => item?.value === "Block User");

  // Block the report owner
  const onBlockUser = () => {
    dispatch(
      createReport({
        model_name: "user",
        reported_id: USER_ID,
        reason: entities[blockId]?.id,
        other: ""
      })
    ).then(() => {
      setBlockUserModal(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.postHeader}>
          <Text style={styles.postTitle}>{POST_TITLE}</Text>
          <TouchableOpacity onPress={() => setReportModal(true)}>
            <Text style={styles.reportPostText}>Report Post</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{
            uri: IMAGE_LINK
          }}
          style={styles.postImage}
        />
      </View>

      <TouchableOpacity
        style={[styles.closeButton, { marginHorizontal: 25, marginTop: 20 }]}
        onPress={() => navigation.navigate("BlockedUser")}
      >
        <Text style={styles.closeButtonText}>Reported List</Text>
      </TouchableOpacity>

      {/* Report Modal */}
      <Modal
        visible={reportModal}
        backdropOpacity={0.8}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          {modalState === 1
            ? (
            <Fragment>
              <Text style={styles.modalTitle}>Select a Reason</Text>
              <FlatList
                data={entities.filter((item) => item.value !== "Block User")}
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
              )
            : (
            <View>
              <Text style={styles.modalTitle}>Write your reason</Text>
              <TextInput
                value={reason}
                onChangeText={setReason}
                textAlignVertical="top"
                multiline
                style={styles.reasonInput}
              />
            </View>
              )}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={onOtherReasonSubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setReportModal(false);
              setModalState(1);
            }}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Block User Modal */}
      <Modal
        visible={blockUserModal}
        backdropOpacity={0.8}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Block post owner?</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.yesButton} onPress={onBlockUser}>
              <Text style={styles.yesButtonText}>YES</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.noButton}
              onPress={() => setBlockUserModal(false)}
            >
              <Text style={styles.noButtonText}>NO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
