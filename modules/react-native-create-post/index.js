import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import Post from './components/Post'
import options from './options'
import gallery from './gallery.png'
import camera from './camera.png'
import cross from './cross.png'

const CreatePost = () => {
  
  return (
    <ScrollView>
      <View style={options.styles.container}>
        <View style={[options.styles.headerPost, options.styles.pa]}>
          <Image style={options.styles.crossIcon} resizeMode="contain" source={cross} />
          <Post />
        </View>
        <View style={[options.styles.actionContainer, options.styles.pa]}>
          <Text style={options.styles.actionLeftText}>Choose picture/video</Text>
          <View style={options.styles.actionRight}>
            <Image style={options.styles.actionRightImage} resizeMode="contain" source={camera} />
            <Image style={options.styles.actionRightImage} resizeMode="contain" source={gallery} />
          </View>
        </View>
        <View style={options.styles.pt30}>
          <View style={options.styles.galleryRow}>
            <View style={options.styles.smallPost}>
              <Post />
            </View>
            <View style={options.styles.smallPost}>
              <Post />
            </View>
            <View style={options.styles.smallPost}>
              <Post />
            </View>
          </View>
        </View>

        <View style={options.styles.pt10}>
          <View style={options.styles.galleryRow}>
            <View style={options.styles.columnRow}>
              <View style={options.styles.smallPostcolumn}>
                <Post />
              </View>
              <View style={options.styles.smallPostcolumn}>
                <Post />
              </View>
            </View>
            <View style={options.styles.largePost}>
              <Post />
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
};

export default {
  title: "CreatePost",
  navigator: CreatePost
}
