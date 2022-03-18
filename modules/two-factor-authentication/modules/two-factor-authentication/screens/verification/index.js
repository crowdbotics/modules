
import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { smsVerification, verifyCode } from '../../api'
import Loader from '../../components/Loader'
import options from '../../options'


const Verification = (props) => {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [networkError, setNetworkError]= useState(false)
  const { phone_number, email } = props.route.params.data

  const clickHandler = async () => {
    try {
      setIsLoading(true)
      const detail = phone_number || email
      const credential= phone_number ? 'phone_number' : 'email'
      const data = await verifyCode({ code: +code, [credential]: detail })
      console.log(data)
      setIsLoading(false)
      if(data.ok) {
        props.navigation.navigate('Home')
      } else {
        setError(true)
      }      
    } catch (error) {
      setIsLoading(false)
      setNetworkError(true)
    }
  }
  const clickHandlerResend= async ()=>{
    setIsLoading(true)
    await smsVerification(props.route.params.data)
    setIsLoading(false)
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
            errorText= {error && 'The code does not match' || networkError && 'Network Error'}
          />
          
          <View>
            <Button mode="contained" onPress={clickHandler}>
              Verify
            </Button>
          </View>
          <View style={styles.resend}>            
              <Text>Didn't receive a code? </Text>
              <TouchableOpacity onPress={clickHandlerResend}><Text style={styles.textPurple}>Resend</Text></TouchableOpacity>
            
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
    alignContent: 'space-around'
  },
  text: {
    margin: 12,
    fontWeight: 'bold'
  },
  textPurple: {
    color:'purple',
    fontWeight: 'bold'
  },
  resend:{
    paddingTop:7,
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
    

})