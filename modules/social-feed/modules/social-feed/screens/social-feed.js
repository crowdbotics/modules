import React, { useContext, useState, useEffect} from "react"
import { View, ScrollView, Image, Text, StyleSheet, FlatList, Touchable } from "react-native"
import { OptionsContext, GlobalOptionsContext } from "@options";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { likePost, unLikePost } from '../api';

const SocialFeedScreen = (props) => {
  const { navigation, params } = props;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const gOptions = useContext(GlobalOptionsContext);
  const BASE_URL = gOptions.url
  const get_posts = () => {
    fetch(`${BASE_URL}/modules/social-feed/my-feed/`, 
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token cf1b4cf39330a955ba203ddbfefa2e6707006f64'
      }
    })
    .then((response) => response.json())
    .then((json) => setPosts(json))
    .catch((error) => console.log(error))
    .finally(() => setLoading(false));
  }
  useEffect(async () => {
    get_posts();
  }, []);

  // More info on all the options is below in the API Reference... just some common use cases shown here
  useEffect(async () => {
    get_posts();
  }, [loading]);
  return (
    <View style={{marginTop: 60}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* search bar */}
          <View style={styles.searchBar}>
            <TextInput style={styles.searchBarInput} placeholder="Search" />
            <Image source={require('./assets/search.png')} style={styles.searchIcon} />
          </View>
          {/* end search bar */}
          <TouchableOpacity style={styles.headerContainer} onPress={()=>{navigation.navigate('Create Post')}}>
            <Image
              source={require("./assets/plus.png")}
              style={styles.headerImage}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostComponent
              bgColor={item?.bgColor ? item.bgColor : "#acacac"}
              key={item.id}
              post = {item}
              nav={navigation}
              setLoading={setLoading}
          />
          )}
          keyExtractor={(item) => item.id}
          onRefresh={() => {
            get_posts();
          }}
          refreshing={loading}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default SocialFeedScreen;

const styles = StyleSheet.create({
  container: { padding: 10, height: "100%", backgroundColor: "#FFF" },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  headerImage: { height: 20, width: 20 },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    backgroundColor: '#FFF',
    flex: 1
  },
  searchBarInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingLeft: 10,
    textAlign: 'center'
  },
});

const PostComponent = ({ post, nav, setLoading }) => {
  const gOptions = useContext(GlobalOptionsContext);
  const BASE_URL = gOptions.url
  const {color, id, caption, upvotes, comments, comments_count, media, user, liked } = post;
  return (
    <TouchableOpacity style={{margin: 10}} onPress={()=>{nav.navigate("PostDetailsScreen", {id: id})}}>
      <TouchableOpacity style={userPostStyles.usernameContainer} onPress={()=>{nav.navigate("SocialProfileScreen", {id: user?.id})}}>
        <View style={userPostStyles.userImageContainer}>
          <Image
            source={user?.image ? {uri: user.image} : require("./assets/user.png")}
            style={userPostStyles.userImage}
          />
        </View>
        <Text style={userPostStyles.userText}>{user?.name}</Text>
      </TouchableOpacity>
      <View
        style={[userPostStyles.userPostImage, { backgroundColor: color ? color : "#acacac" }]}
      >
        <Image
          source={{ uri: media?.[0]?.image }}
          style={userPostStyles.postImage}
        />
      </View>
      <View style={userPostStyles.postcontainer}>
        <View style={userPostStyles.leftContainer}>
          <TouchableOpacity style={{flexDirection: 'row'}} 
            onPress={()=>{
              liked ? 
              unLikePost(id, BASE_URL, setLoading)
              : 
              likePost(id, BASE_URL, setLoading)
            }}
          >
            <Image
              source={liked ? require('./assets/unlike.png'): require('./assets/like.png')}
              style={userPostStyles.imageIcons}
            />
            <Text style={userPostStyles.mh10}>{upvotes}</Text>
          </TouchableOpacity>
          <Image
            source={require("./assets/comment.png")}
            style={userPostStyles.imageIcons}
          />
          <Text style={userPostStyles.mh10}>{comments_count}</Text>
        </View>
        <Image
          source={require("./assets/group.png")}
          style={[userPostStyles.imageIcons, userPostStyles.mr10]}
        />
      </View>
      <Text style={userPostStyles.postText}>{caption}</Text>
    </TouchableOpacity>
  );
};
const userPostStyles = StyleSheet.create({
  usernameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10
  },
  userImageContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  userImage: {
    height: 15,
    width: 15,
  },
  userText: {
    color: "#3B566E"
  },
  userPostImage: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  postImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    overflow: 'hidden',
    borderRadius: 10,
  },
  postcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  imageIcons: {
    height: 12,
    width: 12
  },
  mh10: {
    marginHorizontal: 10
  },
  postText: {
    display: "flex",
    justifyContent: "center",
    color: "#6F8BA4",
    marginVertical: 10
  },
  mr10: {
    marginRight: 10
  }
});
