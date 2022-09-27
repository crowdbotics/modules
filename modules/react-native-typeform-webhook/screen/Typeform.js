import React from "react";
// @ts-ignore
import TypeformEmbed from "react-native-typeform-embed";

const TypeForm = ({ route }) => {
  const URL = route.params.url.display;

  return (
    <TypeformEmbed
      url={URL}
      onSubmit={() => alert("Submitted!")}
    />
  );
};

export default TypeForm;
