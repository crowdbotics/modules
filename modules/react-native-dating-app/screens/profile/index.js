
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Image, StatusBar, Pressable } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import LikeIcon from "../../components/Icons/LikeIcon";
import DislikeIcon from "../../components/Icons/DislikeIcon";

import { userProfileDetails } from '../../api/redux';
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../components/BackButton";
import SettingsIcon from "../../components/Icons/SettingsIcon";
import {useIsFocused} from '@react-navigation/native';
import ExitIcon from "../../components/Icons/ExitIcon";
import { storage } from "@modules/storage";

export const Profile = (params) => {
  const { navigation } = params;
  const [posts, setPosts] = useState([{}, {}, {}, {}]);
  console.log(params, " from profile")
  const dispatch = useDispatch();
  const [profileDetails, setProfileDetails] = useState({});
  const store = useSelector((state) => state.App);
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log('profile result store:', store);
    dispatch(userProfileDetails(params.route.params.id)).then(
      (res) => {
        //setProfileDetails(res.payload)
        console.log('profile result:', res.payload);
      }
    );
    console.log('profile result store:', store);
  }, [isFocused]);

  useEffect(() => {
    console.log('store:', store);
    setProfileDetails(store.userDetails)
    setPosts(store.userDetails.profile_posts)
  }, [store]);

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#c" barStyle="dark-content" />
        <View style={styles.postsOuterContainer}>
          <View style={styles.postsInnerBottomContainer}>
            <FlatList
              data={posts}
              ListHeaderComponent = {
                () => {
                  return (
                    <View>
                      <UserProfile profile={profileDetails} navigation={navigation}/>
                      <Biography profile={profileDetails}/>
                      { profileDetails?.is_owner &&
                        <TouchableOpacity style={styles.createPostBtn} onPress={()=>{
                          navigation.navigate('CreatePost')
                        }}>
                          <Text style={styles.createPostBtnText}>+ Add Post</Text>
                        </TouchableOpacity>
                      }
                      {posts && posts.length > 0 && <View style={styles.postsInnerTopContainer}>
                        {
                          profileDetails?.is_owner ?
                          <Text style={{ fontSize: 16 }}>My Posts</Text>
                          :
                          <Text style={{ fontSize: 16 }}>User Posts</Text>
                        }
                      </View>}
                      
                      
                    </View>
                  )
                }
              }
              renderItem={({ item }) => (
                <Post navigation={navigation} post={item} />
              )}
              columnWrapperStyle={{padding: 2}}
              style = {styles.postsFlatList}
              numColumns={3}
              showsVerticalScrollIndicator={false}

              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  userOuterContainer: {
    backgroundColor: "#FCE5E4",
  },
  userPictureContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  userDetailsOuterContainer: {
    // backgroundColor: "rgba(255, 255, 255, 0.6)",
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1000100000,
  },
  userDetailsInnerLeftContainer: {
    //flex: 1,
    paddingLeft: 15,
    justifyContent: "space-around",
    marginVertical: 15,
  },
  userDetailsInnerRightContainer: {
    //flex: 1,
    alignItems: 'flex-end',
    marginTop: 35,
    marginRight: 25,
    
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 20
  },
  createPostBtn:{
    backgroundColor: 'black',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 20,
    width: 200,
    marginBottom: 20,
  },
  createPostBtnText:{
    color: 'white',
    fontSize: 16,
    textAlign: 'center',

  },
  biographyOuterContainer: {
    //flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
    padding: 35
  },
  biographyInnerTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  biographyInnerBottomContainer: {
    marginRight: 25,
  },
  postsOuterContainer: {
    backgroundColor: "#FFFFFF"
  },
  postsInnerTopContainer: {
    marginBottom: 15,
    paddingLeft: 35
  },
  postsInnerBottomContainer: {

  },
  post: {
    height: 110,
    width: '30%',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    
  },
  postImage: {
    height: 100,
    width: 100
  },
  likeBtnContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  unLikeBtnContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 10,
  },
  profileRoundImage: { 
    height: 100, 
    width: 100, 
    position: 'absolute', 
    bottom: -20, 
    left: 20, 
    borderRadius: 50, 
    borderWidth: 3, 
    borderColor: '#FFFFFF',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    elevation: 1,
    backgroundColor: '#FFFFFF',
  }
});

