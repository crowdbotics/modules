import React from "react";
import { View, StyleSheet } from "react-native";
import MapboxGL from "@rnmapbox/maps";

export const renderPolygon = (polygon) => {
  return (
        <MapboxGL.ShapeSource id="source" shape={polygon}>
        <MapboxGL.FillLayer id="fill" style={{ fillColor: "brown" }} />
        <MapboxGL.LineLayer
          id="line"
          style={{ lineColor: "white", lineWidth: 1 }}
        />
      </MapboxGL.ShapeSource>
  );
};

export const renderDestinationAnnotations = (destination, updateRoute, setDestination) => {
  return (
          <MapboxGL.PointAnnotation
            key="pointAnnotation"
            id="pointAnnotation"
            coordinate={destination}
            draggable={true}
            onDragEnd= {(coords) => {
              setDestination(coords?.geometry?.coordinates);
              updateRoute(coords?.geometry?.coordinates);
            }}
          >
            <View
              style={styles.dest}
            />
          </MapboxGL.PointAnnotation>
  );
};

const styles = StyleSheet.create({
  dest: {
    height: 30,
    width: 30,
    backgroundColor: "#800040",
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 2,
    alignSelf: "center"
  }
});
