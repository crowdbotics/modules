import base64 from 'react-native-base64'

export const API_URL = "https://api.zoom.us";
export const CLIENT_ID = "O8EhCwuQu20CXQxKr3b_g"
export const SDK_KEY = "uGpAnqHR2dfkUkXi7vTmP4wqtRll4xZeQlio"
export const SDK_SECRET = "xJOm6daNiIR0FCDJSTQSegxa0Loc0AeaYdIn"
export const CLIENT_SECRET = "GbH7b27RIJUvJj1ww3mLFKoUyVlufMWT"
export const REDIRECT_URI = "https://oauth.pstmn.io/v1/callback"
export const parse_query_string = (url) => {
  let regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match;
  while (match = regex.exec(url)) {
    params[match[1]] = match[2];
  }
  return params;
}

export const getOauthToken = async (code) => {
  let res = await fetch(`${API_URL}/oauth/token?code=${code}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Basic ${base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
    },
    body: JSON.stringify({})
  })
  return res.json()
}

export const getCurrentUser = async (token) => {
  let res = await fetch(`${API_URL}/v2/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  return res.json()
}

export const createMeeting = async (user_id, payload, token) => {
  let res = await fetch(`${API_URL}/v2/users/${user_id}/meetings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })
  return res.json()
}

export const getMeetingList = async (user_id, token) => {
  let res = await fetch(`${API_URL}/v2/users/${user_id}/meetings?type=upcoming`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  return res.json()
}

export const deleteMeeting = async (meetingId, token) => {
  await fetch(`${API_URL}/v2/meetings/${meetingId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}