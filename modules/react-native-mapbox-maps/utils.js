import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import options from "./options";
import pinImg from "./assets/pin.png";

const pinImgUri = Image.resolveAssetSource(pinImg).uri;

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

export const renderDestinationAnnotations = (
  destination,
  destinationTitle,
  setDestinationTitle,
  handleGetOriginAddress) => {
  return (
    <MapboxGL.MarkerView id={"marker2"} coordinate={destination}>
      <View>
        <View style={styles.markerContainer}>
          {destinationTitle !== "" && <View style={styles.textContainer}>
            <Text style={styles.text}>{destinationTitle}</Text>
          </View>}
          <TouchableOpacity onPress={() => handleGetOriginAddress(destination, setDestinationTitle)}>
            <Image
              source={{ uri: pinImgUri }}
              style={styles.markerImg}
            />
          </TouchableOpacity>
        </View>
      </View>
    </MapboxGL.MarkerView>
  );
};

export const renderMarkedArea = () => {
  return (
    <MapboxGL.MarkerView id={"marker2"} coordinate={options.MARKED_CENTERED}>
      <View>
        <View style={styles.markerContainer}>
          <Image
            source={{ uri: pinImgUri }}
            style={styles.markerImg}
          />
        </View>
      </View>
    </MapboxGL.MarkerView>
  );
};

export const getOriginAddress = async (latlng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng[1]},${latlng[0]}&key=${options.GOOGLE_API_KEY}`;
  try {
    const resp = await fetch(url);
    const respJson = await resp.json();
    return respJson;
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export const getDirections = async (origin, destination, profile) => {
  const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${origin[0]}%2C${origin[1]}%3B${destination[0]}%2C${destination[1]}?alternatives=true&annotations=speed&banner_instructions=true&geometries=geojson&language=en&overview=full&steps=true&voice_instructions=true&voice_units=imperial&access_token=${options.MAPBOX_TOKEN}`;
  try {
    const resp = await fetch(url);
    const respJson = await resp.json();
    return respJson;
  } catch (error) {
    Alert.alert("Error: ", error.message);
  }
};

export const getMarkedArea = async (profile) => {
  const url = `https://api.mapbox.com/isochrone/v1/mapbox/${profile}/${options.MARKED_CENTERED[0]}%2C${options.MARKED_CENTERED[1]}?contours_meters=2000&&polygons=true&denoise=0.7&generalize=0&access_token=${options.MAPBOX_TOKEN}`;
  try {
    const resp = await fetch(url);
    const respJson = await resp.json();
    return respJson;
  } catch (error) {
    Alert.alert("Error: ", error.message);
  }
};

export const getMatchingRoute = async (coords, profile) => {
  const coordinates = coords.join(";");
  const radius = coords.map(() => 40);
  const radiuses = radius.join(";");
  const url = `https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?radiuses=${radiuses}&annotations=maxspeed&overview=full&geometries=geojson&access_token=${options.MAPBOX_TOKEN}`;
  try {
    const resp = await fetch(url);
    const respJson = await resp.json();
    return respJson;
  } catch (error) {
    Alert.alert("Error: ", error.message);
  }
};

export const toHoursAndMinutes = (totalSeconds) => {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes, seconds };
};

export const toMilesAndKM = (meters) => {
  const miles = meters * 0.000621371192;
  const kilometers = meters / 1000;
  return { miles, kilometers };
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
  },
  markerContainer: {
    alignItems: "center",
    width: 130,
    backgroundColor: "transparent",
    height: 70
  },
  textContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    color: "#d11d53",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 5,
    flex: 1,
    backgroundColor: "transparent"
  },
  markerImg: {
    width: 30,
    height: 40,
    resizeMode: "cover"
  }
});
