import React, { createRef, useContext, useState } from "react";
import {
  PixelRatio, ScrollView, Text, TouchableOpacity, View
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import { OptionsContext } from "@options";

import PropTypes from "prop-types";

import YouTube from "react-native-youtube";

const Player = ({ youtubeApiKey, playerSetting, videoIds, isForwordTimeDuration = true, forwordTimeDurationInSeconds = 5, isBackwordTimeDuration = true, backwordTimeDurationInSeconds = 5 }) => {
  const options = useContext(OptionsContext);
  const { styles } = options;
  const youTubeRef = createRef();
  const [playerData, setPlayerData] = useState(playerSetting || options.playerDefaultSetting);

  const handleNext = () => {
    if (youTubeRef.current) {
      youTubeRef.current
        .getCurrentTime()
        .then(currentTime => {
          youTubeRef.current.seekTo(currentTime + forwordTimeDurationInSeconds);
        })
        .catch(errorMessage => {
          setPlayerData({ ...playerData, error: errorMessage });
        });
    }
  };

  const handlePrevious = () => {
    if (youTubeRef.current) {
      youTubeRef.current
        .getCurrentTime()
        .then(currentTime => {
          youTubeRef.current.seekTo(currentTime - backwordTimeDurationInSeconds);
        })
        .catch(errorMessage => {
          setPlayerData({ ...playerData, error: errorMessage });
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <YouTube
        ref={youTubeRef}
        apiKey={youtubeApiKey || options.YOUTUBE_API_KEY}
        videoIds={videoIds || options.VIDEOS_IDS}
        play={playerData.isPlaying}
        loop={playerData.isLooping}
        fullscreen={playerData.fullscreen}
        controls={1}
        onError={e => setPlayerData({ ...playerData, error: e.error })}
        onReady={() => setPlayerData({ ...playerData, isReady: true })}
        onChangeState={e => setPlayerData({ ...playerData, status: e.state })}
        onChangeQuality={e => setPlayerData({ ...playerData, quality: e.quality })}
        onChangeFullscreen={e => setPlayerData({ ...playerData, fullscreen: e.isFullscreen })}
        onProgress={e => setPlayerData({ ...playerData, currentTime: e.currentTime })}
        style={[
          { height: PixelRatio.roundToNearestPixel(playerData.playerWidth / (16 / 9)) },
          styles.player
        ]}
      />

      { (isForwordTimeDuration || isBackwordTimeDuration) &&
        <View style={styles.buttonGroup}>
          { isForwordTimeDuration &&
            <TouchableOpacity style={[styles.button]} onPress={handlePrevious}>
              <Icon name="back" size={30} color="#900" />
              <Text style={styles.iconValue}>
                -{backwordTimeDurationInSeconds}
              </Text>
            </TouchableOpacity>
          }
          { isBackwordTimeDuration &&
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Icon name="back" size={30} color="#900" style={{ transform: [{ rotateY: "180deg" }] }} />
              <Text style={styles.iconNextValue}>
                +{forwordTimeDurationInSeconds}
              </Text>
            </TouchableOpacity>
          }
        </View>
      }

      <View style={styles.buttonGroup}>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.instructions}>
          {playerData.error ? "Error: " + playerData.error : ""}
        </Text>
      </View>

    </ScrollView>
  );
};

Player.propTypes = {
  youtubeApiKey: PropTypes.string,
  playerSetting: PropTypes.object,
  videoIds: PropTypes.array,
  forwordTimeDurationInSeconds: PropTypes.number,
  backwordTimeDurationInSeconds: PropTypes.number,
  isForwordTimeDuration: PropTypes.bool,
  isBackwordTimeDuration: PropTypes.bool
};

export default {
  title: "Youtube Player",
  navigator: Player
};
