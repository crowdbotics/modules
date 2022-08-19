import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { signupRequest } from "../../api/redux";
import {showError} from "../../api/errorMessage";

import Button from "../../components/Button";

export const  signUp = (props) => {
  console.log("signUp props", props);
  const {navigation } = props;
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useDispatch();
  // navigation.navigate('Home')

  const doSomething = () => {
      // navigation.navigate('Home')
      if (password1 !== password2) {
        Alert.alert(
          "Something went wrong",
          "Passwords do not match",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
        return;
      }

      dispatch(signupRequest({ email: email, password:password1 }))
      .then((res)=> {
        if (res?.error){
          showError(res.error);
        }else{
          console.log("result signup", res)
          let result = res.payload;
          if (result?.id) {
              navigation.replace('Log in');
          }
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <View style={styles.container}>
      <View>
          <Text style={styles.text}>Sign up</Text>
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
            onChangeText={newText => setPassword1(newText)}
            defaultValue={password1}
            placeholder="Password"
            secureTextEntry={true}
            maxLength={20}
          />
          <Text style={styles.subText}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={Text}
            onChangeText={newText => setPassword2(newText)}
            defaultValue={password2}
            placeholder="Password"
            secureTextEntry={true}
            maxLength={20}
          />  

      </View>
      <Button title="Sign Up" onPress={()=>{ doSomething()  }}
            btnContainerStyle={styles.buttonContainer}
            btnTextStyle={styles.btnText}
            btnStyle={styles.btn}
      />
     
      <Text style={styles.grey}>Or</Text>
      <View style={styles.signupcontainer}>
      <Text style={styles.haveAccount}>Already have an account?</Text>
      <TouchableOpacity onPress={()=> {navigation.navigate('Log in')}} >
              <Text style={styles.loginBtnTxt}>
              Log in
              </Text>
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
    flexDirection:'row',
  },
  grey:{
    fontSize: 13,
    fontWeight: '400',
    color: "gray",
    textAlign: 'center',
    marginTop: 10,
  },
  button:{
    borderRadius:10,
    padding: 10,
    backgroundColor: 'red'
  },
  btn: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30
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
    backgroundColor: "white"
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
  loginBtnTxt: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  }
})
