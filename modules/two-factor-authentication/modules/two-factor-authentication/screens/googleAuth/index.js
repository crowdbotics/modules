import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Linking } from 'react-native'
import Loader from '../../components/Loader'
import { getCode } from '../../api'
// @ts-ignore
import QRCode from 'react-native-qrcode-svg';
import options from '../../options';
import Button from '../../components/Button';

const GoogleAuth = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState(false)
  const [key, setKey] = useState(false)
  const [link, setLink] = useState('')

  const openLink = () =>{
    const supported = Linking.canOpenURL(link);
    if (supported) {
      Linking.openURL(link);
    }
  }

  useEffect(() => {
    getCode(options.user.id).then(res => {
      setKey(res.secret)
      setLink(res.link)
      setName(res.name)
      setIsLoading(false)
    }).catch(err => err)

  }, [])

  return (    
    <View style={styles.main}>
      {isLoading ? <Loader /> : 
      <>
        <View>
          <View style={styles.sameDevice}>
            <Button onPress={openLink}>
              Set up on same device
            </Button>
          </View>
        </View>
        <View style={styles.pt30}>
          <QRCode value={link} size={150}/>
        </View>
        <View style={styles.pt30}>
          <Text style={[styles.text, styles.description]}>Please enter the below credentials in the Google authenticator app to get a code and verify.</Text>
        </View>


        <View style={styles.credentials}>
          <Text style={ styles.auth}>Authenticator Credential</Text>
          <Text style={styles.text}>Account Name: {name} </Text>
          <Text style={styles.text}>Account Key: {key} </Text>
        </View>
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
    fontWeight: 'bold'
  },
  credentials: {
    paddingTop: 12,
    marginBottom: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  auth: {
    color: '#2E5984',
    fontSize: 15,
  },
  description: {
    fontSize: 15,
    color: '#2E5984',
    fontWeight: 'bold'
  },
  sameDevice: {
    paddingTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pt30:{
    paddingTop:30, 
    alignSelf:'center'
  }
})