import React, { useEffect, useContext, useState, useRef } from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput, TouchableOpacity, Alert
} from 'react-native'
import { OptionsContext, GlobalOptionsContext } from "@options";
import { likePost, unLikePost } from "../api";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ActionSheet from "react-native-actionsheet";


export default function PostDetailScreen({ navigation, route }) {
  const actionSheet = useRef(null);
  const { id } = route.params;
  const [postDetails, setPostDetails] = React.useState({});
  const gOptions = useContext(GlobalOptionsContext);
  const BASE_URL = gOptions.url
  const [loading, setLoading] = React.useState(true);
  const [PostOptions, setPostOptions] = React.useState(["Report Post", "Cancel"]);
  const baseOptions = ["Report Post", "Cancel",];

  useEffect(() => {
    fetch(`${BASE_URL}/modules/social-feed/post/${id}/`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token cf1b4cf39330a955ba203ddbfefa2e6707006f64'
      }
    })
      .then((response) => response.json())
      .then((json) => setPostDetails(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
 
  }, [loading]);
  

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{ height: Dimensions.get('window').height }}
    >
      <ActionSheet
        ref={actionSheet}
        title={"Take Action"}
        options={PostOptions}
        cancelButtonIndex={1}
        onPress={async (index) => {
          let res;
          switch (index) {
            case 0:
              res = await pickFromCamera();
              break;
            case 1:
              res = await pickFromGallery(cropWidth=400, cropHeight=230);
              break;
          }
        }}
      />
      <PostComponent postDetails={postDetails} setLoading={setLoading} 
      navigation={navigation} actionSheet={actionSheet}
      baseOptions={baseOptions} setPostOptions={setPostOptions}
      />
    </ScrollView>
  )
}


const stylesheet = StyleSheet.create({})



