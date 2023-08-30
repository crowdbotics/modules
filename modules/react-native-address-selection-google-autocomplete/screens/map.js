import React, { useState, useContext, useEffect } from "react";
import { View, LogBox, Image, TouchableOpacity } from "react-native";
import { OptionsContext } from "@options";
// @ts-ignore
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/AntDesign";

const Maps = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const { apiKey, autoCompleteStyles, styles, settings } = options;

  const [firstVisit, setFirstVisit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [mapRef, setMapRef] = useState(null);
  const [defaultOrigin, setDefaultOrigin] = useState(settings.initialRegion);

  const onMapPress = async (e) => {
    const coords = e.nativeEvent.coordinate;
    setDefaultOrigin({ ...defaultOrigin, latitude: coords.latitude, longitude: coords.longitude });
  };

  const getAddressHandle = async (address) => {
    setInputValue("");
    setFirstVisit(true);
    const latitude = address.geometry.location.lat;
    const longitude = address.geometry.location.lng;
    setDefaultOrigin({ ...defaultOrigin, latitude: latitude, longitude: longitude });
    handleAnimate({ latitude: latitude, longitude: longitude });
    setDefaultValue(address);
  };

  const handleAnimate = (coords) => {
    mapRef.animateCamera({
      center: coords,
      pitch: 90
    });
  };

  LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

  const handleDragOrigin = async (coords) => {
    if (!firstVisit) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${apiKey}`;
      try {
        const resp = await fetch(url);
        const respJson = await resp.json();
        const address = respJson.results[0];
        setDefaultValue(address);
        setDefaultOrigin(coords);
      } catch (error) {
        console.log("ERROR: ", error);
      }
    } else {
      setFirstVisit(false);
    }
  };

  const handleChange = (text) => {
    setInputValue(text);
    setDefaultValue(text);
  };

  useEffect(() => {
    setFirstVisit(true);
    setDefaultValue("");
  }, []);

  return (
    <View style={styles.view}>
      <View style={[autoCompleteStyles.autoCompleteCOntainer, { height: inputValue ? "100%" : 50 }]}>
        <GooglePlacesAutocomplete
          placeholder={settings.placeholder || "Search..."}
          minLength={2}
          autoFocus={false}
          returnKeyType={"default"}
          fetchDetails={true}
          textInputProps={{
            onChangeText: (text) => handleChange(text),
            value: defaultValue.formatted_address
          }}
          onPress={(data, details = null) => getAddressHandle(details)}
          styles={autoCompleteStyles}
          query={{
            key: apiKey,
            language: "en",
            components: `country:${settings.country}`
          }}
        />
      </View>

      <MapView
        initialRegion={defaultOrigin}
        ref={setMapRef}
        onPress={onMapPress}
        style={styles.map}
        onRegionChangeComplete={(region) => handleDragOrigin(region)}
      />

      <View style={styles.markerFixed}>
        <Image style={[styles.marker, settings.markerStyles]} source={{ uri: settings.markerUrl }} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AutoComplete", { address: defaultValue })}
        style={styles.done}
      >
        <Icon name="check" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default Maps;
