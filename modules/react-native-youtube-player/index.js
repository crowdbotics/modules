import React, { createRef, useContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView, Text, TouchableOpacity, View
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import { OptionsContext } from "@options";

import PropTypes from "prop-types";

import YoutubePlayer from "react-native-youtube-iframe";

const Player = ({ playerSetting, videoIds, isForwordTimeDuration = true, forwordTimeDurationInSeconds = 5, isBackwordTimeDuration = true, backwordTimeDurationInSeconds = 5 }) => {
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
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
       <YoutubePlayer
        ref={youTubeRef}
        height={400}
        width={400}
        playList={videoIds || options.VIDEOS_IDS}
        onReady={() => setPlayerData({ ...playerData, isReady: true })}
        onChangeState={e => setPlayerData({ ...playerData, status: e.state })}
        onPlaybackQualityChange={e => setPlayerData({ ...playerData, quality: e.quality })}
        onFullScreenChange={e => setPlayerData({ ...playerData, fullscreen: e.isFullscreen })}
        onProgress={e => setPlayerData({ ...playerData, currentTime: e.currentTime })}
        initialPlayerParams={{
          loop: playerData.isLooping
        }}
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
           <View style={styles.button}>
              <Icon name="retweet" size={30} color="#900" />
              <Text style={styles.iconNextValue}>
                {playerData.isLooping ? "Looping" : "Not Looping"}
              </Text>
            </View>
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

      <View style={styles.statusContainer}>
        <Text style={styles.instructions}>
          {playerData.error ? "Error: " + playerData.error : ""}
        </Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

Player.propTypes = {
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
