import { put, call, all, spawn, takeEvery } from 'redux-saga/effects';
import { Platform } from 'react-native';
import { authServices } from '../services';
import * as types from '../constants';
import * as actions from '../actions';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from '../utils';
import { appleForAndroid, appleForiOS } from "./apple";

// Login
function* apiLoginRequestWorker(action) {
  try {
    const result = yield call(authServices.apiLoginRequest, action);
    yield put(actions.apiLoginSuccess(result, action));
  } catch (err) {
    yield put(actions.apiLoginFailed(err, action));
  }
}

function* apiLoginRequestWatcher() {
  yield takeEvery(types.API_LOGIN_REQUEST, apiLoginRequestWorker);
}

// Logout
function* apiLogoutRequestWorker(action) {
  try {
    const result = yield call(authServices.apiLogoutRequest, action);
    yield put(actions.apiLogoutSuccess(result, action));
  } catch (err) {
    yield put(actions.apiLogoutFailed(err, action));
  }
}

function* apiLogoutRequestWatcher() {
  yield takeEvery(types.API_LOGOUT_REQUEST, apiLogoutRequestWorker);
}

// Signup
function* apiSignupRequestWorker(action) {
  try {
    const result = yield call(authServices.apiSignupRequest, action);
    yield put(actions.apiSignupSuccess(result, action));
  } catch (err) {
    yield put(actions.apiSignupFailed(err, action));
  }
}

function* apiSignupRequestWatcher() {
  yield takeEvery(types.API_SIGNUP_REQUEST, apiSignupRequestWorker);
}

// Password Reset email
function* apiPasswordResetWorker(action) {
  try {
    const result = yield call(authServices.apiResetPasswordRequest, action);
    yield put(actions.apiPasswordResetSuccess(result, action));
  } catch (err) {
    yield put(actions.apiPasswordResetFailed(err, action));
  }
}

function* apiPasswordResetWatcher() {
  yield takeEvery(types.API_PASSWORD_RESET_REQUEST, apiPasswordResetWorker);
}

// Get auth user
function* apiAuthUserWorker(action) {
  try {
    const result = yield call(authServices.apiAuthUserRequest, action);
    yield put(actions.apiAuthUserSuccess(result, action));
  } catch (err) {
    yield put(actions.apiAuthUserFailed(err, action));
  }
}

function* apiAuthUserWatcher() {
  yield takeEvery(types.API_AUTH_USER_REQUEST, apiAuthUserWorker);
}

// Facebook
function* apiFacebookLoginWorker(action) {
  try {
    const fb_result = yield LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (!fb_result.isCancelled) {
      const data = yield AccessToken.getCurrentAccessToken();
      const result = yield call(authServices.apiFacebookLogin, {
        access_token: data.accessToken,
      });
      yield put(actions.apiFacebookLoginSuccess(result, action));
    } else {
      yield put(
        actions.apiFacebookLoginFailed(
          { message: 'Facebook login failed' },
          action
        )
      );
    }
  } catch (err) {
    console.log('Facebook Login Failed: ', JSON.stringify(err));
    yield put(actions.apiFacebookLoginFailed(err, action));
  }
}

function* apiFacebookLoginWatcher() {
  yield takeEvery(types.API_FACEBOOK_LOGIN, apiFacebookLoginWorker);
}

// Google
function* apiGoogleLoginWorker(action) {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: false,
    iosClientId: GOOGLE_IOS_CLIENT_ID
  });
  try {
    yield GoogleSignin.hasPlayServices();
    yield GoogleSignin.signIn();
    const tokens = yield GoogleSignin.getTokens();
    const result = yield call(authServices.apiGoogleLogin, {
      access_token: tokens.accessToken,
    });
    yield put(actions.apiGoogleLoginSuccess(result, action));
  } catch (err) {
    let error = err
    if (err.code === statusCodes.SIGN_IN_CANCELLED) {
      error.message = 'The user canceled the signin request.'
    }
    yield put(actions.apiGoogleLoginFailed(err, action));
  }
}

function* apiGoogleLoginWatcher() {
  yield takeEvery(types.API_GOOGLE_LOGIN, apiGoogleLoginWorker);
}

// Apple
function* apiAppleLoginWorker(action) {
  try {
    const signinFunction = Platform.select({
      ios: appleForiOS,
      android: appleForAndroid
    })
    const response = yield signinFunction();
    const result = yield call(authServices.apiAppleLogin, {
      id_token: response.id_token,
      access_token: response.code,
    });
    yield put(actions.apiAppleLoginSuccess(result, action));
  } catch (err) {
    console.log(JSON.stringify(err));
    yield put(actions.apiAppleLoginFailed(err, action));
  }
}

function* apiAppleLoginWatcher() {
  yield takeEvery(types.API_APPLE_LOGIN, apiAppleLoginWorker);
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* authRootSaga() {
  const sagas = [
    apiLoginRequestWatcher,
    apiLogoutRequestWatcher,
    apiSignupRequestWatcher,
    apiPasswordResetWatcher,
    apiAuthUserWatcher,
    apiFacebookLoginWatcher,
    apiGoogleLoginWatcher,
    apiAppleLoginWatcher
  ];
  yield all(
    sagas.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}
