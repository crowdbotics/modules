import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  FlatList
} from "react-native";

const DiseaseSymptoms = () => {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    setSuggestions([
      {
        doctor: "Dr. Full name",
        image: require("./assets/doctorImage.png"),
        description:
          "Sed lobortis tempor felis sit amet ullamcorper. Morbi in molestie orci. Nulla pharetra consequat nunc, id posuere dolor tincidunt eget.",
        location: "Location"
      },
      {
        doctor: "Dr. Full name",
        image: require("./assets/doctorImage.png"),
        description:
          "Sed lobortis tempor felis sit amet ullamcorper. Morbi in molestie orci. Nulla pharetra consequat nunc, id posuere dolor tincidunt eget.",
        location: "Location"
      },
      {
        doctor: "Dr. Full name",
        image: require("./assets/doctorImage.png"),
        description:
          "Sed lobortis tempor felis sit amet ullamcorper. Morbi in molestie orci. Nulla pharetra consequat nunc, id posuere dolor tincidunt eget.",
        location: "Location"
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          ListHeaderComponent={() => (
            <View>
              <View style={styles.cardContainer}>
                <View style={styles.info}>
                  <Text style={styles.title}>Sneezing</Text>
                  <Text style={styles.description}>
                    Sed lobortis tempor felis sit amet ullamcorper. Morbi in
                    molestie orci. Nulla pharetra consequat nunc.
                  </Text>
                  <View style={styles.linkContainer}>
                    <Pressable>
                      <Text style={styles.ancherText}>Read More</Text>
                    </Pressable>
                    <Text style={styles.discussionsText}>(82 Discussions)</Text>
                  </View>
                </View>
                <Image
                  source={require("./assets/sneezingImage.png")}
                  style={styles.cardImage}
                />
              </View>
              <View style={styles.smallCards}>
                <View style={styles.smallCardContainer}>
                  <Image
                    source={require("./assets/dryCoughImage.png")}
                    style={styles.cardImage}
                  />
                  <Text style={styles.title}>Dry Cough</Text>
                  <Text style={styles.discussionsText}>(124 Discussions)</Text>
                </View>
                <View style={styles.smallCardContainer}>
                  <Image
                    source={require("./assets/feverImage.png")}
                    style={styles.cardImage}
                  />
                  <Text style={styles.title}>Dry Cough</Text>
                  <Text style={styles.discussionsText}>(124 Discussions)</Text>
                </View>
              </View>
              <Text style={styles.heading}>Doctor Suggestions</Text>
            </View>
          )}
          data={suggestions}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <Suggestion suggestion={item} />}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  list: {
    padding: 20
  },
  heading: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 20,
    marginTop: 20
  },
  cardContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "flex-start"
  },
  cardImage: {
    height: 140,
    width: 130,
    marginBottom: 10
  },
  info: {
    flex: 1,
    paddingRight: 15
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E2022",
    marginBottom: 5
  },
  description: {
    fontSize: 13,
    color: "#77838F",
    textAlign: "justify",
    lineHeight: 20
  },
  linkContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center"
  },
  ancherText: {
    fontSize: 12,
    color: "#504DE5",
    fontWeight: "bold"
  },
  discussionsText: {
    fontSize: 12,
    marginLeft: 5,
    color: "#77838F"
  },
  smallCards: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  smallCardContainer: {
    width: "48%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 10,
    shadowColor: "rgba(0,0,0,0.8)",
    marginTop: 30
  }
});

export default DiseaseSymptoms;

const Suggestion = ({ suggestion }) => {
  return (
    <View style={suggestionStyles.container}>
      <View style={suggestionStyles.header}>
        <Image source={suggestion.image} style={suggestionStyles.doctorImage} />
        <View style={suggestionStyles.info}>
          <Text style={suggestionStyles.doctorName}>{suggestion.doctor}</Text>
          <Text style={suggestionStyles.doctorLocation}>
            {suggestion.location}
          </Text>
        </View>
        <Image source={require("./assets/menuIcon.png")} />
      </View>
      <Text style={suggestionStyles.description}>{suggestion.description}</Text>
    </View>
  );
};

const suggestionStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  info: {
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 20
  },
  doctorName: {
    fontSize: 14,
    color: "#1E2022"
  },
  doctorLocation: {
    fontSize: 12,
    color: "#77838F"
  },
  description: {
    fontSize: 14,
    color: "#77838F",
    textAlign: "justify",
    marginTop: 10,
    lineHeight: 20
  }
});
