import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
// import QRCode from 'react-native-qrcode-svg';


const GoogleAuth= (props) => {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const clickHandler = async () => {
    // try {
    //   setIsLoading(true)
    //   const detail = phone_number || email
    //   const credential= phone_number ? 'phone_number' : 'email'
    //   const data = await verifyCode({ code: +code, [credential]: detail })
    //   setIsLoading(false)
    //   if(data.ok) {
    //     props.navigation.navigate('Home')
    //   } else {
    //     setError(true)
    //   }      
    // } catch (error) {
    //   setIsLoading(false)
    //   setNetworkError(true)
    // }
  }
  const clickHandlerDevice= async ()=>{

  }

  return (
      <>
        {isLoading && <Loader/>}
        <View style={styles.main}>
            <View>             
                <Input
                    label="Enter Code"
                    returnKeyType="next"
                    value={code}
                    setValue={setCode}
                    autoCapitalize="none"
                    placeholder="Verification code"
                    errorText= {error && 'The code does not match'}
                />
                
                <View>
                    <Button mode="contained" onPress={clickHandler}>
                    Verify
                    </Button>
                </View>
                <View style={styles.sameDevice}>            
                  <TouchableOpacity onPress={clickHandlerDevice}>
                    <Text style={styles.auth}>Set up on same device</Text>
                  </TouchableOpacity>            
                </View>
            </View>
            {/* <QRCode value="http://awesome.link.qr"/> */}

            <View style={styles.credentials}>
              <Text style={[styles.text, styles.auth]}>Authenticator Credential</Text> 
              <Text style={styles.text}>name: xyz</Text>
              <Text style={styles.text}>Account Key: 12345678 </Text>
            </View>
            <Text style={[styles.text, styles.description]}>Please enter the above key in the authenticator app to get a code and verify.</Text>

          {/* <View style={styles.resend}>            
              <Text>Didn't receive a code? </Text>
              <TouchableOpacity onPress={clickHandlerResend}><Text style={styles.textPurple}>Resend</Text></TouchableOpacity>
            
          </View> */}
        </View>
      </>
  )
}
export default GoogleAuth;


const styles = StyleSheet.create({
  main: {
    padding: 10,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-around',
    justifyContent: 'space-between'
  },
  text: {
    fontSize:15,
    fontWeight:'bold'
  },
  credentials:{ 
    height:'50%', 
    display:'flex', 
    flexDirection: 'column', 
    justifyContent:'center', 
    alignItems:'center'
  },
  auth:{
    color: 'purple'
  },
  description: {
    fontSize:10, 
    color:'purple'
  },
  sameDevice:{
    paddingTop:15,
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center'
  }
    

})