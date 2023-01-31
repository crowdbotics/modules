import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import options from "./options"
import { renderDestinationAnnotations, renderPolygon, updateRoute, getAddress } from "./utils";
const { styles, mapStyleURL, MAPBOX_TOKEN, ORIGIN, DESTINATION, POLYGON, ROUTE, ORIGIN_TITLE, DESTINATION_TITLE } = options

MapboxGL.setAccessToken(MAPBOX_TOKEN);

const Maps = () => {
  const [defaultOrigin, setDefaultOrigin] = useState(ORIGIN);
  const [destination, setDestination] = useState(DESTINATION);
  const [originTitle, setOriginTitle] = useState(ORIGIN_TITLE);
  const [destinationTitle, setDestinationTitle] = useState(DESTINATION_TITLE);
  const [route, setRoute] = useState(ROUTE);



  const handleGetDestination = async (coords) =>{
    await updateRoute(
      coords,
      defaultOrigin,
      destination,
      false,
      setRoute,
      setDefaultOrigin,
      setDestination)

    await getAddress(coords, )
  }


  return (
    <View style={styles.view}>
      <MapboxGL.MapView
        logoEnabled={false}
        zoomEnabled={true}
        onDidFinishRenderingMapFully={() => setLoading(false)}
        zoomLevel={14}
        compassEnabled={true}
        style={styles.map}
        styleURL={mapStyleURL}
        localizeLabels={true}
        onPress={(coords) => updateRoute(
          coords?.geometry?.coordinates,
          defaultOrigin,
          destination,
          true,
          setRoute,
          setDefaultOrigin,
          setDestination)}
        compassPosition={styles.compassStyle}
      >
        <MapboxGL.Camera zoomLevel={5}
          centerCoordinate={defaultOrigin} />
        <MapboxGL.MarkerView id={"marker"} coordinate={defaultOrigin} draggable={true}>
          <View>
            <View style={styles.markerContainer}>
              <Text style={styles.text}>{}</Text>
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
        <View>{renderDestinationAnnotations(destination,handleGetDestination)}</View>
      </MapboxGL.MapView>

    </View>
  );
};

export default {
  title: "Mapbox Maps",
  navigator: Maps
};
