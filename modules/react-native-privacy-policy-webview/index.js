import React, { useEffect, useContext, useState } from "react";
import { WebView } from "react-native-webview";
import { OptionsContext } from "@options";

const PrivacyPolicyWebview = ({ navigation, url }) => {
  const [uri, setUri] = useState("");
  const options = useContext(OptionsContext);

  const handleUri = () => {
    if (options.url) {
      setUri(options.url);
    } else {
      setUri(url);
    }
  };
  useEffect(() => {
    handleUri();
  }, []);

  return (
    <WebView source={{ uri: uri }} />
  );
};

export default {
  title: "Privacy Policy WebView",
  navigator: PrivacyPolicyWebview
};
