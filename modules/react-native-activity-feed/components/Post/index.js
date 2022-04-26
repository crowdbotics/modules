import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, TouchableHighlight, Image, } from "react-native";
import editIcon from "../../edit.png";



const Post = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} style={styles.galleryPost} underlayColor='#DDDDDD'>
        <Image style={styles.editIcon} source={editIcon} />
    </TouchableHighlight>
  )
}
const styles = StyleSheet.create({
  galleryPost: {
  borderRadius:10,
  width:'100%',
  height:'100%',
  backgroundColor:'#FCF1D6',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  marginRight:5,
},
  editIcon: {
  height:35,
  width:35,
},


});
export default Post