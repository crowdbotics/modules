
import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { sendVerification, verify2FA, verifyCode } from '../../api'
import Loader from '../../components/Loader'
import options from '../../options'


const Verification = (props) => {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [networkError, setNetworkError] = useState(false)

  useEffect(() => {
    async () => {
      if (options.user.method == '') {
        methodHandler()
      } else {
        await handleVerification()
      }
    }
  }, [])

  const clickHandler = async () => {
    try {
      setIsLoading(true)
      let response = null
      if (options.user.method == 'SMS') {
        response = await verifyCode({ code: +code, phone_number: options.user.phone_number })
      } else if (options.user.method == 'EMAIL') {
        response = await verifyCode({ code: +code, email: options.user.email })
      } else if (options.user.method == '2FA') {
        response = await verify2FA({ otp: code })
      }
      setIsLoading(false)
      if (response.ok) {
        props.navigation.navigate('Home')
      } else {
        setError(true)
      }
    } catch (error) {
      setIsLoading(false)
      setNetworkError(true)
    }
  }
  const handleVerification = async () => {
    setIsLoading(true)
    if (options.user.method == 'SMS') {
      await sendVerification({ phone_number: options.user.phone_number })
    } else if (options.user.method == 'EMAIL') {
      await sendVerification({ email: options.user.email })
    }
    setIsLoading(false)
  }

  const methodHandler = () => {
    props.navigation.navigate('AuthTypes')
  }

  return (
    <>
      {isLoading && <Loader />}
      <View style={styles.main}>
        <View>
          {options.user.method != "2FA" ?
            <Text style={styles.text}>Verification code has been sent to your {options.user.method == "SMS" ? `phone number, ${options.user.phone_number}` : `email, ${options.user.email}`}</Text>
            :
            <Text style={styles.text}>Enter your 6-digits code from Google Authenticator App</Text>
          }
          <Input
            label="Enter Code"
            returnKeyType="next"
            value={code}
            setValue={setCode}
            autoCapitalize="none"
            placeholder="Verification code"
            errorText={error && 'The code does not match' || networkError && 'Network Error'}
          />

          <View>
            <Button mode="contained" onPress={clickHandler}>
              Verify
            </Button>
          </View>
          {options.user.method != "2FA" &&
            <View style={styles.resend}>
              <Text>Didn't receive a code? </Text>
              <TouchableOpacity onPress={handleVerification}><Text style={styles.textPurple}>Resend</Text></TouchableOpacity>
            </View>
          }


        </View>
        <View style={{ paddingTop: 15 }}>
          <Button mode="contained" onPress={methodHandler}>
            Change 2FA method
          </Button>
        </View>
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
    alignContent: 'space-between',
    justifyContent: "space-between"
  },
  text: {
    marginBottom: 5,
    marginTop: 12,
    fontWeight: 'bold'
  },
  textPurple: {
    color: 'purple',
    fontWeight: 'bold'
  },
  resend: {
    paddingTop: 7,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})