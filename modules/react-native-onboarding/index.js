import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
// @ts-ignore
import AppIntroSlider from "react-native-app-intro-slider";

const Onboarding = ({
  slidesData,
  onDone,
  onSkip,
  onSlideChange,
  bottomButton = false,
  dotStyle,
  activeDotStyle,
  skipLabel,
  doneLabel,
  showSkipButton = true,
  prevLabel,
  nextLabel,
  showPrevButton = true,
  showNextButton = true,
  showDoneButton = true,
  renderNextButton,
  renderPrevButton,
  renderDoneButton,
  renderSkipButton,
  mainContainerStyle = {},
  imageStyle = {},
  titleStyle = {},
  descriptionStyle = {}
}) => {
  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]} key={index}>
        <Text style={[styles.title, titleStyle]}>{item?.title}</Text>
        <Image style={[styles.image, imageStyle]} source={{ uri: item?.imageURL }} />
        <Text style={[styles.text, descriptionStyle]}>{item?.description}</Text>
      </View>
    );
  };

  const handleDone = () => {

  };

  return (
    <View style={[{ flex: 1 }, mainContainerStyle]}>
      {slidesData
        ? <AppIntroSlider
          renderItem={renderItem}
          data={slidesData}
          onDone={onDone || handleDone}
          onSkip={onSkip || ""}
          onSlideChange={onSlideChange || ""}
          showSkipButton={showSkipButton}
          bottomButton={bottomButton}
          dotStyle={dotStyle}
          activeDotStyle={activeDotStyle}
          skipLabel={skipLabel}
          doneLabel={doneLabel}
          nextLabel={nextLabel}
          prevLabel={prevLabel}
          showPrevButton={showPrevButton}
          showNextButton={showNextButton}
          showDoneButton={showDoneButton}
          renderNextButton={renderNextButton}
          renderPrevButton={renderPrevButton}
          renderDoneButton={renderDoneButton}
          renderSkipButton={renderSkipButton}
        />
        : <Text style={styles.warText}>No data found!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center"
  },
  title: {
    fontSize: 22,
    color: "white",
    textAlign: "center"
  },
  warText: {
    top: "20%",
    marginHorizontal: "20%",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "system-ui",
    fontWeight: "bold"
  }
});

Onboarding.propTypes = {
  slidesData: PropTypes.array,
  onDone: PropTypes.func,
  onSkip: PropTypes.func,
  onSlideChange: PropTypes.func,
  bottomButton: PropTypes.bool,
  dotStyle: PropTypes.object,
  activeDotStyle: PropTypes.object,
  skipLabel: PropTypes.string,
  doneLabel: PropTypes.string,
  showSkipButton: PropTypes.bool,
  prevLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  showPrevButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  showDoneButton: PropTypes.bool,
  renderNextButton: PropTypes.func,
  renderPrevButton: PropTypes.func,
  renderDoneButton: PropTypes.func,
  renderSkipButton: PropTypes.func,
  mainContainerStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  descriptionStyle: PropTypes.object
};

export default {
  title: "Onboarding",
  navigator: Onboarding
};
