
import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { verifyCode } from '../../api'
import Loader from '../../components/Loader'


const Verification = (props) => {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { phone_number, email } = props.route.params.data

  const clickHandler = async () => {
    setIsLoading(true)
    const detail = phone_number || email
    const credential= phone_number ? 'phone_number' : 'email'
    const data = await verifyCode({ code: +code, [credential]: detail })
    setIsLoading(false)
    if(data.Status == 200) {
      props.navigation.navigate('Home')
    } else {
      setError(true)
    }
  }

  return (
      <>
        {isLoading && <Loader/>}
        <View style={styles.main}>
          <Text style={styles.text}>Verification code has been set to your {phone_number ? `phone_number, ${phone_number}` : `email, ${email}` }</Text>
          <Input
            label="Enter Code"
            returnKeyType="next"
            value={code}
            setValue={setCode}
            autoCapitalize="none"
            placeholder="Verification code"
            errorText= {error && 'The code does not match'}
          />
          
          <Button mode="contained" onPress={clickHandler} style={styles.button}>
            Verify
          </Button>
      </View>
      </>
  )
}
export default Verification;


const styles = StyleSheet.create({
  main: {
    padding: 10,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-around'
  },
  text: {
    margin: 12,
    fontWeight: 'bold'
  },
  button: {
    margin: 12
  },

})