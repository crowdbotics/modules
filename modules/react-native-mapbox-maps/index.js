import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
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
import carImg from "./assets/car.png";
import pinImg from "./assets/pin.png";

Icon.loadFont();
const carImgUri = Image.resolveAssetSource(carImg).uri;
const pinImgUri = Image.resolveAssetSource(pinImg).uri;
const { styles, mapStyleURL, MAPBOX_TOKEN, ORIGIN, POLYGON, MAP_SETTINGS } =
  options;

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

  const updateCoordinates = coords => {
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
  };
  useEffect(() => {
    handleGetMarkedCoords();
  }, []);

  const changeProfile = async profile => {
    await fetchRoute(defaultOrigin, destination, profile);
    setProfile(profile);
  };

  const handleGetOriginAddress = async (origin, setTitle) => {
    const res = await getOriginAddress(origin);
    const address = res.results[0].formatted_address;
    const [title, ...desc] = address.split(" ");
    const description = desc.join(" ");
    console.log(title);
    setTitle(description);
  };

  return (
    <View style={styles.view}>
      {loading && <ActivityIndicator color={"#000"} />}
      <MapboxGL.MapView
        logoEnabled={MAP_SETTINGS.logoEnabled}
        zoomEnabled={MAP_SETTINGS.zoomEnabled}
        onDidFinishRenderingMapFully={() => setLoading(false)}
        zoomLevel={MAP_SETTINGS.zoomLevel}
        compassEnabled={MAP_SETTINGS.compassEnabled}
        style={styles.map}
        styleURL={mapStyleURL}
        localizeLabels={MAP_SETTINGS.localizeLabels}
        onPress={coords => {
          updateCoordinates(coords?.geometry?.coordinates);
        }}
        compassPosition={styles.compassStyle}
      >
        <MapboxGL.Camera zoomLevel={12} centerCoordinate={defaultOrigin} />
        <MapboxGL.MarkerView id={"marker"} coordinate={defaultOrigin}>
          <View>
            <View style={styles.markerContainer}>
              {originTitle !== "" && (
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{originTitle}</Text>
                </View>
              )}
              <TouchableOpacity
                onPress={() =>
                  handleGetOriginAddress(defaultOrigin, setOriginTitle)
                }
              >
                <Image source={{ uri: pinImgUri }} style={styles.markerImg} />
              </TouchableOpacity>
            </View>
          </View>
        </MapboxGL.MarkerView>

        <Routes firstRoute={firstRoute} secondRoute={secondRoute} isToggleOn={isToggleOn}/>

        {Object.keys(centerdPolygon).length !== 0 && (
          <Polygon centerdPolygon={centerdPolygon} />
        )}

        <View>{renderPolygon(POLYGON)}</View>
        <View>
          {destination.length > 0 &&
            renderDestinationAnnotations(
              destination,
              destinationTitle,
              setDestinationTitle,
              handleGetOriginAddress
            )}
        </View>
        <View>{renderMarkedArea()}</View>
      </MapboxGL.MapView>

      <TouchableOpacity
        style={[
          styles.centeringButton,
          { backgroundColor: startNavigation ? "#fff" : "#dcdee0" }
        ]}
        onPress={handleStartNavigation}
      >
        <Icon name="near-me" style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.topContainer}>
        {Object.keys(secondRoute).length !== 0 && (
          <ToggleRoutes isToggleOn={isToggleOn} setIsToggleOn={setIsToggleOn} />
        )}

        {destination.length !== 0 && startNavigation && (
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={() => changeProfile("driving")}
              style={[
                styles.profileIco,
                { backgroundColor: profile === "driving" ? "#00CED1" : "#fff" }
              ]}
            >
              <Icon name="car" style={styles.icon2} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeProfile("cycling")}
              style={[
                styles.profileIco,
                { backgroundColor: profile === "cycling" ? "#00CED1" : "#fff" }
              ]}
            >
              <Icon name="bicycle" style={styles.icon2} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeProfile("walking")}
              style={[
                styles.profileIco,
                { backgroundColor: profile === "walking" ? "#00CED1" : "#fff" }
              ]}
            >
              <Icon name="walk" style={styles.icon2} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <BottomSheet duration={duration} distance={distance} />
    </View>
  );
};

