import React from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput, TouchableOpacity
} from 'react-native'
import { Svg, Path } from "react-native-svg"
const item = {
  bgColor: '#FCF1D6',
  key: 1,
  text: 'Mauris ultrices ut mauris ut elementum nunc. Quisque eu vulputate nunc. Sed odio lectus.'
};
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function PostDetailScreen() {
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{ height: Dimensions.get('window').height }}
    >
      <PostComponent bgColor={item.bgColor} text={item.text} key={item.key} />
    </ScrollView>
  )
}

const stylesheet = StyleSheet.create({})

const PostComponent = ({ bgColor, text }) => {
  return (
    <KeyboardAwareScrollView style={{ margin: 10 }}>
      <View style={userPostStyles.usernameContainer}>
        <View style={userPostStyles.userImageContainer}>
          <Image
            source={require('./assets/tempImage.png')}
            style={userPostStyles.userImage}
          />
        </View>
        <Text style={userPostStyles.userText}>Username</Text>
      </View>
      <View
        style={[userPostStyles.userPostImage, { backgroundColor: bgColor }]}
      >
        <Image
          source={require('./assets/tempImage.png')}
          style={userPostStyles.postImage}
        />
      </View>
      <Text style={userPostStyles.postText}>{text}</Text>
      <View style={userPostStyles.postcontainer}>
        <View style={userPostStyles.leftContainer}>
          <Image
            source={require('./assets/like.png')}
            style={userPostStyles.imageIcons}
          />
          <Text style={userPostStyles.mh10}>56</Text>
          <Image
            source={require('./assets/comment.png')}
            style={userPostStyles.imageIcons}
          />
          <Text style={userPostStyles.mh10}>6</Text>
        </View>
        <Image
          source={require('./assets/group.png')}
          style={[userPostStyles.imageIcons, userPostStyles.mr10]}
        />
      </View>
      <CommentComponent />
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
    height: 20,
    width: 20,
  },
  userText: {
    color: '#3B566E'
  },
  userPostImage: {
    height: 170,
    width: '100%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  postImage: {
    height: 30,
    width: 30,
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

let comments = [
  {
    key: 1,
    username: 'Username',
    image: require('./assets/tempImage.png'),
    text: 'Mauris ultrices ut mauris ut elementum nunc. Quisque eu vulputate nunc. Sed odio lectus.',
    replies: [
      {
        key: 1,
        username: 'Username',
        image: require('./assets/tempImage.png'),
        text: 'Mauris ultrices ut mauris ut elementum nunc. Quisque eu vulputate nunc. Sed odio lectus.'
      }
    ]
  },
  {
    key: 2,
    username: 'Username',
    image: require('./assets/tempImage.png'),
    text: 'Mauris ultrices ut mauris ut elementum nunc. Quisque eu vulputate nunc. Sed odio lectus.',
    replies: [
      {
        key: 1,
        username: 'Username',
        image: require('./assets/tempImage.png'),
        text: 'Mauris ultrices ut mauris ut elementum nunc. Quisque eu vulputate nunc. Sed odio lectus.'
      }
    ]
  },
  {
    key: 3,
    username: 'Username',
    image: require('./assets/tempImage.png'),
    text: 'Mauris ultrices ut mauris ut elementum nunc. Quisque eu vulputate nunc. Sed odio lectus.',
    replies: [
      {
        key: 1,
        username: 'Username',
        image: require('./assets/tempImage.png'),
        text: 'Mauris ultrices ut mauris ut elementum nunc. Quisque eu vulputate nunc. Sed odio lectus.'
      }
    ]
  },
  {
    key: 3,
    username: 'Username',
    image: require('./assets/tempImage.png'),
    text: 'Mauris ultrices ut mauris ut elementum nunc. Quisque eu vulputate nunc. Sed odio lectus.',
    replies: [
      {
        key: 1,
        username: 'Username',
        image: require('./assets/tempImage.png'),
        text: 'Mauris ultrices ut mauris ut elementum nunc. Quisque eu vulputate nunc. Sed odio lectus.'
      }
    ]
  },
]
// comments = []
const CommentComponent = ({ bgColor, text }) => {
  return (
    <View style={{ margin: 5, marginBottom: 100, backgroundColor: 'white', padding: 10 }}>
      <Text>Comments</Text>
      {comments.map((item, index) => {
        return (
          <View style={commentStyles.commentContainer} key={item.key}>
            <View style={commentStyles.commentUserContainer}>
              <View style={commentStyles.commentUserImageContainer}>
                <Image
                  source={item.image}
                  style={commentStyles.commentUserImage}
                />
              </View>
              <Text style={commentStyles.commentUserText}>{item.username}</Text>
            </View>
            <Text style={commentStyles.commentText}>{item.text}</Text>
            <View style={userPostStyles.postcontainer}>
              <View style={userPostStyles.leftContainer}>
                <TouchableOpacity style={{ flexDirection: 'row', borderWidth:0, padding: 5 }}>
                  <Image
                    source={require('./assets/like.png')}
                    style={userPostStyles.imageIcons}
                  />
                  <Text style={userPostStyles.mh10}>56</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:0, padding: 5}}>
                <Image
                  source={require('./assets/group.png')}
                  style={[userPostStyles.imageIcons, userPostStyles.mr10]}
                /></TouchableOpacity>
              </View>
            </View>
            <View style={commentStyles.commentReplyContainer}>
              {item.replies.map((item, index) => {
                return (
                  <View
                    style={commentStyles.commentReplyContainer}
                    key={item.key}
                  >
                    <View style={commentStyles.commentReplyUserContainer}>
                      <View
                        style={commentStyles.commentReplyUserImageContainer}
                      >
                        <Image
                          source={item.image}
                          style={commentStyles.commentReplyUserImage}
                        />
                      </View>
                      <Text style={commentStyles.commentReplyUserText}>
                        {item.username}
                      </Text>
                    </View>
                    <Text style={commentStyles.commentReplyText}>
                      {item.text}
                    </Text>
                    <View style={userPostStyles.postcontainer}>
                      <View style={userPostStyles.leftContainer}>
                        <TouchableOpacity style={{ flexDirection: 'row', borderWidth:0, padding: 5 }}>
                          <Image
                            source={require('./assets/like.png')}
                            style={userPostStyles.imageIcons}
                          />
                          <Text style={userPostStyles.mh10}>56</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{borderWidth:0, padding: 5}}>
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
      <TextInput 
      style={commentStyles.replyInput}
      placeholder="Write a reply..."
      ></TextInput>
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
    height: 20,
    width: 20,
  },
  commentUserText: {
    color: '#3B566E',
    marginLeft: 10,
  },
  commentText: {
    color: '#6F8BA4',
    marginBottom: 10,
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
    height: 20,
    width: 20
  },
  commentReplyUserText: {
    color: '#3B566E',
    marginLeft: 10,
  },
  commentReplyText: {
    color: '#6F8BA4',
    marginBottom: 10,
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
    }
})
