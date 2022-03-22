import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { set2faMethod } from '../../api'
import Button from '../../components/Button'
import options from '../../options'

const AuthTypes = (props) => {

  const onSMS = async () => {
    await set2faMethod({
      id: options.user.id,
      method: "SMS"
    })
  }

  const onEmail = async () => {
    await set2faMethod({
      id: options.user.id,
      method: "EMAIL"
    })
  }

  const on2FA = () => {
    props.navigation.navigate('GoogleAuth')
  }

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Verification methods</Text>
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
        <Button onPress={on2FA}>
          2FA
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main:{
    padding: 10 
  },
  text: {
    marginBottom: 5,
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default AuthTypes;