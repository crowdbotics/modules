import React, { useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import options from "./options";
import { renderDestinationAnnotations, renderPolygon } from "./utils";
const { styles, mapStyleURL, MAPBOX_TOKEN, ORIGIN, DESTINATION, POLYGON, ROUTE } = options;

MapboxGL.setAccessToken(MAPBOX_TOKEN);

const Maps = () => {
  const [defaultOrigin, setDefaultOrigin] = useState(ORIGIN);
  const [destination, setDestination] = useState(DESTINATION);
  const [route, setRoute] = useState(ROUTE);
  const [loading, setLoading] = useState(true);

  const updateRoute = (coords, origin) => {
    setRoute({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              origin ? coords : defaultOrigin,
              origin ? destination : coords
            ]
          }
        }
      ]
    });
  };

  return (
    <View style={styles.view}>
      {
        loading && <ActivityIndicator color={"#000"} />
      }
      <MapboxGL.MapView
        logoEnabled={false}
        zoomEnabled={true}
        onDidFinishRenderingMapFully={() => setLoading(false)}
        zoomLevel={14}
        compassEnabled={true}
        style={styles.map}
        styleURL={mapStyleURL}
        localizeLabels={true}
        onPress={(coords) => {
          updateRoute(coords?.geometry?.coordinates, true);
          setDefaultOrigin(coords?.geometry?.coordinates);
        }}
        compassPosition={styles.compassStyle}
      >
        <MapboxGL.Camera zoomLevel={5}
          centerCoordinate={defaultOrigin} />
        <MapboxGL.MarkerView id={"marker"} coordinate={defaultOrigin} draggable={true}>
          <View>
            <View style={styles.markerContainer}>
              <Image
                source={require("./pin.png")}
                style={styles.markerImg}
              />
            </View>
          </View>
        </MapboxGL.MarkerView>

        <MapboxGL.ShapeSource id="line1" shape={route}>
          <MapboxGL.LineLayer
            id="linelayer1"
            style={{ lineColor: "#E695B5", lineWidth: 5 }}
          />
        </MapboxGL.ShapeSource>

        <View>{renderPolygon(POLYGON)}</View>
        <View>{renderDestinationAnnotations(destination, updateRoute, setDestination)}</View>
      </MapboxGL.MapView>

    </View>
  );
};

export default {
  title: "Mapbox Maps",
  navigator: Maps
};
