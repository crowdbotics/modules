import React from "react";

import Conversations from "./conversations";

export const ChatScreen = (props) => {
  const { navigation } = props;
  return (
    <Conversations navigation={navigation}/>
  );
};
