import * as types from "./constants"

export const article_list = () => ({ type: types.ARTICLE_LIST })
export const article_listSucceeded = (response, starter) => ({
  type: types.ARTICLE_LIST_SUCCEEDED,
  response,
  starter
})
export const article_listFailed = (response, starter) => ({
  type: types.ARTICLE_LIST_FAILED,
  response,
  starter
})
export const article_read = () => ({ type: types.ARTICLE_READ })
export const article_readSucceeded = (response, starter) => ({
  type: types.ARTICLE_READ_SUCCEEDED,
  response,
  starter
})
export const article_readFailed = (response, starter) => ({
  type: types.ARTICLE_READ_FAILED,
  response,
  starter
})
