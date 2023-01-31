import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapboxGL from "@rnmapbox/maps";

export const updateRoute = (coords, originCoords, destinationCoords, loc, setRoute, setDefaultOrigin, setDestination) =>{
    console.log("coords: ",coords)
    if(loc){
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
                destinationCoords
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
                originCoords,
                coords
              ]
            }
          }
        ]
      })
    }

  }

export const renderPolygon = (polygon) =>{
    return(
        <MapboxGL.ShapeSource id="source" shape={polygon}>
        <MapboxGL.FillLayer id="fill" style={{fillColor: "brown"}} />
        <MapboxGL.LineLayer
          id="line"
          style={{ lineColor: "white", lineWidth: 1 }}
        />
      </MapboxGL.ShapeSource>
    )
}

export const renderDestinationAnnotations = (destination, handleGetDestination, destinationTitle) => {
        return (
          <MapboxGL.PointAnnotation
            key="pointAnnotation"
            id="pointAnnotation"
            coordinate={destination}
            draggable={true}
            onDragEnd= {(coords) => handleGetDestination(coords?.geometry?.coordinates)}
          >
            <View
              style={styles.dest}
            />
          </MapboxGL.PointAnnotation>
        );
};

export const getAddress = async (latlng, setOriginTitle, setDestinationTitle, locTitle) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&key=${apiKey}`;
    try {
      const resp = await fetch(url);
      const respJson = await resp.json();
      const address = respJson.results[0].formatted_address;
      const [title, ...desc] = address.split(",");
      const description = desc.join(",");
      if (locTitle === "origin") {
        setOriginTitle(description);
      } else {
        setDestinationTitle(description);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
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
    }
})


    