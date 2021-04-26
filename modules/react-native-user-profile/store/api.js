import axios from "axios"

const SERVICE_URL = "https://your-app.botics.co" // your app back-end url

const usersAPI = axios.create({
  baseURL: SERVICE_URL, 
  headers: { Accept: "application/json", "Content-Type": "application/json" }
})

function getUserById(id) {
  return usersAPI.get(`/api/v1/user/${id}/`)
}

function updateUserById(data, token) {
  return usersAPI.patch(`/api/v1/user/${data.id}/`, data, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

function getUsers() {
  return usersAPI.get(`/api/v1/user/`)
}

export const api = {
  getUserById,
  updateUserById,
  getUsers
}
