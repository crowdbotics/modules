import React, { useContext } from "react";
import { OptionsContext } from "@options";
import PropTypes from "prop-types";
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import {
  NavigationHelpersContext,
  useNavigationBuilder,
  TabRouter,
  TabActions,
  createNavigatorFactory
} from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createStackNavigator } from "@react-navigation/stack";
import { slice } from "./auth";
import { styles } from "./screens/styles";
import { SignInTab, SignupTab } from "./screens/loginsignup";
import PasswordReset from "./screens/reset";

const LoginTabBar = ({ navigation, state, descriptors, activeTabStyle }) => {
  const currentTab = state.routes[state.index];
  return (
    <View style={styles.tabStyle}>
      {state.routes.map((route) => (
        <View
          key={route.key}
          style={route.key === currentTab.key ? [styles.activeTabStyle, activeTabStyle] : null}
        >
          <TouchableOpacity
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true
              });
              if (!event.defaultPrevented) {
                navigation.dispatch({
                  ...TabActions.jumpTo(route.name),
                  target: state.key
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

function LoginSignupTabs({ initialRouteName, children, screenOptions }) {
  const options = useContext(OptionsContext);
  const { state, navigation, descriptors } = useNavigationBuilder(TabRouter, {
    children,
    screenOptions,
    initialRouteName
  });

  const { LOGO_IMAGE, logoStyle, BACKGROUND_IMAGE, backgroundImgStyle, mainContainerStyle, imageContainerStyle, signInContainerStyle, activeTabStyle } = screenOptions;
  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <ScrollView style={[styles.container, mainContainerStyle]}>
          <View style={{ flex: 1 }}>
             <View style={[styles.imageContainer, imageContainerStyle]}>
                <ImageBackground
                  source={{
                    uri: BACKGROUND_IMAGE || options.BACKGROUND_URL
                  }}
                  style={[styles.backgroundImg, backgroundImgStyle]}
                >
                  <Image
                    source={{
                      uri: LOGO_IMAGE || options.LOGO_URL
                    }}
                    style={[styles.logoImg, logoStyle]}
                  />
                </ImageBackground>
              </View>

          </View>
          <View style={[styles.cardView, signInContainerStyle]}>
            <LoginTabBar
              navigation={navigation}
              state={state}
              descriptors={descriptors}
              activeTabStyle={activeTabStyle}
            />
            <View style={styles.tabContainerStyle}>
              {descriptors[state.routes[state.index].key].render()}
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </NavigationHelpersContext.Provider>
  );
}

const createLoginNavigator = createNavigatorFactory(LoginSignupTabs);

const LoginStack = createLoginNavigator();

const LoginScreen = ({ navigation, route }) => {
  const { LOGO_IMAGE, logoStyle, BACKGROUND_IMAGE, backgroundImgStyle, mainContainerStyle, imageContainerStyle, signInContainerStyle, textInputStyle, buttonStyle, buttonTextStyle, activeTabStyle = {} } = route.params;
  const options = useContext(OptionsContext);
  return (
    <LoginStack.Navigator screenOptions={{ LOGO_IMAGE, logoStyle, BACKGROUND_IMAGE, backgroundImgStyle, mainContainerStyle, imageContainerStyle, signInContainerStyle, activeTabStyle }}>
      <LoginStack.Screen
        name="SignIn"
        component={SignInTab}
        options={{ title: options.SignInNavText }}
        initialParams={{ textInputStyle, buttonStyle, buttonTextStyle }}
      />
      <LoginStack.Screen
        name="SignUp"
        component={SignupTab}
        options={{ title: options.SignUpNavText }}
        initialParams={{ textInputStyle, buttonStyle, buttonTextStyle }}
      />
    </LoginStack.Navigator>
  );
};

const Stack = createStackNavigator();

const Login = ({ LOGO_IMAGE, logoStyle = {}, BACKGROUND_IMAGE, backgroundImgStyle = {}, mainContainerStyle = {}, imageContainerStyle = {}, signInContainerStyle = {}, textInputStyle = {}, buttonStyle = {}, buttonTextStyle = {}, activeTabStyle = {} }) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LoginScreen" component={LoginScreen} initialParams={{ LOGO_IMAGE, logoStyle, BACKGROUND_IMAGE, backgroundImgStyle, mainContainerStyle, imageContainerStyle, signInContainerStyle, textInputStyle, buttonStyle, buttonTextStyle, activeTabStyle }} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} initialParams={{ LOGO_IMAGE, textInputStyle, buttonStyle, buttonTextStyle }} />
    </Stack.Navigator>
  );
};

Login.propTypes = {
  LOGO_IMAGE: PropTypes.string,
  BACKGROUND_IMAGE: PropTypes.string,
  logoStyle: PropTypes.object,
  backgroundImgStyle: PropTypes.object,
  mainContainerStyle: PropTypes.object,
  imageContainerStyle: PropTypes.object,
  signInContainerStyle: PropTypes.object,
  textInputStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  buttonTextStyle: PropTypes.object,
  activeTabStyle: PropTypes.object
};

export default {
  title: "Login",
  navigator: Login,
  slice: slice
};
