import React, {useState} from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { set2faMethod } from '../../api'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import options from '../../options'

const AuthTypes = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  
  const onSMS = async () => {
    setIsLoading(true)
    await set2faMethod({
      id: options.user.id,
      method: "SMS"
    })
    setIsLoading(false)
    props.navigation.navigate('Verification')
  }

  const onEmail = async () => {
    setIsLoading(true)
    await set2faMethod({
      id: options.user.id,
      method: "EMAIL"
    })
    setIsLoading(false)
    props.navigation.navigate('Verification')
  }

  const on2FA = async() => {
    setIsLoading(true)
    await set2faMethod({
      id: options.user.id,
      method: "2FA"
    })
    setIsLoading(false)
    props.navigation.navigate('GoogleAuth')
  }

  return (
    <>
      {isLoading && <Loader/>}
      <View style={styles.main}>
        <Text style={styles.text}>Verification methods</Text>
        <Text style={styles.text13}>Please select an option for verification from the following:</Text>
        <View style={options.styles.FlexRowSpaceBetween}>
          <View style={[options.styles.wp50, options.styles.p5]}>
            <Button onPress={onSMS} clicked={options.user.method=='SMS' ? true : false}>
              SMS
            </Button>
          </View>
          <View style={[options.styles.wp50, options.styles.p5]}>
            <Button onPress={onEmail} clicked={options.user.method=='EMAIL' ? true : false}>
              Email
            </Button>
          </View>
        </View>
        <View style={[options.styles.wp100, options.styles.p5]}>
          <Button onPress={on2FA} clicked={options.user.method=='2FA' ? true : false}>
            2FA
          </Button>
        </View>
      </View>
    </>  
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
  },
  text13:{
    fontSize: 13,
    marginBottom:12
  }


})

export default AuthTypes;