import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'
import options from '../../options'
import Loader from '../../components/Loader'
import { smsVerification } from '../../api'
import { emailValidator } from '../../components/validators'

const Email = (props) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [networkError, setNetworkError]= useState(false)
  const [regError, setRegError] = useState(false)

  const clickHandler = async () => {
    setError(false)
    setNetworkError(false)
    setRegError(false)
    try {
      if (emailValidator(email)){
        const data = {phone_number: '', email }
        setIsLoading(true)
        const res = await smsVerification(data)
        if(res.ok){     
        props.navigation.navigate('Verification', { data})
        }else {
          setRegError(true)
        }
        setIsLoading(false)
        }else {
            setError(true)
        }
    } catch (error) {
      setIsLoading(false)
      setNetworkError(true)
    }
  }
  return (
    <>
      {isLoading && <Loader />}
      <View style={styles.main}>
        <Text style={styles.text}>Enter your Email</Text>
        <View style={options.styles.FlexRow}>

          <View style={styles.w100}>
            <Input
              label="Enter Email"
              returnKeyType="next"
              value={email}
              setValue={setEmail}
              autoCapitalize="none"
              placeholder="Enter your Email"
              errorText={error && 'Please enter a valid email address' || regError && 'Your Email is not registered' || networkError && 'Network Error'}
            />
          </View>
        </View>
        <Button mode="contained" onPress={clickHandler} style={styles.button}>
          Continue
        </Button>
      </View>
    </>
  )
}

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
  w100:{
    width: '100%'
  }

})

export default Email;