export default {
  title: "Mapbox Maps",
  navigator: Maps
};

const ToggleRoutes = ({ isToggleOn, setIsToggleOn }) => {
  return (
    <View style={toggleStyles.toggleContainer}>
      <View style={toggleStyles.toggleSubContainer}>
        <Text style={toggleStyles.routeText}>R1</Text>
        <SwitchToggle
          switchOn={isToggleOn}
          onPress={() => setIsToggleOn(!isToggleOn)}
          circleColorOn={"#00CED1"}
          circleColorOff={"#00CED1"}
          backgroundColorOff={"#008080"}
          backgroundColorOn={"#008080"}
          containerStyle={toggleStyles.toggleCustom}
          circleStyle={toggleStyles.toggleCircle}
        />
        <Text style={toggleStyles.routeText}>R2</Text>
      </View>
    </View>
  );
};

const toggleStyles = StyleSheet.create({
  toggleContainer: { flexDirection: "row", padding: 10 },
  toggleSubContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  routeText: { color: "#40E0D0", fontSize: 16, fontWeight: "bold" },
  toggleCustom: {
    width: 70,
    height: 30,
    borderRadius: 25,
    padding: 5,
    marginHorizontal: 10
  },
  toggleCircle: {
    width: 25,
    height: 25,
    borderRadius: 20
  }
});

const BottomSheet = ({ duration, distance }) => {
  return (
    <View style={bottomStyles.bottomSheet}>
      <View style={bottomStyles.bottomContainer}>
        <View style={bottomStyles.row}>
          <View style={bottomStyles.profileIcon}>
            <Image source={{ uri: carImgUri }} style={bottomStyles.iconImg} />
          </View>
          <View style={bottomStyles.ml}>
            <Text style={bottomStyles.duration}>
              {duration.hours} Hour, {duration.minutes} Minutes,{" "}
              {duration.seconds.toFixed(0)} Seconds
            </Text>
          </View>
        </View>
        <View style={bottomStyles.mt}>
          <Text style={bottomStyles.distance}>
            {distance.kilometers.toFixed(2)} km | {distance.miles.toFixed(2)} mi
          </Text>
        </View>
      </View>
    </View>
  );
};

const bottomStyles = StyleSheet.create({
  bottomSheet: {
    paddingTop: 10,
    backgroundColor: "#000",
    opacity: 0.8,
    position: "absolute",
    padding: 8,
    bottom: 0,
    width: "100%"
  },
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    flexDirection: "row"
  },
  profileIcon: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20
  },
  iconImg: {
    height: 30,
    width: 30,
    resizeMode: "contain"
  },
  ml: {
    marginLeft: 20
  },
  duration: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },
  mt: {
    marginTop: -20
  },
  distance: {
    color: "#fff",
    fontSize: 16
  }
});

const Polygon = ({ centerdPolygon }) => {
  return (
    <MapboxGL.ShapeSource id="line2" shape={centerdPolygon}>
      <MapboxGL.FillLayer id="fillCentered" style={{ fillColor: "#54278f" }} />
      <MapboxGL.LineLayer
        id="linelayer2"
        style={{ lineColor: "#CC0066", lineWidth: 2 }}
      />
    </MapboxGL.ShapeSource>
  );
};

const Routes = ({ firstRoute, secondRoute, isToggleOn }) => {
  return (
    <>
      {Object.keys(firstRoute).length !== 0 && !isToggleOn && (
        <MapboxGL.ShapeSource id="line1" shape={firstRoute}>
          <MapboxGL.LineLayer
            id="linelayer1"
            style={{ lineColor: "#CC0066", lineWidth: 10 }}
          />
        </MapboxGL.ShapeSource>
      )}
      {Object.keys(secondRoute).length !== 0 && isToggleOn && (
        <MapboxGL.ShapeSource id="line3" shape={secondRoute}>
          <MapboxGL.LineLayer
            id="linelayer3"
            style={{ lineColor: "#4682B4", lineWidth: 10 }}
          />
        </MapboxGL.ShapeSource>
      )}
    </>
  );
};
