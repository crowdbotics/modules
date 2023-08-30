import React, { useEffect, useContext, useState } from "react";
import { WebView } from "react-native-webview";
import { OptionsContext } from "@options";

const TermsAndConditionsWebview = ({ url }) => {
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
  title: "Terms and Conditions WebView",
  navigator: TermsAndConditionsWebview
};
