import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import styles from "./styles";
import { tracks } from "./options";

const TracksList = ({ onTrackItemPress }) => {
  const {
    container,
    itemStyle,
    listBox,
    subTitle,
    subTitleBox,
    title,
    titleBox,
    trackImg,
    trackImgBox,
    trackDescBox
  } = styles;

  const renderItem = ({ item }) => {
    const artImg = item.artwork;

    return (
            <TouchableOpacity
                onPress={() => onTrackItemPress(item)}
                style={[itemStyle]}>
                <View style={trackImgBox}>
                    <Image style={trackImg} source={{ uri: artImg || "jt" }} />
                </View>
                <View style={trackDescBox}>
                    <View style={titleBox}>
                        <Text style={title}>{item?.title}</Text>
                    </View>
                    <View style={subTitleBox}>
                        <Text style={subTitle}>{item?.artist || item?.album || "Unknown"}</Text>
                    </View>
                </View>
            </TouchableOpacity>
    );
  };

  return (
        <SafeAreaView style={container}>
            <View style={[listBox]}>
                <FlatList data={tracks} renderItem={renderItem} keyExtractor={item => item.id} showsVerticalScrollIndicator={false}/>
            </View>
        </SafeAreaView>
  );
};

export default TracksList;