export const UserProfile = (params) => {
  //const [likeCount, setLikeCount] = useState(1500)
  //const [dislikeCount, setDisikeCount] = useState(200)
  const {profile, navigation} = params
  const logout = () => {
    storage.removeToken()
    navigation.replace('Log in')
  }
  return (
    <View style={styles.userOuterContainer}>
      <View>
        <Pressable onPress={()=>{navigation.goBack()}}
          style={{
            position: 'absolute',
            left: 15,
            top: 15,
            zIndex: 3,
          }}
        >
          <BackButton/>
        </Pressable>
        {profile?.is_owner &&
          <Pressable onPress={()=>{logout()}}
            style={{
              position: 'absolute',
              right: 15,
              top: 15,
              zIndex: 3,
            }}
          >
            <ExitIcon width={35} height={35}/>
          </Pressable>
        }
        <Pressable onPress={()=>{navigation.navigate('ProfileSetup')}}
          style={{
            position: 'absolute',
            right: 60,
            top: 15,
            zIndex: 3,
          }}
        >
          <SettingsIcon width={35} height={35}/>
        </Pressable>

      </View>
      <View style={styles.userPictureContainer}>
        <Image
          source={{ uri: profile?.profile_info?.cover_image }}
          style={{ height: '100%', width: '100%',zIndex: -1  }}
        >
        </Image>
        <Image
          source={{ uri: profile?.profile_info?.profile_image }}
          style={styles.profileRoundImage}
        >
        </Image>
        
      </View>
      
      
      <View style={styles.userDetailsOuterContainer}>
        <View style={styles.userDetailsInnerLeftContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {profile?.name}
          </Text>
          <Text style={{ fontSize: 12 }}>
          {profile?.profile_info?.city}, {profile?.profile_info?.country}
          </Text>
        </View>
        <View style={styles.userDetailsInnerRightContainer}>
          {
            !profile?.is_owner && (
              <View style={{marginBottom: 10}}>
                <TouchableOpacity onPress={()=>{ navigation.navigate('ChatDetails', {user_id:profile?.id}) }}> 
                  <Image source={require("./assets/chat-icon.png")}/>
                </TouchableOpacity>
              </View>
            )
          }
          {
            profile?.is_owner && (
              <View style={{marginBottom: 10}}>
                <TouchableOpacity onPress={()=>{ navigation.navigate('Settings') }}> 
                  <Text>Settings</Text>
                </TouchableOpacity>
              </View>
            )
          }
          
          <View style={{flexDirection: "row", }}>
            <TouchableOpacity style={styles.likeBtnContainer} onPress={()=>{}}>
              <Text style={{ fontSize: 14, paddingHorizontal: 5 }}>
                {profile.swipe_rights}
              </Text>
              {/* <Image source={require("./assets/like.png")}/> */}
              <LikeIcon/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.unLikeBtnContainer} onPress={()=>{}}> 
              <Text style={{ fontSize: 14, paddingRight: 5 }}>
                {profile.swipe_lefts}
              </Text>
              <DislikeIcon/>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </View>
  );
};

const Biography = ({profile}) => {
  return (
    <View style={styles.biographyOuterContainer}>
      <View style={styles.biographyInnerTopContainer}>
        <Text style={{ fontSize: 16 }}>
          Biography
        </Text>
      </View>
      <View style={styles.biographyInnerBottomContainer}>
        <Text style={{ fontSize: 11, textAlign: 'justify'}}>
          {profile?.profile_info?.bio}
        </Text>
      </View>
    </View>
  );
};

const Post = ({navigation, post}) => {
  return (
    <View style={[styles.post, {backgroundColor: post?.media?.[0]?.background}]}>
      <TouchableOpacity style={{flex:1, justifyContent: 'center',}} onPress={
        () => {
          navigation.navigate('PostDetailScreen', {id: post.id})
        }
      }>
          <Image
            source={{ uri: post?.media?.[0]?.image }}
            style={styles.postImage}
            resizeMode={'contain'}/>
      </TouchableOpacity>
    </View>
  );
}; 