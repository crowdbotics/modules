import React, { useEffect, useState } from "react"
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert, 
  KeyboardAvoidingView, // Import KeyboardAvoidingView
} from "react-native"
import { useDispatch } from "react-redux"
import { login } from "../../store/custom/auth.slice"
import { unwrapResult } from "@reduxjs/toolkit"
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState(__DEV__ ? "saad.abid" : "")
  const [password, setPassword] = useState(__DEV__ ? "XmVv3SPTY2" : "")

  const dispatch = useDispatch()

  useEffect(() => {
    EncryptedStorage.getItem('authToken')
      .then((token) => {
        console.log("token222", token)
        if (token) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'homeScreen' }],
          });
        }
      })
      .catch((error) => {
        console.error('Token retrieval error:', error);
      });
  }, []);


  const onLoginPress = () => {
    setLoading(true)
    if (userName && password) {
      dispatch(
        login({
          username: userName,
          password
        })
      ).then((resultAction) => {
          const data = unwrapResult(resultAction);
      
          // Store the token securely using EncryptedStorage
          if (data.token) {
            EncryptedStorage.setItem('authToken', data.token)
              .then(() => {
                setLoading(false);
                Alert.alert('Success', 'Login Successful!');
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'homeScreen' }],
                });
              })
              .catch((storageError) => {
                setLoading(false);
                console.error('Token storage error:', storageError);
                // Handle storage error here, e.g., show an error message
                Alert.alert('Error', 'Failed to store token.');
              });
          } else {
            setLoading(false);
            Alert.alert('Error', 'Token not found in login response.');
          }
        })
        .catch(() => setLoading(false))
    } else {
      setLoading(false)
      Alert.alert("Error", "Please enter the required details.")
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding" // Adjust behavior as needed
    >
        <Image
          source={require("./assets/SummitGraphic.jpg")}
          style={styles.imageStyles}
          resizeMode="contain"
        />

        <View style={styles.inputParentView}>
          <View style={styles.inputView}>
            <Text allowFontScaling={false} style={styles.inputLabel}>LOGIN:</Text>
            <TextInput
              style={styles.textInput}
              value={userName}
              onChangeText={setUserName}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputView}>
            <Text allowFontScaling={false} style={styles.inputLabel}>PASSWORD:</Text>
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry={true}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={onLoginPress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={"#fff"} />
          ) : (
            <Text allowFontScaling={false} style={styles.buttonText}>LOGIN</Text>
          )}
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text allowFontScaling={false}>
            Powered by
          </Text>
          <Image
            source={require("./assets/cb-dark.png")}
            style={{ width: 150, height: 50 }}
            resizeMode="contain"
          />
        </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8FC",
    flex: 1,
    justifyContent: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500"
  },
  loginButton: {
    backgroundColor: "#000",
    width: 100,
    alignSelf: "center",
    marginTop: 30,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    width: "60%",
    height: 40,
    alignSelf: "center",
    color: "#000"
  },
  inputLabel: {
    color: "#000",
    fontWeight: "500",
    marginRight: 15,
    textAlign: "left",
    fontFamily: "Novecentowide-Light"
  },
  inputParentView: {
    marginTop: 50,
    alignSelf: "center"
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  imageStyles: {
    width: "90%",
    height: 225
  }
})

export default Login
