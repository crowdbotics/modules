import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import plus from './plus.png'
import options from './options';
import PostComponent from './components/PostComponent';


const Post = () => {
  return (
    
    <ScrollView>
      <View style={options.styles.container}>
        <View style={options.styles.headerContainer}>
          <Image
            source={plus}
            style={options.styles.headerImage}
          />
        </View>
        {options.data.map((item) => <PostComponent bgColor={item.bgColor} text={item.text} key={item.key} />)}
      </View>
    </ScrollView>
  
  )
};

export default {
  title: "Post",
  navigator: Post
}
