import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Button from './components/Button';
import Input from './components/TextInput';
// @ts-ignore
import fbIcon from './fbIcon.png'
// @ts-ignore
import googleIcon from './googleIcon.png'
// @ts-ignore
import appleIcon from './appleIcon.png'
import options from './options';


const Signup = () => {
  return (
    <View style={options.styles.container}>
      <View style={options.styles.heading}>
        <Text style={options.styles.headingText}>Sign up</Text>
      </View>
      <View>
        <View style={options.styles.emailContainer}>
          <Text style={options.styles.mr10}>Email address</Text>
          <Input
            placeholder='Email'
          />
        </View>
        <View style={options.styles.mb20}>
          <Text style={options.styles.mr10}>Password</Text>
          <Input
            placeholder='Enter'
          />
        </View>
        <View style={options.styles.mb20}>
          <Text style={options.styles.mr10}>Confirm password</Text>
          <Input
            placeholder='Enter'
          />
        </View>

        <View style={options.styles.loginContainer}>
          <Button>Sign up</Button>
        </View>
        <View style={options.styles.orContainer}>
          <View style={options.styles.line} />
          <Text style={options.styles.orText}>Or</Text>
          <View style={options.styles.line} />
        </View>
        <View style={options.styles.imageContainer}>
          <View style={options.styles.iconContainer}>
            <Image
              source={appleIcon}
              style={options.styles.icon}
            />
          </View>
          <View style={options.styles.iconContainer}>
            <Image
              source={googleIcon}
              style={options.styles.icon}
            />
          </View>
          <View style={options.styles.iconContainer}>
            <Image
              source={fbIcon}
              style={options.styles.icon}
            />
          </View>
        </View>
      </View>
      <View style={options.styles.footerContainer}>
        <Text style={options.styles.footerText}>I have an account? </Text>
        <TouchableOpacity>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )


};

export default {
  title: "Signup",
  navigator: Signup
}
