import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, TouchableHighlight, Image } from "react-native";
import edit from "../../edit.png";

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
    backgroundColor: 'lightgray',
    height: 70,
    width: 70,
    borderRadius: 35,
    display: 'flex',
    alignItems: 'center'
  },
  image: {
    width: 20,
    marginTop: 4
  }
})
export default ProfileImage