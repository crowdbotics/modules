import React, { useState, useEffect } from "react";
import { Image, Text, View } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import { styles, MAPBOX_TOKEN } from "./options";

MapboxGL.setAccessToken(MAPBOX_TOKEN);

const Maps = () => {
  const [defaultOrigin, setDefaultOrigin] = useState([]);
  const [destination, setDestination] = useState([78.96529, 20.59337]);
  const [polygon, setPolygon] = useState({});

  const [route, setRoute] = useState({});

  useEffect(() => {
    setDefaultOrigin([78.9629, 20.5937]);
    setDestination([78.96529, 20.59337]);
    setPolygon({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [72.685547, 20.055931],
            [76.640625, 21.207458],
            [76.904297, 17.978733],
            [72.685547, 20.055931]
          ]
        ]
      }
    });
    setRoute({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              defaultOrigin,
              destination
            ]
          }
        }
      ]
    });
  }, []);

  return (
    <View style={styles.view}>
      <MapboxGL.MapView
        compassEnabled={true}
        style={styles.map}
        styleURL="mapbox://styles/fsouda/cldejl0dv007r01r04lobz2ll"
        localizeLabels={true}
        onPress={(coords) => setDefaultOrigin(coords?.geometry?.coordinates)}
        compassPosition={{ top: 30, right: 30 }}
      >
        <MapboxGL.Camera zoomLevel={4}
          centerCoordinate={defaultOrigin} />
        <MapboxGL.MarkerView id={"marker"} coordinate={defaultOrigin}>
          <View>
            <View style={styles.markerContainer}>
              <Text style={styles.text}>Bahawalpur</Text>
              <Image
                source={require("./pin.png")}
                style={styles.markerImg}
              />
            </View>
          </View>
        </MapboxGL.MarkerView>
        <MapboxGL.ShapeSource id="source" shape={polygon}>
          <MapboxGL.FillLayer id="fill" style={{ fillColor: "blue" }} />
          <MapboxGL.LineLayer
            id="line"
            style={{ lineColor: "red", lineWidth: 2 }}
          />
        </MapboxGL.ShapeSource>
        <MapboxGL.ShapeSource id="line1" shape={route}>
          <MapboxGL.LineLayer
            id="linelayer1"
            style={{ lineColor: "red", lineWidth: 5 }}
          />
        </MapboxGL.ShapeSource>

        <MapboxGL.PointAnnotation coordinate={destination} />
      </MapboxGL.MapView>

    </View>
  );
};

export default {
  title: "Mapbox Maps",
  navigator: Maps
};
