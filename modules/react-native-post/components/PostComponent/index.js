import React from 'react';
import {View,Text,Image} from 'react-native'
import tempImage from '../../tempImage.png'
import like from '../../like.png'
import comment from '../../comment.png'
import group from '../../group.png'
import options from '../../options';

const PostComponent=({bgColor,text})=>{
  return (
    <View>
      <View style={options.styles.usernameContainer}>
        <View style={options.styles.userImageContainer}>
          <Image
          source={tempImage}
          style={options.styles.userImage}
          />
        </View>
        <Text style={options.styles.userText}>Username</Text>
      </View>
      <View style={[options.styles.userPostImage, {backgroundColor:bgColor}]}>
        <Image
          source={tempImage}
          style={options.styles.postImage}
        />
      </View>
      <View style={options.styles.postcontainer}>
        <View style={options.styles.leftContainer}>
          <Image
            source={like}
            style={options.styles.imageIcons}
          />
          <Text style={options.styles.mh10}>56</Text>
          <Image
            source={comment}
            style={options.styles.imageIcons}
          />
          <Text style={options.styles.mh10}>6</Text>
        </View>
        <Image    
          source={group}
          style={[options.styles.imageIcons,options.styles.mr10]} 
        />
      </View>
      <Text style={options.styles.postText}>{text}</Text>
    </View>
  )
}

export default PostComponent