const likeComment = (id, url, setLoading) => {
  setLoading(true)
  fetch(`${url}/modules/social-feed/like-comment/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token cf1b4cf39330a955ba203ddbfefa2e6707006f64'
    },
    body: JSON.stringify({
      comment_id: id
    })
  })
    .then((response) => response.json())
    .then((json) => console.log(json, 'like'))
    .catch((error) => console.log(error))
    .finally(() => setLoading(false));
}

const unLikeComment = (id, url, setLoading) => {
  setLoading(true)
  fetch(`${url}/modules/social-feed/unlike-comment/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token cf1b4cf39330a955ba203ddbfefa2e6707006f64'
    },
    body: JSON.stringify({
      comment_id: id
    })
  })
    .then((response) => response.json())
    .then((json) => console.log(json, 'like'))
    .catch((error) => console.log(error))
    .finally(() => setLoading(false));
}
const PostComponent = ({postDetails, setLoading, navigation, actionSheet, baseOptions, setPostOptions}) => {
  const gOptions = useContext(GlobalOptionsContext);
  const BASE_URL = gOptions.url

  const { bgColor, caption, media, description, upvotes, comments, comments_count, user, id, liked, is_owner } = postDetails
  return (
    <KeyboardAwareScrollView style={{ margin: 10 }}>
      
      <View style={{flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between'}}>

        <TouchableOpacity style={userPostStyles.usernameContainer} onPress={()=>{navigation.navigate("SocialProfileScreen", {id: user?.id})}}>
          <View style={userPostStyles.userImageContainer}>
            <Image
              source={user?.photo ? { uri: user.photo } : require('./assets/user.png')}
              style={userPostStyles.userImage}
            />
          </View>
          <Text style={userPostStyles.userText}>{user?.name || ""}</Text>
        </TouchableOpacity>
        <View style={{justifyContent: 'space-evenly'}}>
          <TouchableOpacity onPress={()=>{
            is_owner && setPostOptions([...baseOptions, "Delete Post"]);
            setTimeout(()=>{
              actionSheet.current.show();
            }, 100)
            
            }}>
            <Image
                source={require('./assets/dots.png')}
                style={{marginTop: -20}}
              />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[userPostStyles.userPostImage, { backgroundColor: bgColor? bgColor : '#c3aaac' }]}
      >
        <Image
          source={{ uri: media?.[0]?.image }}
          style={userPostStyles.postImage}
        />
      </View>
      <Text style={userPostStyles.postText}>{description}</Text>
      <View style={userPostStyles.postcontainer}>
        <View style={userPostStyles.leftContainer}>
          <TouchableOpacity onPress={()=>{
            liked ? 
            unLikePost(id, BASE_URL, setLoading)
            : 
            likePost(id, BASE_URL, setLoading)
          }} style={{flexDirection: 'row'}} >
            <Image
              source={liked ? require('./assets/unlike.png'): require('./assets/like.png')}
              style={userPostStyles.imageIcons}
            />
            <Text style={userPostStyles.mh10}>{upvotes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Image
              source={require('./assets/comment.png')}
              style={userPostStyles.imageIcons}
            />
            <Text style={userPostStyles.mh10}>{comments_count}</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('./assets/group.png')}
          style={[userPostStyles.imageIcons, userPostStyles.mr10]}
        />
      </View>
      <CommentComponent comments={comments || []} setLoading={setLoading} postId={id} navigation={navigation} />
    </KeyboardAwareScrollView>
  )
}
const userPostStyles = StyleSheet.create({
  usernameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
  userImageContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  userImage: {
    height: 15,
    width: 15,
  },
  userText: {
    color: '#3B566E',
    marginLeft: 0
  },
  userPostImage: {
    height: 230,
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageIcons: {
    height: 12,
    width: 12,
  },
  mh10: {
    marginHorizontal: 10,
  },
  postText: {
    display: 'flex',
    justifyContent: 'center',
    color: '#6F8BA4',
    marginVertical: 10,
  },
  mr10: {
    marginRight: 10,
  },
})

const CommentComponent = ({ comments, setLoading, postId, navigation}) => {
  const gOptions = useContext(GlobalOptionsContext);
  const BASE_URL = gOptions.url
  console.log(comments, 'comments')
  const [comment, setComment] = useState('');
  const [refComment, setRefComment] = useState('');
  const submitComment = (post_id) => {
    setLoading(true)
    fetch(`${BASE_URL}/modules/social-feed/post-comment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token cf1b4cf39330a955ba203ddbfefa2e6707006f64'
      },
      body: JSON.stringify({
        comment: comment,
        ref_comment: refComment,
        post_id: post_id
      })
    })
      .then((response) => response.json())
      .then((json) => console.log(json, 'comment'))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

    setComment("")
    setRefComment("")
  }


  return (
    <View style={{ margin: 5, marginBottom: 100, backgroundColor: 'white', padding: 10 }}>
      <Text>Comments</Text>
      {comments.map((item, index) => {
        return (
          <View style={commentStyles.commentContainer} key={item.key}>
            <View style={{flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between'}}>
              <TouchableOpacity style={commentStyles.commentUserContainer} onPress={()=>{navigation.navigate("SocialProfileScreen", {id: item?.user?.id})}}>
                <View style={commentStyles.commentUserImageContainer}>
                  <Image
                    source={item?.user?.photo ? { uri: item.user.photo } : require('./assets/user.png')}
                    style={commentStyles.commentUserImage}
                  />
                </View>
                <Text style={commentStyles.commentUserText}>{item?.user?.name}</Text>
              </TouchableOpacity>
            

              <View style={{justifyContent: 'flex-end'}}>
                <TouchableOpacity>
                  <Image
                      source={require('./assets/dots.png')}
                      style={{marginTop: -20}}
                    />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={commentStyles.commentText}>{item.comment}</Text>
            <View style={userPostStyles.postcontainer}>
              <View style={userPostStyles.leftContainer}>
                <TouchableOpacity onPress={()=>{
                  item.liked ? 
                  unLikeComment(item.id,BASE_URL, setLoading)
                  : 
                  likeComment(item.id,BASE_URL, setLoading)
                }} style={{ flexDirection: 'row', borderWidth:0, padding: 5 }}>
                  <Image
                    source={item.liked ? require('./assets/unlike.png'): require('./assets/like.png')}
                    style={userPostStyles.imageIcons}
                  />
                  <Text style={userPostStyles.mh10}>{item.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:0, padding: 5}} onPress={()=>{setRefComment(item.id); setComment("@"+item.user.name)}}>
                <Image
                  source={require('./assets/group.png')}
                  style={[userPostStyles.imageIcons, userPostStyles.mr10]}
                /></TouchableOpacity>
              </View>
            </View>
            <View style={commentStyles.commentReplyContainer}>
              {item.children.map((item, index) => {
                return (
                  <View
                    style={commentStyles.commentReplyContainer}
                    key={item.key}
                  ><View style={{flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between'}}>
                      <TouchableOpacity style={commentStyles.commentReplyUserContainer} onPress={()=>{navigation.navigate("SocialProfileScreen", {id: item?.user?.id})}}>
                        <View
                          style={commentStyles.commentReplyUserImageContainer}
                        >
                          <Image
                            source={item?.user?.photo ? { uri: item.user.photo } : require('./assets/user.png')}
                            style={commentStyles.commentReplyUserImage}
                          />
                        </View>
                        <Text style={commentStyles.commentReplyUserText}>
                            {item?.user?.name}
                        </Text>
                      </TouchableOpacity>
                        <View style={{justifyContent: 'flex-end'}}>
                          <TouchableOpacity>
                            <Image
                                source={require('./assets/dots.png')}
                                style={{marginTop: -20}}
                              />
                          </TouchableOpacity>
                          </View>
                    </View>
                    <Text style={commentStyles.commentReplyText}>
                    {item.comment}
                    </Text>
                    <View style={userPostStyles.postcontainer}>
                      <View style={userPostStyles.leftContainer}>
                        <TouchableOpacity onPress={()=>{
                          item.liked ? 
                            unLikeComment(item.id,BASE_URL,  setLoading)
                            : 
                            likeComment(item.id,BASE_URL,  setLoading)
                        }} style={{ flexDirection: 'row', borderWidth:0, padding: 5 }}>
                          <Image
                            source={item.liked ? require('./assets/unlike.png'): require('./assets/like.png')}
                            style={userPostStyles.imageIcons}
                          />
                          <Text style={userPostStyles.mh10}>{item.likes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{borderWidth:0, padding: 5}} onPress={()=>{setRefComment(item.id); setComment("@"+item.user.name)}}>
                          <Image
                            source={require('./assets/group.png')}
                            style={[
                              userPostStyles.imageIcons,
                              userPostStyles.mr10
                            ]}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )
      })}
      <View style={{flexDirection: 'row', marginHorizontal: -25,}}>
        <TextInput 
        style={[commentStyles.replyInput, {flex: 0.8}, ]}
        placeholder="Write a reply..."
        onChangeText={newText => setComment(newText)}
        defaultValue={comment}
        ></TextInput>
        <TouchableOpacity onPress={()=>{comment && submitComment(postId)}} style={[commentStyles.sendBtn, !comment && {backgroundColor: 'lightgray'}]}>
          <Image
            source={require('./assets/send.png')}
            style={userPostStyles.userImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
};

const commentStyles = StyleSheet.create({
  commentContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  commentUserContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentUserImageContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  commentUserImage: {
    height: 15,
    width: 15,
  },
  commentUserText: {
    color: '#3B566E',
    marginLeft: 0,
  },
  commentText: {
    color: '#6F8BA4',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5
  },
  commentReplyContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  commentReplyUserContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentReplyUserImageContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    
  },
  commentReplyUserImage: {
    height: 15,
    width: 15,
  },
  commentReplyUserText: {
    color: '#3B566E',
    marginLeft: 0,
  },
  commentReplyText: {
    color: '#6F8BA4',
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5
  },
  replyInput: {
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#F9FAFC',
  },
  replyButton: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  sendBtn:{
    borderRadius: 8, 
    paddingVertical: 10, justifyContent: 'center', alignItems: 'center',
    flex: 0.16, marginVertical: 10, backgroundColor: '#0c0c0c', 
    
  }
})
