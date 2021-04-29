import axios from "axios"

const articlesAPI = axios.create({
  baseURL: "https://app.botics.co/modules/articles",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

export function article_list() {
  return articlesAPI.get(`/article/`)
}

export function article_read(id) {
  return articlesAPI.get(`/article/${id}/`)
}

export const api = {
  article_list,
  article_read
}
