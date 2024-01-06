import { React } from "react";
import { WebView } from "react-native-webview";

const Webview = ({ uri }) => {
  return (
    <WebView
      source={{ uri: "https://www.crowdbotics.com/app-builder-signup" }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      style={{ flex: 1 }} />
  );
};

export default Webview;
