import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { BACKGROUND_URL, LOGO_URL } from './constants.js';
import {
  apiLoginRequest,
  apiSignupRequest,
  apiFacebookConnect,
  apiGoogleConnect,
} from '../auth/actions';
import reducer from '../auth/reducers';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  createNavigator,
  createAppContainer,
  TabRouter,
} from 'react-navigation';

import { SignIn, SignUp } from './loginsignup';

// Tabs
const LoginTabBar = ({ navigation }) => {
  const { routes, index } = navigation.state;
  const currentTab = routes[index];
  return (
    <View style={styles.tabStyle}>
      {routes.map(route => (
        <View
          key={route.routeName}
          style={
            route.routeName == currentTab.routeName
              ? styles.activeTabStyle
              : null
          }>
          <TouchableOpacity
            onPress={() => navigation.navigate(route.routeName)}
            accessibilityLabel="{route.routeName}">
            <Text style={styles.tabStyle}>{route.params.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

// Main View
const SocialLoginSignupView = ({ navigation }) => {
  const { routes, index } = navigation.state;
  const ActiveScreen = navigation.router.getComponentForState(navigation.state);
  return (
    <ScrollView style={[styles.container]}>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{
                uri: BACKGROUND_URL,
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                resizeMode: 'cover',
              }}>
              <Image
                source={{
                  uri: LOGO_URL,
                }}
                style={{
                  width: 155,
                  height: 155,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
              />
            </ImageBackground>
          </View>
        </View>
        <View style={[styles.cardView]}>
          <LoginTabBar navigation={navigation} />
          <View style={styles.tabContainerStyle}>
            <ActiveScreen
              navigation={{
                ...navigation,
                state: routes[index],
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const LoginSignupRouter = TabRouter(
  {
    Login: {
      screen: SignIn,
      path: 'login',
      params: { name: 'Sign In' },
    },
    SignUp: {
      screen: SignUp,
      path: 'signup',
      params: { name: 'Sign Up' },
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const SocialLoginSignup = createAppContainer(
  createNavigator(SocialLoginSignupView, LoginSignupRouter, {}),
);

export default {
  name: 'socialLogin',
  screen: SocialLoginSignup,
  reducer: reducer,
  actions: [
    apiLoginRequest,
    apiSignupRequest,
    apiFacebookConnect,
    apiGoogleConnect,
  ],
};
