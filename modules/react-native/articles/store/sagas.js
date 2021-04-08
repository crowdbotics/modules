import { all, call, put, spawn, takeEvery } from "redux-saga/effects";
import * as types from "./constants"
import * as actions from "./actions"
import { article_list, article_read } from "./services"

function* article_listWorker(action) {
  try {
    const result = yield call(article_list, action)
    yield put(actions.article_listSucceeded(result.data, action))
  } catch (err) {
    yield put(actions.article_listFailed(err, action))
  }
}

function* article_listWatcher() {
  yield takeEvery(types.ARTICLE_LIST, article_listWorker)
}

function* article_readWorker(action) {
  try {
    const result = yield call(article_read, action)
    yield put(actions.article_readSucceeded(result.data, action))
  } catch (err) {
    yield put(actions.article_readFailed(err, action))
  }
}

function* article_readWatcher() {
  yield takeEvery(types.ARTICLE_READ, article_readWorker)
}

export default function* rootSaga() {
  const sagas = [
    article_listWatcher,
    article_readWatcher
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
