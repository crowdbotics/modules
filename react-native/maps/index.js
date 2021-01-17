import React from "react";
import { View } from "react-native";
import { styles } from './styles'
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const Maps = () => {
  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  return (
    <View style={styles.view}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
      />
    </View>
  );
}

export default {
  name: "Maps",
  screen: Maps,
  reducer: null,
  actions: null
}
