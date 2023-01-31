import React, { useState, useEffect } from "react";
import { Image, Text, View } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import { styles, MAPBOX_TOKEN } from "./options";

MapboxGL.setAccessToken(MAPBOX_TOKEN);

const Maps = () => {
  const [defaultOrigin, setDefaultOrigin] = useState([78.9629, 20.5937]);
  const [destination, setDestination] = useState([74, 27]);
  const [polygon] = useState({ type: "Feature",
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
  }});
  const [route, setRoute] = useState( {
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

const updateRoute = (coords, origin) => {
if(origin){
  setDefaultOrigin(coords)
  setRoute({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            coords,
            destination
          ]
        }
      }
    ]
  })
} else{
  setDestination(coords)
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
            coords
          ]
        }
      }
    ]
  })
}
}


  const renderDestinationAnnotations = () => {
    return (
      <MapboxGL.PointAnnotation
        key="pointAnnotation"
        id="pointAnnotation"
        coordinate={destination}
        draggable={true}
        onDragEnd= {(coords) => {updateRoute(coords?.geometry?.coordinates)}}
      >
        <View
          style={{
            height: 30,
            width: 30,
            backgroundColor: "red",
            borderRadius: 50,
            borderColor: "#fff",
            borderWidth: 3,
          }}
        />
      </MapboxGL.PointAnnotation>
    );
  };


  return (
    <View style={styles.view}>
      <MapboxGL.MapView
        compassEnabled={true}
        style={styles.map}
        styleURL="mapbox://styles/fsouda/cldejl0dv007r01r04lobz2ll"
        localizeLabels={true}
        onPress={(coords) =>updateRoute(coords?.geometry?.coordinates, true)}
        compassPosition={styles.compassStyle}
      >
        <MapboxGL.Camera zoomLevel={4}
          centerCoordinate={defaultOrigin} />
        <MapboxGL.MarkerView id={"marker"} coordinate={defaultOrigin}>
          <View>
            <View style={styles.markerContainer}>
              <Text style={styles.text}></Text>
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

        <View>{renderDestinationAnnotations()}</View>
      </MapboxGL.MapView>

    </View>
  );
};

export default {
  title: "Mapbox Maps",
  navigator: Maps
};
