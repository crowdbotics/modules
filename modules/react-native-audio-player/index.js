import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Slider from "react-native-slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import PlayButton from "./playButton";
import TracksList from "./trackList";
import { tracks } from "./options";
const AudioPlayer = ({ onPlay, onPause }) => {
  const [isAlreadyPlay, setIsAlreadyPlay] = useState(false);
  const [duration, setDuration] = useState("00:00:00");
  const [timeElapsed, setTimeElapsed] = useState("00:00:00");
  const [percent, setPercent] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);

  const changeTime = async (seconds) => {
    const seekTime = (seconds / 100) * duration;
    setTimeElapsed(seekTime);
    audioRecorderPlayer.seekToPlayer(seekTime);
  };

  const onBackward = async () => {
    const currentIndex = tracks.indexOf(selectedTrack);
    if (currentIndex === 0) {
      setSelectedTrack(tracks[tracks.length - 1]);
    } else {
      setSelectedTrack(tracks[currentIndex - 1]);
    }
    onStopPress().then(async () => {
      await onStartPress();
    });
  };

  const onStartPress = async (e) => {
    setIsAlreadyPlay(true);
    setInProgress(true);
    audioRecorderPlayer.startPlayer(selectedTrack?.path);
    audioRecorderPlayer.setVolume(1.0);

    audioRecorderPlayer.addPlayBackListener(async (e) => {
      if (e.current_position === e.duration) {
        audioRecorderPlayer.stopPlayer();
        setIsAlreadyPlay(false);
      }
      const percent = Math.round(
        (Math.floor(e.current_position) / Math.floor(e.duration)) * 100
      );

      setTimeElapsed(e.current_position);
      setPercent(percent);
      setDuration(e.duration);

      if (onPlay) {
        onPlay();
      }
    });
  };

  const onPausePress = async (e) => {
    setIsAlreadyPlay(false);
    await audioRecorderPlayer.pausePlayer();
    if (onPause) {
      onPause();
    }
  };

  const onForward = async () => {
    const currentIndex = tracks.indexOf(selectedTrack) + 1;
    if (currentIndex === tracks.length) {
      setSelectedTrack(tracks[1]);
    } else {
      setSelectedTrack(tracks[currentIndex]);
    }

    onStopPress().then(async () => {
      await onStartPress();
    });
  };

  const onStopPress = async (e) => {
    await audioRecorderPlayer.stopPlayer();
    await audioRecorderPlayer.removePlayBackListener();
  };

  const onTrackItemPress = (item) => {
    setSelectedTrack(item);
    onStopPress().then(async () => {
      await onStartPress();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.coverContainer}>
          <Image
            source={{
              uri: selectedTrack?.artwork || "jy"
            }}
            style={styles.cover}
          />
        </View>

        <View style={styles.trackName}>
          <Text style={[styles.textDark, { fontSize: 18, fontWeight: "500" }]}>
            {selectedTrack?.title || ""}
          </Text>
        </View>
      </View>
      <View style={styles.seekBar}>
        <Slider
          minimumValue={0}
          maximumValue={100}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          value={percent}
          minimumTrackTintColor="#93A8B3"
          onValueChange={(seconds) => changeTime(seconds)}
        />
        <View style={styles.inProgress}>
          <Text style={[styles.textLight, styles.timeStamp]}>
            {!inProgress
              ? timeElapsed
              : audioRecorderPlayer.mmssss(Math.floor(timeElapsed))}
          </Text>
          <Text style={[styles.textLight, styles.timeStamp]}>
            {!inProgress
              ? duration
              : audioRecorderPlayer.mmssss(Math.floor(duration))}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onBackward()}>
          <FontAwesome name="backward" size={32} color="#93A8B3" />
        </TouchableOpacity>
        {!isAlreadyPlay
          ? (
          <PlayButton onPress={() => onStartPress()} state="play" />
            )
          : (
          <PlayButton onPress={() => onPausePress()} state="pause" />
            )}
        <TouchableOpacity onPress={() => onForward()}>
          <FontAwesome name="forward" size={32} color="#93A8B3" />
        </TouchableOpacity>
      </View>
      <TracksList onTrackItemPress={onTrackItemPress}/>
    </SafeAreaView>
  //
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEC"
  },
  textLight: {
    color: "#B6B7BF"
  },
  text: {
    color: "#8E97A6"
  },
  titleContainer: { alignItems: "center", marginTop: 24 },
  textDark: {
    color: "#3D425C"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  coverContainer: {
    marginTop: 20,
    width: 100,
    height: 100,
    shadowColor: "#5D3F6A",
    shadowOffset: { height: 15 },
    shadowRadius: 8,
    shadowOpacity: 0.3
  },
  cover: {
    width: 100,
    height: 100,
    borderRadius: 25
  },
  track: {
    height: 2,
    borderRadius: 1,
    backgroundColor: "#FFF",
    width: "100%"
  },
  thumb: {
    width: 8,
    height: 8,
    backgroundColor: "#3D425C"
  },
  timeStamp: {
    fontSize: 11,
    fontWeight: "500"
  },
  seekBar: { marginBottom: 10, marginTop: 10, marginHorizontal: 32 },
  inProgress: {
    marginTop: -12,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  trackName: { alignItems: "center", marginTop: 20 }
});
export default {
  title: "AudioPlayer",
  navigator: AudioPlayer
};
