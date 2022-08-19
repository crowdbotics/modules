import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../api/redux";
import { storage } from "@modules/storage";
import { showError } from "../../api/errorMessage";
import CheckBox from '@react-native-community/checkbox';

import Button from "../../components/Button";

export const loginScreen = (props) => {

  const {navigation } = props;
  const [email, setEmail] = useState('shahraiz@cb.com');
  const [password, setPassword] = useState('Admin123');
  const [showTextEntry, setShowTextEntry] = useState(false);
  const dispatch = useDispatch();
  // navigation.navigate('Home')

  const doSomething = () => {
      // navigation.navigate('Home')
      dispatch(loginRequest({ username: email, password }))
      .then((res)=> {
        console.log("result login  ---- ", res)
        if (res?.error){
          showError(res.error);
        }else{
          let result = res.payload;
          if (result.token) {
              console.log("shahraiz@cb.com", result.token);
              storage.setToken(result.token);
              navigation.replace('Home');
          }
        }
      })
      .catch((err) => {
        console.log("error during login", err)
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Log in</Text>
        <Text style={styles.subText}>Email address</Text>
        <TextInput
          style={styles.input}
          value={Text}
          placeholder="Email"
          onChangeText={newText => setEmail(newText)}
          defaultValue={email}
          maxLength={30}
        />
        <Text style={styles.subText}>Password</Text>
        <TextInput
          style={styles.input}
          value={Text}
          onChangeText={newText => setPassword(newText)}
          defaultValue={password}
          placeholder="Password"
          secureTextEntry={!showTextEntry}
          maxLength={20}
        />
      </View>
      <View style={styles.subTextContainer}>
        <TouchableOpacity 
          onPress={() => setShowTextEntry(!showTextEntry)}
        style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <CheckBox
              style={styles.showPassCheckbox}
              disabled={false}
              value={showTextEntry}
              onValueChange={(newValue) => setShowTextEntry(newValue)}
            />
            <Text>
              Show Password
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> { navigation.navigate('forgot') }}>
          <Text>
          Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
      <Button title="Login" onPress={()=>{ doSomething()  }} 
              btnStyle={styles.btn} txtStyle={styles.btnText} 
              btnContainerStyle={styles.buttonContainer}
              />
      <Text style={styles.grey}>Or</Text>
      <View style={styles.signupcontainer}>
      <Text style={styles.haveAccount}>Dont have an account?</Text>
      <TouchableOpacity onPress={()=> { navigation.navigate('Sign up') }}>
        <Text style={styles.signUpBtnTxt}>Sign up</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  signupcontainer:{
    flexDirection:'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent:'center',
  },
  sign:{
    fontSize: 18,
    fontWeight: '400',
    color: "black",
    padding: 13,
    textAlign: 'center',
  },
  grey:{
    fontSize: 13,
    fontWeight: '400',
    color: "gray",
    textAlign: 'center',
    marginTop: 30
  },
  button:{
    borderRadius:10,
    padding: 10,
    backgroundColor: 'red',
    
  },
  showPassCheckbox:{
    marginRight: 10,
    marginLeft: 10,
    height: 20,
    width: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  btn: {
    width: 300,
    height: 49,
  },
  btnText: {
    color: 'white',
  },
  underText:{
    fontSize: 14,
    fontWeight: '400',
    color: "black",
    padding: 13,

  },
  subTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingTop: 20
  },  
  input: {
    borderRadius: 10,
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 15,
    borderColor: '#C4C4C4'
  },

  subText:{
    fontSize: 14,
    padding:10,
    fontWeight: '400',
    color: "black",
    textAlign: 'left'
  },
  container: {
    flex: 1,
    height: 100,
    padding: 13,
    backgroundColor: "white",
    justifyContent: "center",
  },
  text: {
    fontSize: 42,
    fontWeight: '700',
    color: "black",
    textAlign: 'center',
    paddingVertical:50
  },
  haveAccount: {
    fontSize: 16,
    color: "#6B6B6B"
  },
  signUpBtnTxt: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  }
})



