import React, { useEffect } from "react";
import "react-native-gesture-handler";
import Pubnub from "pubnub";
// @ts-ignore
import { PubNubProvider } from "pubnub-react";
import Navigator from "./Navigator";
import { useStore, uuid } from "./Store";
import { listener } from "./utils";
import options from "./options";
import { LogBox } from "react-native";
import { MenuProvider } from "react-native-popup-menu";

LogBox.ignoreLogs(["Setting a timer"]);

const client = new Pubnub({
  subscribeKey: options.PUBNUB_SUB,
  publishKey: options.PUBNUB_PUB,
  uuid,
  restore: true
});

const App = () => {
  const { state, dispatch } = useStore();
  useEffect(() => {
    const userIds = options.users.map((user) => {
      return user._id;
    });
    client.addListener(listener(state, dispatch));
    client.subscribe({
      channelGroups: [options.user._id, ...userIds],
      withPresence: true
    });
  }, []);

  return (
    <PubNubProvider client={client}>
      <MenuProvider>
        <Navigator />
      </MenuProvider>
    </PubNubProvider>
  );
};
export default {
  title: "Chat",
  navigator: App
};
