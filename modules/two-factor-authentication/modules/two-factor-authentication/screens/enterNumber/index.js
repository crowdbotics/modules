


import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'
import CountryCode from '../../components/CountryCode'
import options from '../../options'
import { smsVerification } from '../../api'
import Loader from '../../components/Loader'

const EnterNumber = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('US')
  const [callingCode, setCallingCode] = useState('1')
  const [isLoading, setIsLoading] = useState(false)

  const clickHandler = async () => {
    const PhoneNumber = `+${callingCode}${phoneNumber}`
    const data = { phone_number: PhoneNumber }
    setIsLoading(true)
    await smsVerification(data)
    setIsLoading(false)
    props.navigation.navigate('Verification', {
      data
    })
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
          <View style={{ width: "25%", display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <CountryCode code={code} onCountrySelect={onCountrySelect} />
          </View>
          <View style={{ width: "75%" }}>
            <Input
              label="Enter Code"
              returnKeyType="next"
              value={phoneNumber}
              setValue={setPhoneNumber}
              autoCapitalize="none"
              placeholder="Enter your Phone Number"

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
  }
})

export default EnterNumber;