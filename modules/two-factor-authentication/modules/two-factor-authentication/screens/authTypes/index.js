import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Button from '../../components/Button'
import options from '../../options'

const AuthTypes = (props) => {

  const onSMS = () => {
    props.navigation.navigate('EnterNumber')
  }

  const onEmail = () => {
  }

  const onAuthy = () => {
  }

  return (
    <View style={{ padding: 10 }}>
      <Text style={styles.text}>Verify through</Text>
      <View style={options.styles.FlexRowSpaceBetween}>
        <View style={[options.styles.wp50, options.styles.p5]}>
          <Button onPress={onSMS}>
            SMS
          </Button>
        </View>
        <View style={[options.styles.wp50, options.styles.p5]}>
          <Button onPress={onEmail}>
            Email
          </Button>
        </View>
      </View>
      <View style={[options.styles.wp100, options.styles.p5]}>
        <Button onPress={onAuthy}>
          Authy
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    margin: 12,
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default AuthTypes;