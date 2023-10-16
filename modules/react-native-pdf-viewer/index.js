import React, { useContext, useState } from "react";
import { Alert, View } from "react-native";
import { OptionsContext } from "@options";
import PropTypes from "prop-types";
import PDFView from "react-native-view-pdf";
import Loader from "./Loader";
const PdfViewer = ({
  fadeInDuration,
  onError,
  onLoad,
  onPageChanged,
  onScrolled,
  enableAnnotations,
  resources = {},
  resourceType = ""
}) => {
  const [loading, setLoading] = useState(true);
  const options = useContext(OptionsContext);
  const { styles } = options;

  const loadedHandle = () => {
    setLoading(false);
  };

  const handlePageChnaged = () => {};
  const handleScrolled = () => {};

  const handleError = error => {
    Alert.alert(
      "Loading Failed!",
      "Please double check you have provided the right url for the PDF file"
    );
    if (onError) {
      onError(error);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Loader message={"Loading..."} />}
      <PDFView
        fadeInDuration={fadeInDuration || options.fadeInDuration}
        style={styles.pdf}
        resource={
          resources[resourceType] || options.resources[options.resourceType]
        }
        resourceType={resourceType || options.resourceType}
        onLoad={onLoad || loadedHandle}
        onError={handleError}
        enableAnnotations={enableAnnotations || true}
        onPageChanged={onPageChanged || handlePageChnaged}
        onScrolled={onScrolled || handleScrolled}
      />
    </View>
  );
};

PdfViewer.propTypes = {
  resources: PropTypes.object,
  onScrolled: PropTypes.func,
  onPageChanged: PropTypes.func,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  enableAnnotations: PropTypes.bool,
  resourceType: PropTypes.string,
  fadeInDuration: PropTypes.number
};

export default {
  title: "PDF Viewer",
  navigator: PdfViewer
};
