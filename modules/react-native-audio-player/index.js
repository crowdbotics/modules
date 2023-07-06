import React, { useState, useEffect } from "react";
import { Image, LogBox, SafeAreaView, StyleSheet, PermissionsAndroid, Text, TouchableOpacity, View, Alert } from "react-native";
import Slider from "react-native-slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import PlayButton from "./playButton";
import TracksList from "./trackList";
import { tracks } from "./options";
import PropTypes from "prop-types";
import RNFetchBlob from "rn-fetch-blob";
const AudioPlayer = ({ onPlay, onPause, onBackwardCall, onForwardCall, onTrackItemSelect }) => {
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
      if (onBackwardCall) {
        onBackwardCall();
      }
    });
  };

  const onStartPress = async e => {
    setIsAlreadyPlay(true);
    setInProgress(true);
    audioRecorderPlayer.startPlayer(selectedTrack?.path);
    audioRecorderPlayer.setVolume(1.0);

    audioRecorderPlayer.addPlayBackListener(async e => {
      const currentTime = Math.max(0, e.currentPosition);
      const totalDuration = Math.max(0, e.duration);

      if (e.current_position === e.duration) {
        audioRecorderPlayer.stopPlayer();
        setIsAlreadyPlay(false);
      }
      const percentage = (currentTime / totalDuration) * 100;
      const roundedPercentage = Math.round(percentage * 100) / 100;

      setTimeElapsed(e.current_position);
      setPercent(roundedPercentage);
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
      if (onForwardCall) {
        onForwardCall();
      }
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
      if (onTrackItemSelect) {
        onTrackItemSelect(item);
      }
    });
  };
  const requestToPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Audio Player",
          message: "App needs access to your Files... ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) { startDownload(); }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const getUrlExtension = (url) => {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  };

  const startDownload = async () => {
    const { path, title } = selectedTrack;

    const ext = await getUrlExtension(path);

    RNFetchBlob.config({
      fileCache: true,
      appendExt: ext,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: title,
        path: RNFetchBlob.fs.dirs.DownloadDir + `${title}`, // Android platform
        description: "Downloading the file"
      }
    }
    ).fetch("GET", path)
      .then(res => {
        Alert.alert("Download Completed", `The file is save to ${res.path()}`);
      }
      );
  };

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.downloadContainer}>
      <TouchableOpacity onPress={() => requestToPermissions()}>
          <FontAwesome name="download" size={25} color="#93A8B3" />
      </TouchableOpacity>
      </View>

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
          <Text style={[styles.textDark]}>
            {selectedTrack?.title || ""}
          </Text>
        </View>
      </View>
      <View style={styles.seekBar}>

        <AudioSlider percent={percent} changeTime={changeTime}/>

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
      <TracksList onTrackItemPress={onTrackItemPress} />
    </SafeAreaView>
    //
  );
};

AudioPlayer.propTypes = {
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onBackwardCall: PropTypes.func,
  onForwardCall: PropTypes.func,
  onTrackItemSelect: PropTypes.func
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
    color: "#3D425C",
    fontSize: 18,
    fontWeight: "500"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  coverContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
  trackName: { alignItems: "center", marginTop: 20 },
  downloadContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 30,
    paddingTop: 20
  }
});
export default {
  title: "AudioPlayer",
  navigator: AudioPlayer
};

const AudioSlider = ({ percent, changeTime }) => {
  return (
    <Slider
          minimumValue={0}
          maximumValue={100}
          trackStyle={sliderStyles.track}
          thumbStyle={sliderStyles.thumb}
          value={percent}
          minimumTrackTintColor="#93A8B3"
          onValueChange={(seconds) => changeTime(seconds)}
        />
  );
};

const sliderStyles = StyleSheet.create({
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
  }
});
