import React, { useContext } from "react";
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
import { OptionsContext } from "@options";

// Screens
import { SignInTab, SignupTab } from "./screens/loginsignup";
import PasswordReset from "./screens/reset";

/**
 * Function used to render the tab bar
 * @param  {Function} navigation Navigation method to navigate through screens
 * @param  {Object} state Object containing routes to map
 * @param  {Object} descriptors Object containing name and key of the tab
 * @return {React.ReactNode}
 */
const LoginTabBar = ({ navigation, state, descriptors }) => {
  const currentTab = state.routes[state.index];
  const options = useContext(OptionsContext);
  const { styles } = options;

  return (
    <View style={styles.tabStyle}>
      {state.routes.map((route) => (
        <View
          key={route.key}
          style={route.key === currentTab.key ? styles.activeTabStyle : null}
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

/**
 * Display login and signup tab bar component
 * @param  {String} initialRouteName Name of the tab which will be rendered at the first place
 * @param  {Array} children Tab components which will be rendered
 * @param  {Object} screenOptions Options for tab components
 * @return {React.ReactNode}
 */
function LoginSignupTabs({ initialRouteName, children, screenOptions }) {
  const { state, navigation, descriptors } = useNavigationBuilder(TabRouter, {
    children,
    screenOptions,
    initialRouteName
  });
  const options = useContext(OptionsContext);
  const { styles, BACKGROUND_URL, LOGO_URL } = options;

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <ScrollView style={[styles.container]}>
          <View style={{ flex: 1 }}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{
                  uri: BACKGROUND_URL
                }}
                style={styles.backgroundImageStyles}
              >
                <Image
                  source={{
                    uri: LOGO_URL
                  }}
                  style={styles.foregroundImage}
                />
              </ImageBackground>
            </View>
          </View>
          <View style={[styles.cardView]}>
            <LoginTabBar
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
}

const createLoginNavigator = createNavigatorFactory(LoginSignupTabs);

const LoginStack = createLoginNavigator();

const LoginScreen = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="SignIn"
        component={SignInTab}
        options={{ title: "Sign In" }}
      />
      <LoginStack.Screen
        name="SignUp"
        component={SignupTab}
        options={{ title: "Sign Up" }}
      />
    </LoginStack.Navigator>
  );
};

const Stack = createStackNavigator();

const LoginSignup = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
    </Stack.Navigator>
  );
};

export default {
  title: "login",
  navigator: LoginSignup,
  slice: slice
};
