import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, View, Text, TouchableOpacity } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import MapboxGL from "@rnmapbox/maps";
import options from "./options";
import {
  renderDestinationAnnotations,
  renderPolygon,
  getOriginAddress,
  getDirections,
  renderMarkedArea,
  toHoursAndMinutes,
  toMilesAndKM,
  getMatchingRoute,
  getMarkedArea
} from "./utils";
import { lineString as makeLineString } from "@turf/helpers";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import carImg  from "./assets/car.png"
import pinImg  from "./assets/pin.png"

Icon.loadFont();
const carImgUri = Image.resolveAssetSource(carImg).uri
const pinImgUri = Image.resolveAssetSource(pinImg).uri
const { styles, mapStyleURL, MAPBOX_TOKEN, ORIGIN, POLYGON, MAP_SETTINGS } = options;

MapboxGL.setAccessToken(MAPBOX_TOKEN);

const Maps = () => {
  const [defaultOrigin, setDefaultOrigin] = useState(ORIGIN);
  const [destination, setDestination] = useState([]);
  const [firstRoute, setFirstRoute] = useState({});
  const [secondRoute, setSecondRoute] = useState({});
  const [loading, setLoading] = useState(true);
  const [originTitle, setOriginTitle] = useState("");
  const [destinationTitle, setDestinationTitle] = useState("");
  const [centerdPolygon, setCenterdPolygon] = useState({});
  const [startNavigation, setStartNavigation] = useState(false);
  const [profile, setProfile] = useState("driving");
  const [isToggleOn, setIsToggleOn] = useState(false);

  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [distance, setDistance] = useState({
    miles: 0,
    kilometers: 0
  });

  const fetchRoute = async (origin, destination, profile) => {
    const res = await getDirections(origin, destination, profile);
    const newRoute1 = makeLineString(res.routes[0].geometry.coordinates);
    setFirstRoute(newRoute1);
    const totalSeconds = res.routes[0].duration;
    const totalMeters = res.routes[0].distance;
    const durationRes = await toHoursAndMinutes(totalSeconds);
    const distanceRes = await toMilesAndKM(totalMeters);
    setDuration(durationRes);
    setDistance(distanceRes);
    const coords = res.routes[0].geometry.coordinates;
    const mapRoutes = await getMatchingRoute(coords, profile);
    if (mapRoutes.code === "Ok") {
      setSecondRoute(mapRoutes?.matchings[0]?.geometry);
    } else {
      setIsToggleOn(false);
      setSecondRoute({});
    }
  };

  const handleStartNavigation = () => {
    setStartNavigation(!startNavigation);
  };

  const updateCoordinates = (coords) => {
    if (!startNavigation) {
      setDefaultOrigin(coords);
      setOriginTitle("");
    } else {
      setDestination(coords);
      fetchRoute(defaultOrigin, coords, profile);
      setOriginTitle("");
    }
  };

  const handleGetMarkedCoords = async () => {
    const markedCoords = await getMarkedArea(profile);
    setCenterdPolygon(markedCoords);
  }
  useEffect(() => {
    handleGetMarkedCoords()
  }, []);

  const changeProfile = async (profile) => {
    await fetchRoute(defaultOrigin, destination, profile);
    setProfile(profile);
  };


 const handleGetOriginAddress = async (origin, setTitle) => {
    const res = await getOriginAddress(origin)
    const address = res.results[0].formatted_address;
    const [title, ...desc] = address.split(" ");
    const description = desc.join(" ");
    console.log(title);
    setTitle(description);
  }

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
        onPress={(coords) => { updateCoordinates(coords?.geometry?.coordinates); }}
        compassPosition={styles.compassStyle}
      >
        <MapboxGL.Camera zoomLevel={12}
          centerCoordinate={defaultOrigin} />
        <MapboxGL.MarkerView id={"marker"} coordinate={defaultOrigin}>
          <View>
            <View style={styles.markerContainer}>
              {originTitle !== "" && <View style={styles.textContainer}>
                <Text style={styles.text}>{originTitle}</Text>
              </View>}
              <TouchableOpacity onPress={() => handleGetOriginAddress(defaultOrigin, setOriginTitle)}>
                <Image
                  source={{uri: pinImgUri}}
                  style={styles.markerImg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </MapboxGL.MarkerView>

        {(Object.keys(firstRoute).length !== 0 && !on) && <MapboxGL.ShapeSource id="line1" shape={firstRoute}>
          <MapboxGL.LineLayer
            id="linelayer1"
            style={{ lineColor: "#CC0066", lineWidth: 10 }}
          />
        </MapboxGL.ShapeSource>}

        {(Object.keys(secondRoute).length !== 0 && on) && <MapboxGL.ShapeSource id="line3" shape={secondRoute}>
          <MapboxGL.LineLayer
            id="linelayer3"
            style={{ lineColor: "#4682B4", lineWidth: 10 }}
          />
        </MapboxGL.ShapeSource>}

        {Object.keys(centerdPolygon).length !== 0 && <MapboxGL.ShapeSource id="line2" shape={centerdPolygon}>
          <MapboxGL.FillLayer id="fillCentered" style={{ fillColor: "#54278f" }} />
          <MapboxGL.LineLayer
            id="linelayer2"
            style={{ lineColor: "#CC0066", lineWidth: 2 }}
          />
        </MapboxGL.ShapeSource>}

        <View>{renderPolygon(POLYGON)}</View>
        <View>{destination.length > 0 && renderDestinationAnnotations(
          destination,
          destinationTitle,
          setDestinationTitle,
          handleGetOriginAddress)}
        </View>
        <View>{renderMarkedArea()}</View>
      </MapboxGL.MapView>

      <TouchableOpacity style={[styles.centeringButton, { backgroundColor: startNavigation ? "#fff" : "#dcdee0" }]} onPress={handleStartNavigation}>
        <Icon name="near-me" style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.topContainer}>
        {Object.keys(secondRoute).length !== 0 && <View style={styles.toggleContainer}>
          <View style={styles.toggleSubContainer}>
            <Text style={styles.routeText}>R1</Text>
            <SwitchToggle
              switchOn={isToggleOn}
              onPress={() => setIsToggleOn(!isToggleOn)}
              circleColorOn={"#00CED1"}
              circleColorOff={"#00CED1"}
              backgroundColorOff={"#008080"}
              backgroundColorOn={"#008080"}
              containerStyle={styles.toggleCustom}
              circleStyle={styles.toggleCircle}
            />
            <Text style={styles.routeText}>R2</Text>
          </View>
        </View>}

        {(destination.length !== 0 && startNavigation) && <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => changeProfile("driving")} style={[styles.profileIco, { backgroundColor: profile === "driving" ? "#00CED1" : "#fff" }]}>
          <Icon name="car" style={styles.icon2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeProfile("cycling")} style={[styles.profileIco, { backgroundColor: profile === "cycling" ? "#00CED1" : "#fff" }]}>
          <Icon name="bicycle" style={styles.icon2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeProfile("walking")} style={[styles.profileIco, { backgroundColor: profile === "walking" ? "#00CED1" : "#fff" }]}>
          <Icon name="walk" style={styles.icon2} />
          </TouchableOpacity>
        </View>}

      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.bottomContainer}>
          <View style={styles.row}>
            <View style={styles.profileIcon}>
              <Image source={{uri: carImgUri}} style={styles.iconImg} />
            </View>
            <View style={styles.ml}>
              <Text style={styles.duration}>
                {duration.hours} Hour, {duration.minutes} Minutes, {duration.seconds.toFixed(0)} Seconds
              </Text>
            </View>
          </View>
          <View style={styles.mt}>
            <Text style={styles.distance}>{distance.kilometers.toFixed(2)} km | {distance.miles.toFixed(2)} mi</Text>
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
