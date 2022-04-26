import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, TouchableOpacity } from "react-native";
import Button from "../Button/index";

const Slider = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleOnPress = () => {
    const tmpCurrentSlide = currentSlide + 1
    if(tmpCurrentSlide == props.data.length ) {
      props.onFinish()
      return
    }
      
    setCurrentSlide(tmpCurrentSlide)
  }

  return (
    <View style={styles.container}>
      <View style={styles.onboardingArea}></View>
      <View style={styles.topHead}>
        <Text style={styles.mainHeading}>{props.data[currentSlide].heading}</Text>
      </View>
      <Text style={styles.paraHeading}>{props.data[currentSlide].description}</Text>

      <View style={styles.dots}>
        {props.data.map((item, index) => <View style={currentSlide == index ? styles.selectedDot : styles.dot} key={index}></View>)}
      </View>

      <View style={styles.continueButton}>
        <Button onPress={handleOnPress} style={styles.continueBtn}>Continue</Button>
      </View>
      {currentSlide > 0 && <TouchableOpacity onPress={props.onFinish}><Text style={styles.skipText}>Skip</Text></TouchableOpacity>}

    </View>
  )
}

const styles = StyleSheet.create({
  topHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '18%',
  },
  mainHeading: {
    fontSize: 44,
    fontWeight: '600',
  },
  container: {
    padding: 20,
    height: '100%',
    backgroundColor:'#FFF'
  },
  onboardingArea: {
    height: '50%',
  },
  paraHeading: {
    fontSize: 16,
    textAlign: 'center',
  },
  dots: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',

  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
    margin: 3,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    margin: 3,
  },
  continueButton: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  skipText: {
    textAlign: 'center',
    paddingTop: 20,
    fontSize: 18,
    fontWeight: '600'
  }
})
export default Slider 