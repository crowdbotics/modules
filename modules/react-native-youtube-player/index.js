/**
 * @format
 * @flow
 */
import React, { useState, createRef, useContext } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import {
  View,
  Text,
  ScrollView,
  PixelRatio,
  Dimensions,
  TouchableOpacity
} from "react-native";
// @ts-ignore
import { OptionsContext } from "@options";
// @ts-ignore
import YouTube from "react-native-youtube";

const App = () => {
  const options = useContext(OptionsContext);
  const { styles, YOUTUBE_API_KEY, VIDEOS_IDS } = options;
  const youTubeRef = createRef();
  const [playerData, setPlayerData] = useState({
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    currentTime: 0,
    videosIndex: 0,
    fullscreen: false,
    playerWidth: Dimensions.get("window").width
  });

  const handleNext = () => {
    if (youTubeRef.current) {
      youTubeRef.current
        .getCurrentTime()
        .then(currentTime => {
          youTubeRef.current.seekTo(currentTime + 5);
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
          youTubeRef.current.seekTo(currentTime - 5);
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
        apiKey={YOUTUBE_API_KEY}
        videoIds={VIDEOS_IDS}
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

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button]} onPress={handlePrevious}>
          <Icon name="back" size={30} color="#900" />
          <Text style={styles.iconValue}>
            -5
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPlayerData({ ...playerData, isLooping: !playerData.isLooping })} style={[styles.loopStyle]}>
        <Text style={styles.text}>{playerData.isLooping ? "Looping" : "Not Looping"}</Text>
          <Text><Icon name="retweet" size={30} color="#900" style={styles.iconStye} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Icon name="back" size={30} color="#900" style={{ transform: [{ rotateY: "180deg" }] }} />
          <Text style={styles.iconNextValue}>
            +5
          </Text>
        </TouchableOpacity>
      </View>
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

export default {
  title: "Youtube Player",
  navigator: App
};
