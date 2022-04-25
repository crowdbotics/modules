import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, TouchableHighlight, Image } from "react-native";
// @ts-ignore
import edit from '../../edit.png'

const ProfileImage = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor='#DDDDDD'>
      <View style={styles.container}>
        <Image style={styles.image} resizeMode="contain" source={edit} />
      </View>
    </TouchableHighlight>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DADADA',
    height: 108,
    width: 108,
    borderRadius: 54,
    display: 'flex',
    alignItems: 'center'
  },
  image: {
    width: 43,
    marginTop: 21
  }
})
export default ProfileImage