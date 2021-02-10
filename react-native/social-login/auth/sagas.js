import { put, call, all, spawn, takeEvery } from 'redux-saga/effects';
import { authServices } from './services';
import * as types from './constants';
import * as actions from './actions';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from './utils';

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

// Facebook
function* apiFacebookConnectWorker(action) {
  try {
    const fb_result = yield LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (!fb_result.isCancelled) {
      const data = yield AccessToken.getCurrentAccessToken();
      const result = yield call(authServices.apiFacebookConnect, {
        access_token: data.accessToken,
      });
      yield put(actions.apiFacebookConnectSuccess(result, action));
    } else {
      yield put(
        actions.apiFacebookConnectFailed(
          { message: 'Facebook login failed' },
          action
        )
      );
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    yield put(actions.apiFacebookConnectFailed(err, action));
  }
}

function* apiFacebookConnectWatcher() {
  yield takeEvery(types.API_FACEBOOK_CONNECT, apiFacebookConnectWorker);
}

// Google
function* apiGoogleConnectWorker(action) {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: false,
  });
  try {
    yield GoogleSignin.hasPlayServices();
    const userInfo = yield GoogleSignin.signIn();
    const result = yield call(authServices.apiGoogleConnect, {
      access_token: userInfo.serverAuthCode,
    });
    yield put(actions.apiGoogleConnectSuccess(result, action));
  } catch (err) {
    console.log(JSON.stringify(err));
    yield put(actions.apiGoogleConnectFailed(err, action));
  }
}

function* apiGoogleConnectWatcher() {
  yield takeEvery(types.API_GOOGLE_CONNECT, apiGoogleConnectWorker);
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* authRootSaga() {
  const sagas = [
    apiLoginRequestWatcher,
    apiLogoutRequestWatcher,
    apiSignupRequestWatcher,
    apiPasswordResetWatcher,
    apiFacebookConnectWatcher,
    apiGoogleConnectWatcher,
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
