import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'
import CountryCode from '../../components/CountryCode'
import options from '../../options'
import { smsVerification } from '../../api'
import Loader from '../../components/Loader'
import { phoneValidator } from '../../components/validators'

const EnterNumber = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('US')
  const [callingCode, setCallingCode] = useState('1')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [regError, setRegError] = useState(false)
  const [networkError, setNetworkError]= useState(false)

  const clickHandler = async () => {
    setError(false)
    setNetworkError(false)
    setRegError(false)
    try {
      if(phoneValidator(phoneNumber)){
        const PhoneNumber = `+${callingCode}${phoneNumber}`
        const data = { phone_number: PhoneNumber, email:'' }
        setIsLoading(true)
        const res = await smsVerification(data)
        if(res.ok) {
          props.navigation.navigate('Verification', { data })
        } else {
          setRegError(true)
        }
        setIsLoading(false)
      } else {
        setError(true)
      }
    } catch (error) {
      setIsLoading(false)
      setNetworkError(true)
    }
  }

  const onCountrySelect = (country) => {
    setCode(country.cca2)
    setCallingCode(country.callingCode)
  }

  return (
    <>
      {isLoading && <Loader />}
      <View style={styles.main}>
        <Text style={styles.text}>Enter your Phone Number</Text>
        <View style={options.styles.FlexRow}>
          <View style={styles.countryCode}>
            <CountryCode code={code} onCountrySelect={onCountrySelect} />
          </View>
          <View style={styles.input}>
            <Input
              label="Enter Code"
              returnKeyType="next"
              value={phoneNumber}
              setValue={setPhoneNumber}
              autoCapitalize="none"
              placeholder="Enter your Phone Number"
              errorText={error && 'Please enter a valid phone number' || regError && 'Your Phone number is not registered' || networkError && 'Network Error'}

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
  input:{ 
    width: "75%" 
  },
  text: {
    margin: 12,
    fontWeight: 'bold'
  },

  button: {
    margin: 12
  },
  countryCode: { 
    width: "25%", 
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'center' 
  }

})

export default EnterNumber;