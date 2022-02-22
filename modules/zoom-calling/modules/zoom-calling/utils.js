import base64 from 'react-native-base64'
import options from './options';

export const API_URL = "https://api.zoom.us";

export const parse_query_string = (url) => {
  let regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match;
  while (match = regex.exec(url)) {
    params[match[1]] = match[2];
  }
  return params;
}

export const parse_meeting_id = (url) => {
  return url.split("?").shift().split('/').pop()
}

export const parse_start_date = (dateString) => {
  const date = new Date(dateString)
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" +
          date.getHours() +  "-" + date.getMinutes() + "-" + date.getSeconds()
}

export const make_id = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
}
export const getOauthToken = async (code, codeVerifier) => {
  let res = await fetch(`${API_URL}/oauth/token?code=${code}&grant_type=authorization_code&redirect_uri=${options.REDIRECT_URI}&code_verifier=${codeVerifier}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Basic ${base64.encode(`${options.CLIENT_ID}:${options.CLIENT_SECRET}`)}`
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