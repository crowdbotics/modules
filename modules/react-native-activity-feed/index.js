import * as React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import options from "./options";
import postsIcon from "./posts.png";
import ProfileImage from "./components/ProfileImage";
import followingIcon from "./following.png";
import Post from "./components/Post";

 const ActivityFeed = ()=> {
  return (
    <ScrollView>
      <View style={options.styles.container}>
        <View style={options.styles.headerContainer}>
          <ProfileImage />
          <Text style={options.styles.headerText}>Jay Mahanga</Text>
          <Text style={options.styles.headerSubText}>jay@gmail.com</Text>
        </View>
        <View style={options.styles.followingSection}>
          <View style={options.styles.textarea}>
            <Image style={options.styles.postIcon} source={postsIcon} />
            <Text style={options.styles.postText}>My post</Text>
          </View>
          <View style={options.styles.textarea}>
            <Image style={options.styles.followingIcon} source={followingIcon} />
            <Text style={options.styles.followingText}>Following</Text>
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
}

export default {
  title: "Activity Feed",
  navigator: ActivityFeed
}
