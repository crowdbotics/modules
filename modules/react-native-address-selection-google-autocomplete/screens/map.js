import React, { useState, useContext } from "react";
import { View, Dimensions, LogBox } from "react-native";
import { OptionsContext } from "@options";
// @ts-ignore
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const Maps = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const { apiKey, autoCompleteStyles, styles } = options;

  const [mapRef, setMapRef] = useState(null);
  const [defaultOrigin, setDefaultOrigin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    title: "",
    description: ""
  });
  const [inputValue, setInputValue] = useState("");

  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE = defaultOrigin.latitude;
  const LONGITUDE = defaultOrigin.longitude;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const onMapPress = async (e) => {
    const coords = e.nativeEvent.coordinate;
    setDefaultOrigin({ ...defaultOrigin, latitude: coords.latitude, longitude: coords.longitude });
  };

  const getAddressHandle = (address) => {
    setInputValue("");
    const latitude = address.geometry.location.lat;
    const longitude = address.geometry.location.lng;
    setDefaultOrigin({ ...defaultOrigin, latitude: latitude, longitude: longitude });
    handleAnimate({ latitude: latitude, longitude: longitude });
  };

  const handleAnimate = (coords) => {
    mapRef.animateCamera({
      center: coords,
      pitch: 90
    });
  };

  LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

  const handleDragOrigin = async (e) => {
    const coords = e.nativeEvent.coordinate;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${apiKey}`;
    try {
      const resp = await fetch(url);
      const respJson = await resp.json();
      const address = respJson.results[0];
      const address2 = address.formatted_address;
      navigation.navigate("AutoComplete", { address });
      const [title, ...desc] = address2.split(",");
      const description = desc.join(",");
      setDefaultOrigin({ ...defaultOrigin, latitude: coords.latitude, longitude: coords.longitude, title: title, description: description });
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  return (
    <View style={[styles.view]}>
      <View style={{ zIndex: 1000, height: inputValue ? "100%" : 50 }}>
        <GooglePlacesAutocomplete
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
          draggable
          coordinate={{ latitude: defaultOrigin.latitude, longitude: defaultOrigin.longitude }}
          title={defaultOrigin?.title}
          description={defaultOrigin?.description}
          pinColor={null}
          onDragEnd={(e) => handleDragOrigin(e)}
        >
        </Marker>
      </MapView>
    </View>
  );
};

export default Maps;
