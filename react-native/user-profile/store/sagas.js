import { put, call, all, spawn, takeEvery } from 'redux-saga/effects';
import service from "./services"
import * as types from './constants';
import * as actions from './actions';

// Get User
function* userReadWorker(action) {
  try {
    const result = yield call(service.user_read, action);
    yield put(actions.user_read_succeeded(result, action));
  } catch (err) {
    yield put(actions.user_read_failed(err, action));
  }
}

function* userReadWatcher() {
  yield takeEvery(types.USER_READ, userReadWorker)
}

// Get Users
function* userListWorker(action) {
  try {
    const result = yield call(service.user_list, action);
    yield put(actions.user_list_succeeded(result, action));
  } catch (err) {
    yield put(actions.user_list_failed(err, action));
  }
}

function* userListWatcher() {
  yield takeEvery(types.USER_LIST, userListWorker)
}

// Update User
function* userUpdateWorker(action) {
  try {
    const result = yield call(service.user_update, action);
    yield put(actions.user_update_succeeded(result, action));
  } catch (err) {
    yield put(actions.user_update_failed(err, action));
  }
}

function* userUpdateWatcher() {
  yield takeEvery(types.USER_UPDATE, userUpdateWorker)
}

export default function* authRootSaga() {
  const sagas = [
    userReadWatcher,
    userReadWatcher,
    userListWatcher,
    userUpdateWatcher
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
      }),
    ),
  );
}
