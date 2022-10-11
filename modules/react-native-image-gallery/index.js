import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { getPhotos } from "./utils";

const ImageGallery = ({ first, assetType, after, groupTypes, groupName, mimeTypes, fromTime, toTime, include }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(async () => {
    const photos = await getPhotos(
      first,
      assetType,
      after,
      groupTypes,
      groupName,
      mimeTypes,
      fromTime,
      toTime,
      include
    );
    setPhotos(photos.edges);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {photos.map((p, i) => {
        return (
          <View style={styles.imageContainer} key={i}>
            <Image source={{ uri: p.node.image.uri }} style={styles.image} />
          </View>
        );
      })}
    </ScrollView>
  );
};

ImageGallery.propTypes = {
  first: PropTypes.number,
  assetType: PropTypes.string,
  after: PropTypes.string,
  groupTypes: PropTypes.string,
  groupName: PropTypes.string,
  mimeTypes: PropTypes.array,
  fromTime: PropTypes.number,
  toTime: PropTypes.number,
  include: PropTypes.array
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFF"
  },
  imageContainer: { height: 150, borderRadius: 10, marginVertical: 5 },
  image: { height: 150, width: "100%", borderRadius: 10 }
});

export default {
  title: "Image Gallery",
  navigator: ImageGallery
};
