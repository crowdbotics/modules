import base64 from 'react-native-base64'

export const getOauthToken = async (code) => {
  let res = await fetch(`https://api.zoom.us/oauth/token?code=${code}&grant_type=authorization_code&redirect_uri=https://oauth.pstmn.io/v1/callback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Basic ${base64.encode('O5o5klrbQWq3L6PBWbRjoA:ia00qOHowj0vEf1BXOXuZUxc54RFMZHC')}`
    },
    body: JSON.stringify({})
  })
  return res.json()
}

export const getCurrentUser = async (token) => {
  let res = await fetch(`https://api.zoom.us/v2/users/me`, {
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
  let res = await fetch(`https://api.zoom.us/v2/users/${user_id}/meetings`, {
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

export const deleteMeeting = async (meetingId, token) => {
  await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}