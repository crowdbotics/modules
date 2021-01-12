import { NavigationActions, StackActions } from "react-navigation";

const config = {};
export function setNavigator(nav) {
  if (nav) {
    config.navigator = nav;
  }
}

/**
 * Above functions are helpers to navigate to a route without the
 * navigation prop from React Navigation, helpful in sagas or action dispatchers
 * Just include check EmailAuth saga as an example
 */
export function navigate(routeName, params) {
  if (config.navigator && routeName) {
    let action = NavigationActions.navigate({ routeName, params });
    config.navigator.dispatch(action);
  }
}
export function goBack() {
  if (config.navigator) {
    let action = NavigationActions.back({});
    config.navigator.dispatch(action);
  }
}

export function navigateAndResetStack(routeName, params) {
  if (config.navigator && routeName) {
    let action = NavigationActions.navigate({ routeName, params });

    config.navigator.dispatch(
      StackActions.reset({
        index: 0,
        actions: [action]
      })
    );
  }
}
