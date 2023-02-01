import React, { useState } from "react";
import { ActivityIndicator, Image, View, Text, TouchableOpacity } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import options from "./options";
import { renderDestinationAnnotations, renderPolygon, getOriginAddress, getDirections, toHoursAndMinutes, toMilesAndKM } from "./utils";
import { lineString as makeLineString } from "@turf/helpers";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
Icon.loadFont();

const { styles, mapStyleURL, MAPBOX_TOKEN, ORIGIN, POLYGON, MAP_SETTINGS } = options;

MapboxGL.setAccessToken(MAPBOX_TOKEN);

const Maps = () => {
  const [defaultOrigin, setDefaultOrigin] = useState(ORIGIN);
  const [destination, setDestination] = useState([]);
  const [firstRoute, setFirstRoute] = useState({});
  const [loading, setLoading] = useState(true);
  const [originTitle, setOriginTitle] = useState("");
  const [destinationTitle, setDestinationTitle] = useState("");
  const [startNavigation, setStartNavigation] = useState(false);
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [distance, setDistance] = useState({
    miles: 0,
    kilometers: 0
  });

  const fetchRoute = async (origin, destination) => {
    const res = await getDirections(origin, destination);
    const newRoute1 = makeLineString(res.routes[0].geometry.coordinates);
    setFirstRoute(newRoute1);
    const totalSeconds = res.routes[0].duration;
    const totalMeters = res.routes[0].distance;
    const durationRes = await toHoursAndMinutes(totalSeconds);
    const distanceRes = await toMilesAndKM(totalMeters);
    setDuration(durationRes);
    setDistance(distanceRes);
  };

  const handleStartNavigation = () => {
    setStartNavigation(!startNavigation);
  };

  const updateCoordinates = (coords) => {
    if (!startNavigation) {
      setDefaultOrigin(coords);
      // fetchRoute(coords?.geometry?.coordinates, destination)
      setOriginTitle("");
    } else {
      setDestination(coords);
      fetchRoute(defaultOrigin, coords);
      setOriginTitle("");
    }
  };

  return (
    <View style={styles.view}>
      {
        loading && <ActivityIndicator color={"#000"} />
      }
      <MapboxGL.MapView
        logoEnabled={MAP_SETTINGS.logoEnabled}
        zoomEnabled={MAP_SETTINGS.zoomEnabled}
        onDidFinishRenderingMapFully={() => setLoading(false)}
        zoomLevel={MAP_SETTINGS.zoomLevel}
        compassEnabled={MAP_SETTINGS.compassEnabled}
        style={styles.map}
        styleURL={mapStyleURL}
        localizeLabels={MAP_SETTINGS.localizeLabels}
        scaleBarEnabled={true}
        scaleBarPosition={{ top: 20, left: 18 }}
        onPress={(coords) => { updateCoordinates(coords?.geometry?.coordinates); }}
        compassPosition={styles.compassStyle}
      >
        <MapboxGL.Camera zoomLevel={MAP_SETTINGS.zoomLevel}
          centerCoordinate={defaultOrigin} />
        <MapboxGL.MarkerView id={"marker"} coordinate={defaultOrigin}>
          <View>
            <View style={styles.markerContainer}>
              {originTitle !== "" && <View style={styles.textContainer}>
                <Text style={styles.text}>{originTitle}</Text>
              </View>}
              <TouchableOpacity onPress={() => getOriginAddress(defaultOrigin, setOriginTitle)}>
                <Image
                  source={require("./pin.png")}
                  style={styles.markerImg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </MapboxGL.MarkerView>

        {Object.keys(firstRoute).length !== 0 && <MapboxGL.ShapeSource id="line1" shape={firstRoute}>
          <MapboxGL.LineLayer
            id="linelayer1"
            style={{ lineColor: "#CC0066", lineWidth: 10 }}
          />
        </MapboxGL.ShapeSource>}

        <View>{renderPolygon(POLYGON)}</View>
        <View>{destination.length > 0 && renderDestinationAnnotations(
          destination,
          destinationTitle,
          setDestinationTitle,
          getOriginAddress)}
        </View>
      </MapboxGL.MapView>

      <TouchableOpacity style={[styles.centeringButton, { bottom: 100, backgroundColor: startNavigation ? "#fff" : "#dcdee0" }]} onPress={handleStartNavigation}>
        <Icon name="near-me" style={styles.icon} />
      </TouchableOpacity>

      <View style={styles.bottomSheet}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 20 }}>
              <Image source={require("./car.png")} style={{ height: 30, width: 30, resizeMode: "contain" }} />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                {duration.hours} Hour, {duration.minutes} Minutes, {duration.seconds.toFixed(0)} Seconds
              </Text>
            </View>
          </View>
          <View style={{ marginTop: -20 }}>
            <Text style={{ color: "#fff", fontSize: 16 }}>{distance.kilometers.toFixed(2)} km | {distance.miles.toFixed(2)} mi</Text>
          </View>
        </View>
      </View>

    </View>
  );
};

export default {
  title: "Mapbox Maps",
  navigator: Maps
};
