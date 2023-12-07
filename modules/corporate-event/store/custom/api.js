import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const BASE_URL = "https://threesevenexecevent-42777.botics.co"
// const BASE_URL = "http://10.48.106.2:8000"

export const login = payload => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/v1/login/`,
    headers: {},
    data: payload
  }
  return axios.request(config)
}

export const getHomeDetails = async () => {
  const token = await AsyncStorage.getItem("accessToken")
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/v1/home/`,
    headers: {
      Authorization: `Token ${token}`
    }
  }
  return axios.request(config)
}

export const getSessions = async () => {
  const token = await AsyncStorage.getItem("accessToken")
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/v1/user-session/`,
    headers: {
      Authorization: `Token ${token}`
    }
  }
  return axios.request(config)
}

export const getActivities = async () => {
  const token = await AsyncStorage.getItem("accessToken")
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/v1/session/activity/`,
    headers: {
      Authorization: `Token ${token}`
    }
  }
  return axios.request(config)
}

export const getTeamMembers = async () => {
  const token = await AsyncStorage.getItem("accessToken")
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/v1/board-team/team_members/`,
    headers: {
      Authorization: `Token ${token}`
    }
  }
  return axios.request(config)
}

export const getBoardMembers = async () => {
  const token = await AsyncStorage.getItem("accessToken")
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/v1/board-team/board_members/`,
    headers: {
      Authorization: `Token ${token}`
    }
  }
  return axios.request(config)
}

export const getConnects = async () => {
  const token = await AsyncStorage.getItem("accessToken")
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/v1/connect/`,
    headers: {
      Authorization: `Token ${token}`
    }
  }
  return axios.request(config)
}

export const connectionRequest = async payload => {
  const token = await AsyncStorage.getItem("accessToken")
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/v1/connect/send_request/`,
    headers: {
      Authorization: `Token ${token}`
    },
    data: payload
  }
  return axios.request(config)
}

export const getOfferings = async () => {
  const token = await AsyncStorage.getItem("accessToken")
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/v1/offerings/`,
    headers: {
      Authorization: `Token ${token}`
    }
  }
  return axios.request(config)
}

export const api = {
  login,
  getHomeDetails,
  getSessions,
  getActivities,
  getTeamMembers,
  getBoardMembers,
  getConnects,
  connectionRequest,
  getOfferings
}
