import React, { useState, useEffect } from "react";
import { View, Dimensions, TouchableOpacity, Image } from "react-native";
import { styles, autoCompleteStyles } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
// @ts-ignore
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker } from "react-native-maps";
import PropTypes from "prop-types";

const Maps = ({ origin, enableDirections = true, showSearchInput = true, markerImage, originTitle, originDescription, apiKey, onNavigationStart, onNavigationError, getDistance, getDuration, markerColor, getDestinationAddress, strokeColor, strokeWidth, markerImageStyle = {}, searchInputStyle = {} }) => {
  const [mapRef, setMapRef] = useState(null);
  const [defaultOrigin, setDefaultOrigin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    title: "San Francisco",
    description: "San Francisco, officially the City and County of San Francisco"
  });
  const [inputValue, setInputValue] = useState("");
  const [destination, setDestination] = useState(null);
  const [isDirection, setIsDirection] = useState(false);
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE = defaultOrigin.latitude;
  const LONGITUDE = defaultOrigin.longitude;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  useEffect(() => {
    if (origin) {
      setDefaultOrigin({
        ...defaultOrigin,
        latitude: origin?.latitude,
        longitude: origin?.longitude,
        title: originTitle || "",
        description: originDescription || ""
      });
    }
  }, []);

  const onMapPress = async (e) => {
    const coords = e.nativeEvent.coordinate;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${apiKey}`;
    try {
      const resp = await fetch(url);
      const respJson = await resp.json();
      const address = respJson.results[0].formatted_address;
      const [title, ...desc] = address.split(",");
      const description = desc.join(",");
      if (isDirection) {
        setDestination({ latitude: coords.latitude, longitude: coords.longitude, title: title, description: description });
      } else {
        setDefaultOrigin({ ...defaultOrigin, latitude: coords.latitude, longitude: coords.longitude, title: title, description: description });
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const handleOnReady = (result) => {
    mapRef.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 20,
        bottom: height / 20,
        left: width / 20,
        top: height / 20
      }
    });
    if (getDistance) {
      getDistance(result.distance);
    }
    if (getDuration) {
      getDuration(result.duration);
    }
  };

  const handleDirections = () => {
    setIsDirection(!isDirection);
  };

  const getAddressHandle = (address) => {
    setInputValue("");
    const title = address.name;
    const description = address.formatted_address;
    const latitude = address.geometry.location.lat;
    const longitude = address.geometry.location.lng;
    if (isDirection) {
      setDestination({
        ...destination,
        latitude: latitude,
        longitude: longitude,
        title: title,
        description: description
      });
      if (getDestinationAddress) {
        getDestinationAddress({ address: description, location: address.geometry.location });
      }
    } else {
      setDefaultOrigin({
        ...defaultOrigin,
        latitude: latitude,
        longitude: longitude,
        title: title,
        description: description
      });
    }
    handleAnimate({ latitude: latitude, longitude: longitude });
  };

  const handleAnimate = (coords) => {
    mapRef.animateCamera({
      center: coords,
      pitch: 90
    });
  };

  const handleOnStart = (params) => {
    if (onNavigationStart) {
      onNavigationStart();
    }
    console.log("Routing started between: " + params.origin + " and " + params.destination);
  };

  const handleOnError = (errorMessage) => {
    if (onNavigationError) {
      onNavigationError();
    }
    console.log("GOT AN ERROR: ", errorMessage);
  };
  return (
    <View style={styles.view}>
      <View style={{ zIndex: 1000, height: inputValue ? "100%" : 50 }}>
        {
          showSearchInput && <GooglePlacesAutocomplete
            placeholder='Search location'
            minLength={2}
            autoFocus={false}
            returnKeyType={"default"}
            fetchDetails={true}
            textInputProps={{
              onChangeText: (text) => setInputValue(text)
            }}
            onPress={(data, details = null) => getAddressHandle(details)}
            styles={autoCompleteStyles}
            query={{
              key: apiKey,
              language: "en"
            }}
          />
        }
      </View>

      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
        ref={setMapRef}
        onPress={onMapPress}
        style={styles.map}
      >

        <Marker
          key={1}
          coordinate={{ latitude: defaultOrigin.latitude, longitude: defaultOrigin.longitude }}
          title={defaultOrigin?.title}
          description={defaultOrigin?.description}
          pinColor={markerColor || null}
        >
          {markerImage && (
            <Image
              source={{ uri: markerImage }}
              style={[styles.marker, markerImageStyle]}
            />
          )}
        </Marker>
        {destination && (
          <Marker
            key={2}
            coordinate={destination}
            title={destination?.title}
            description={destination?.description}
            pinColor={markerColor || null}
          >
            {markerImage && (
              <Image
                source={{ uri: markerImage }}
                style={[styles.marker, markerImageStyle]}
              />
            )}
          </Marker>
        )}
        {destination && <MapViewDirections
          origin={{ latitude: defaultOrigin.latitude, longitude: defaultOrigin.longitude }}
          waypoints={[
            { latitude: defaultOrigin.latitude, longitude: defaultOrigin.longitude },
            { latitude: destination?.latitude, longitude: destination?.longitude }
          ]}
          destination={{ latitude: destination?.latitude, longitude: destination?.longitude }}
          apikey={apiKey}
          strokeWidth={strokeWidth || 4}
          strokeColor={strokeColor || "hotpink"}
          optimizeWaypoints={true}
          onStart={(params) => handleOnStart(params)}
          onReady={(result) => handleOnReady(result)}
          onError={(errorMessage) => handleOnError(errorMessage)}
          resetOnChange={false}
        />}
      </MapView>
      {enableDirections && (
        <TouchableOpacity style={styles.directionsContainer} onPress={handleDirections}>
          <Icon name="directions" size={45} color={isDirection ? "#00f" : "#6495ED"} />
        </TouchableOpacity>
      )}
    </View>
  );
};

Maps.propTypes = {
  origin: PropTypes.object,
  originTitle: PropTypes.string,
  originDescription: PropTypes.string,
  enableDirections: PropTypes.bool,
  apiKey: PropTypes.string,
  onNavigationStart: PropTypes.func,
  onNavigationError: PropTypes.func,
  getDistance: PropTypes.func,
  getDuration: PropTypes.func,
  getDestinationAddress: PropTypes.func,
  showSearchInput: PropTypes.bool,
  searchInputStyle: PropTypes.object,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  markerColor: PropTypes.string,
  markerImage: PropTypes.string,
  markerImageStyle: PropTypes.object
};
export default {
  title: "Maps-v2",
  navigator: Maps
};
