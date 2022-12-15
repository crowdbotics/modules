import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground
} from "react-native";

const DiseaseProtection = () => {
  const [preventions, setPreventions] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    setPreventions([
      {
        title: "Wash your hands",
        image: require("./assets/preventionImage1.png")
      },
      {
        title: "User mask always",
        image: require("./assets/preventionImage2.png")
      },
      {
        title: "Keep you distance",
        image: require("./assets/preventionImage1.png")
      }
    ]);
    setRequirements([
      {
        title: "Mask",
        image: require("./assets/requirementsImage.png")
      },
      {
        title: "Disinfection",
        image: require("./assets/requirementsImage.png")
      },
      {
        title: "Gloves",
        image: require("./assets/requirementsImage.png")
      }
    ]);
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
              <View>
                <Text style={styles.heading}>Prevention</Text>
                <FlatList
                  data={preventions}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item }) => <Prevention prevention={item} />}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <View>
                <Text style={styles.heading}>Requirements</Text>
                <FlatList
                  data={requirements}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item }) => <Requirement requirement={item} />}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <Text style={styles.heading}>Doctor Suggestions</Text>
            </View>
          )}
          data={suggestions}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <Suggestion suggestion={item} />}
          showsVerticalScrollIndicator={false}
          horizontal={false}
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
  heading: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 20,
    marginTop: 10
  }
});

export default DiseaseProtection;

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

const Prevention = ({ prevention }) => {
  return (
    <View style={preventionStyles.container}>
      <Image source={prevention.image} style={preventionStyles.image} />
      <Text style={preventionStyles.title}>{prevention.title}</Text>
    </View>
  );
};

const preventionStyles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  title: {
    width: "50%",
    lineHeight: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    fontWeight: "bold"
  },
  image: {
    width: 160,
    height: 140,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  }
});

const Requirement = ({ requirement }) => {
  return (
    <ImageBackground
      source={requirement.image}
      style={requirementStyles.container}
      imageStyle={requirementStyles.image}>
      <Text style={requirementStyles.title}>{requirement.title}</Text>
    </ImageBackground>
  );
};

const requirementStyles = StyleSheet.create({
  container: {
    width: 130,
    height: 180,
    marginHorizontal: 10,
    justifyContent: "flex-end",
    borderRadius: 10,
    overflow: "hidden"
  },
  title: {
    lineHeight: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    fontWeight: "bold",
    textAlign: "center"
  }
});
