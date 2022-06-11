import * as React from "react"
import {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import { OptionsContext, GlobalOptionsContext } from "@options";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {userToken, unFollowUser, followUser} from '../api';

const SocialProfileScreen = ({navigation, route}) => {
  const { id } = route.params;
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const gOptions = useContext(GlobalOptionsContext);
  const BASE_URL = gOptions.url
  const get_user_profile = () => {
      fetch(`${BASE_URL}/modules/social-feed/profile/${id}/`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`
        }
      }).then((response) => response.json())
        .then((json) => setUserProfile(json))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  }

  useEffect(() => {
    get_user_profile();
  }, [loading]);

  const pressed = (id) => {
    navigation.navigate("PostDetailsScreen", {id: id})
  };

  const openFollowers = () => {
    navigation.navigate("FollowersList", {id: id})
  };

  const openFollowing = () => {
    navigation.navigate("FollowingList", {id: id})
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ProfileImage />
          <Text style={styles.headerText}>{userProfile?.name}</Text>
          <Text style={styles.headerSubText}>{userProfile?.email}</Text>
        </View>
        <View style={styles.followingSection}>
          <View style={styles.textarea}>
            <Image
              style={styles.postIcon}
              source={require('../assets/posts.png')}
            />
            <Text>{userProfile?.posts?.length} posts</Text>
          </View>
          {userProfile?.is_owner && (
            <>
              <TouchableOpacity style={styles.textarea} onPress={()=> {openFollowers()}}>
                <Image
                  style={styles.postIcon}
                  source={require('../assets/user.png')}
                />
                <Text>{userProfile?.followers} Followers</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textarea} onPress={()=> {openFollowing()}}>
                <Image
                  style={styles.followingIcon}
                  source={require('../assets/user.png')}
                />
                <Text style={styles.followingText}>{userProfile?.following} Following</Text>
              </TouchableOpacity>
            </>
          )}
          {!userProfile?.is_owner && (
            <>
              {userProfile?.i_follow ? (
                <TouchableOpacity style={styles.textarea} onPress={()=> {unFollowUser(userProfile.id, setLoading)}}>
                  <Image
                    style={styles.postIcon}
                    source={require('../assets/user.png')}
                  />
                  <Text>UnFollow</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.textarea} onPress={()=> {followUser(userProfile.id, setLoading)}}>
                  <Image
                    style={styles.followingIcon}
                    source={require('../assets/user.png')}
                  />
                  <Text style={styles.followingText}>Follow</Text>
                </TouchableOpacity>
              )}
              

              
            </>
          )}
          
          
        </View>

        <View style={styles.pt30}>
          <View >
            <FlatList
              data={userProfile?.posts}
              style={styles.galleryRow}
              numColumns={3}
              renderItem={({ item }) => (
                <View style={styles.smallPost}>
                  <Post onPress={()=>{pressed(item.id)}} data={item} />
                </View>
              )}
              keyExtractor={(item) => item.id}
              onRefresh={() => {
                setLoading(true);
                fetch(`${BASE_URL}/modules/social-feed/my-feed/`)
                .then((response) => response.json())
                .then((json) => setPosts(json))
                .catch((error) => console.log(error))
                .finally(() => setLoading(false));
              }}
              refreshing={loading}
            />
          </View>
        </View>

        {/* <View style={styles.pt10}>
          <View style={styles.galleryRow}>
            <View style={styles.columnRow}>
              <View style={styles.smallPostcolumn}>
                <Post />
              </View>
              <View style={styles.smallPostcolumn}>
                <Post />
              </View>
            </View>
            <View style={styles.largePost}>
              <Post />
            </View>
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
    backgroundColor: "white"
  },

  followingSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center"
  },
  headerText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold"
  },
  headerSubText: {
    marginTop: 5,
    fontSize: 12,
    color: "#C4C4C4"
  },
  postIcon: {
    width: 15,
    height: 15,
    marginBottom: 5,

    shadowColor: "#0000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1.3,
    shadowRadius: 3.84
  },
  followingIcon: {
    width: 15,
    height: 15,
    marginBottom: 5
  },
  textarea: {
    display: "flex",
    alignItems: "center"
  },
  followingText: {
    fontSize: 14,
  },
  pt30: {
    paddingTop: 30
  },
  pt10: {
    paddingTop: 5
  },
  galleryRow: {
    display: "flex",
    // flexDirection: "row",
    // flexWrap: "wrap",
  },
  smallPost: {
    height: 120,
    width: "33%",
    paddingHorizontal: 3,
    marginVertical: 5
  },
  columnRow: {
    width: "33%"
  },
  smallPostcolumn: {
    height: 120,
    width: "100%",
    padding: 3
  },
  largePost: {
    height: 240,
    width: "67%",
    padding: 3
  }
});

export default SocialProfileScreen;

const Post = props => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={postStyles.galleryPost}
      underlayColor="#DDDDDD"
    >
      <Image
        style={postStyles.editIcon}
        source={props?.data?.media?.[0]?.image ? {uri: props?.data?.media?.[0]?.image}  : require('../assets/edit.png')}
      />
    </TouchableHighlight>
  );
};

const postStyles = StyleSheet.create({
  galleryPost: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "#FCF1D6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5
  },
  editIcon: {
    height: '100%',
    width: "100%",
    borderRadius: 10
  }
});

const ProfileImage = props => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View style={imageStyles.container}>
        <Image
          style={imageStyles.image}
          resizeMode="contain"
          source={require('../assets/user.png')}
        />
      </View>
    </TouchableHighlight>
  );
};

const imageStyles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    height: 70,
    width: 70,
    borderRadius: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: 'center'
  },
  image: {
    width: 20,
    marginTop: 4
  }
});
