import { put, call, all, spawn, takeEvery } from "redux-saga/effects";
import { authServices } from "./services";
import * as types from "./constants";
import * as actions from "./actions";

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
    console.log(result);
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

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* authRootSaga() {
  const sagas = [
    apiLoginRequestWatcher,
    apiLogoutRequestWatcher,
    apiSignupRequestWatcher,
    apiPasswordResetWatcher,
    apiAuthUserWatcher,
  ];
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
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
