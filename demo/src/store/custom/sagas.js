import { put, call, all, spawn } from "redux-saga/effects"
import { customApiService } from "./services"
import * as types from "./constants"

/* Example worker saga and watcher setup

// Worker
function* getBalanceWorker(action) {
  try {
    const result = yield call(customApiService.getBalance, action)
    yield put(actions.getBalanceSucceeded(result))
  } catch (err) {
    yield put(actions.getBalanceFailed(err))
  }
}

// Watcher
function* getBalanceWatcher() {
  yield takeEvery(types.GET_BALANCE, getBalanceWorker)
}
*/

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* customRootSaga() {
  const sagas = [
      // Example watcher
      // getBalanceWatcher
  ]
  yield all(
    sagas.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga)
            break
          } catch (e) {
            console.log(e)
          }
        }
      })
    )
  )
}
