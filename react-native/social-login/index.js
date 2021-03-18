import React from "react";
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  NavigationHelpersContext,
  useNavigationBuilder,
  TabRouter,
  TabActions,
  createNavigatorFactory,
} from "@react-navigation/native";
import {
  apiLoginRequest,
  apiSignupRequest,
  apiFacebookLogin,
  apiGoogleLogin,
  apiAppleLogin,
} from "./auth/actions";
import reducer from "./auth/reducers";
import { styles } from "./screens/styles";
import PasswordReset from "./screens/reset";
import { SignIn, SignUp } from "./screens/loginsignup";
import UserDemo from "./screens/redirect-demo";
import { BACKGROUND_URL, LOGO_URL } from "./screens/constants.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createStackNavigator } from "@react-navigation/stack";

// Tabs
const LoginTabButtons = ({ navigation, state, descriptors }) => {
  const currentTab = state.routes[state.index];
  return (
    <View style={styles.tabStyle}>
      {state.routes.map((route) => (
        <View
          key={route.key}
          style={route.key == currentTab.key ? styles.activeTabStyle : null}
        >
          <TouchableOpacity
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!event.defaultPrevented) {
                navigation.dispatch({
                  ...TabActions.jumpTo(route.name),
                  target: state.key,
                });
              }
            }}
          >
            <Text style={styles.tabStyle}>
              {descriptors[route.key].options.title || route.name}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const TabNavigator = ({ initialRouteName, children, screenOptions }) => {
  const { state, navigation, descriptors } = useNavigationBuilder(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <ScrollView style={[styles.container]}>
          <View style={{ flex: 1 }}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{
                  uri: BACKGROUND_URL,
                }}
                style={styles.imageBackground}
              >
                <Image
                  source={{
                    uri: LOGO_URL,
                  }}
                  style={styles.logo}
                />
              </ImageBackground>
            </View>
          </View>
          <View style={[styles.cardView]}>
            <LoginTabButtons
              navigation={navigation}
              state={state}
              descriptors={descriptors}
            />
            <View style={styles.tabContainerStyle}>
              {descriptors[state.routes[state.index].key].render()}
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </NavigationHelpersContext.Provider>
  );
};

const createLoginNavigator = createNavigatorFactory(TabNavigator);

const LoginStack = createLoginNavigator();

const LoginTabContainer = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: "Sign Up" }}
      />
      <LoginStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: "Sign In" }}
      />
    </LoginStack.Navigator>
  );
};

const Stack = createStackNavigator();

const SocialLogin = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LoginScreen" component={LoginTabContainer} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen name="UserDemo" component={UserDemo} />
    </Stack.Navigator>
  );
};

export default {
  title: "socialLogin",
  navigator: SocialLogin,
  slice: {
    reducer,
    actions: [
      apiLoginRequest,
      apiSignupRequest,
      apiFacebookLogin,
      apiGoogleLogin,
      apiAppleLogin,
    ],
  },
};
