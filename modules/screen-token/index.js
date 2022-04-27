import * as React from 'react';
import { Text, View, TextInput, TouchableHighlight,StyleSheet  } from 'react-native';


const Token= () => {
  return (
    <View style={styles.container}>
      <View style={styles.topHead}>
        <Text style={styles.mainHeading}>Token</Text>
      </View>
    <View style={styles.verification}>
        <Text style={styles.verificationText}>Verification</Text>
        <View style={styles.resendcodedetails}>
        <Text style={styles.resendcodeText}>4 digits PIN has been sent to your mail. </Text>
        <Text style={styles.resendcodeText}>Enter the code below to continue. <Text style={styles.boldText}>Resend code?</Text> </Text>
      </View>
      <View style={styles.pincodeArea}>
        <View style={styles.tokenFields}>
          <TextInput></TextInput>
        </View>
        <View style={styles.tokenFields}>
          <TextInput></TextInput>
        </View>
        <View style={styles.tokenFields}>
          <TextInput></TextInput>
        </View>
        <View style={styles.tokenFields}>
          <TextInput></TextInput>
        </View>
      </View>
    </View>

    <View style={styles.submitBtn}>
        <Button style={styles.submitButton}>Submit</Button>
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
  topHead: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    height:'20%',
  },
  mainHeading: {
    fontSize: 30,
    fontWeight:'bold',
  },
  container: {
    padding:20,
    height:'100%',
    flex:1,
    justifyContent:'space-between',
    backgroundColor:'#FFF'
  },
  verification: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'50%',
  },
  verificationText: {
    fontSize:22,
  },
  resendcodedetails: {
    paddingTop:10
  },
  resendcodeText: {
    color: 'rgba(0,0,0,0.5)'
  },
  boldText: {
    fontWeight:'bold',
    color: '#231F20'
  },
  pincodeArea:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:25,
  },
  tokenFields: {
    width:'16%',
    margin:5,
    borderColor:'#000000',
    borderWidth:1,
    borderRadius:10
  },
  submitBtn:{
    height:'30%',
    paddingLeft:20,
    paddingRight:20,
  },
});
export default {
  title: "Token",
  navigator: Token
}

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor='#DDDDDD'>
      <View style={[btnStyles.button, {
        backgroundColor: props.backgroundColor ? props.backgroundColor : '#000000',
        height: props.height ? props.height : 49,
        borderWidth: props.borderWidth ? props.borderWidth : 0,
        borderColor: props.borderColor ? props.borderColor : '#000000'
      }]}>
        <Text style={[btnStyles.text, {color: props.color ? props.color : '#ffffff'}]}>{props.children}</Text>
      </View>
    </TouchableHighlight>
  )
}

const btnStyles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15
  },
})

const Input = (props) => {

  return (
    <View>
      <TextInput
        style={inputStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num)=>props.setValue(num)}
        placeholderTextColor='#ddd'
        editable={props.editable === false? false : true}
      />
      {props.errorText ? <Text style={inputStyles.error}>{props.errorText}</Text> : null}
    </View>
  )
}

const inputStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 53,
    borderColor: '#C4C4C4',
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    borderWidth:1,
    paddingHorizontal: 15
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8,
  },
})