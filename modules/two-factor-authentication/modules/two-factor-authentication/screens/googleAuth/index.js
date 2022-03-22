import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Loader from '../../components/Loader'
import { getCode } from '../../api'
// @ts-ignore
import QRCode from 'react-native-qrcode-svg';
import options from '../../options';

const GoogleAuth = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState(false)
  const [key, setKey] = useState(false)
  const [link, setLink] = useState(false)

  useEffect(() => {
    getCode(options.user.id).then(res => {
      setKey(res.secret)
      setLink(res.link)
      setName(res.name)
      setIsLoading(false)
    }).catch(err => console.log('err', err))

  }, [])

  const clickHandlerDevice = async () => {

  }

  return (
      
    <View style={styles.main}>
      {isLoading ? <Loader /> : 
      <>
        <View>
          <View style={styles.sameDevice}>
            <TouchableOpacity onPress={clickHandlerDevice}>
              <Text style={styles.auth}>Set up on same device</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignSelf: 'center', paddingTop: 20 }}>
          <QRCode value={link} />
        </View>

        <View style={styles.credentials}>
          <Text style={[styles.text, styles.auth]}>Authenticator Credential</Text>
          <Text style={styles.text}>Account Name: {name} </Text>
          <Text style={styles.text}>Account Key: {key} </Text>
        </View>
        <Text style={[styles.text, styles.description]}>Please enter the above key in the authenticator app to get a code and verify.</Text>
      </>}
        
    </View>
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
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  credentials: {
    marginBottom: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  auth: {
    color: 'purple'
  },
  description: {
    fontSize: 10,
    color: 'purple'
  },
  sameDevice: {
    paddingTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})