import React, { useEffect, useState, useContext } from "react";
import { Text, View, FlatList, Image } from "react-native";
import { OptionsContext } from "@options";
import { fetchNotifications } from "./store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const Notifications = () => {
  const options = useContext(OptionsContext);
  const { authToken, styles } = options;
  const [messages, setMessages] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const dispatch = useDispatch();

  const getNotifications = async () => {
    setRefresh(true);
    dispatch(fetchNotifications(authToken))
      .then(unwrapResult)
      .then(res => {
        setMessages(res);
        setRefresh(false);
      })
      .catch(e => {
        console.log(e);
        setRefresh(false);
      });
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const renderItem = ({ item }) => {
    const date = item?.created;
    const arr1 = date.split("T");
    const time = arr1[1].split(".");
    return (
            <View style={styles.walletCard}>
                <View style={styles.walletInner}>
                    <View style={styles.imgContainer}>
                        <Image
                            source={{ uri: item?.image || "https://img.freepik.com/premium-vector/message-app-icon-paper-cut-style-social-media-icons_505135-255.jpg?w=100" }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.walletCarder}>
                        <Text style={styles.eventName}>{item?.title}</Text>
                        <Text style={styles.eventType}>{item?.message}</Text>
                    </View>
                </View>
                <View style={styles.leftSection}>
                    <Text style={styles.view}>Date: {arr1[0]}</Text>
                    <Text style={styles.reject}>Time: {time[0]}</Text>
                </View>
            </View>
    );
  };

  return (
        <View>
            <Text
                style={styles.listStyle}
            >
                Notifications List
            </Text>

            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onRefresh={getNotifications}
                refreshing={refresh}
            />

        </View>
  );
};

export default Notifications;
