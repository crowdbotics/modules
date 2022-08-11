// import options from "../options";
// @ts-ignore
import React, { useRef, useContext, useEffect, useState } from "react";
import { OptionsContext, GlobalOptionsContext } from "@options";

// export const userToken = "f8a43f025f341a5f64f3a8a4d303622cd0a6d5d4";
export const userToken = "TOKEN";

export const getMyFeed = async () => {
const gOptions = useContext(GlobalOptionsContext);
const BASE_URL = gOptions.url
console.log("test2---------------", BASE_URL)
  try {
    const res = await fetch(`${BASE_URL}/modules/social-feed/my-feed/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        'Authorization': `Token ${userToken}`
      }
    }
    );

  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};


export const unLikePost = (id, url, setLoading) => {
  setLoading(true)
  fetch(`${url}/modules/social-feed/unlike-post/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${userToken}`
    },
    body: JSON.stringify({
      post_id: id
    })
  })
    .then((response) => response.json())
    .then((json) => console.log(json, 'like'))
    .catch((error) => console.log(error))
    .finally(() => setLoading(false)); 
}

export const likePost = (id, url, setLoading) => {
  setLoading(true)
  fetch(`${url}/modules/social-feed/like-post/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${userToken}`
    },
    body: JSON.stringify({
      post_id: id
    })
  })
    .then((response) => response.json())
    .then((json) => console.log(json, 'like'))
    .catch((error) => console.log(error))
    .finally(() => setLoading(false)); 
}

export const getFollowers = async (url, setLoading) => {
  const res = await fetch(`${url}/modules/social-feed/my-followers/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${userToken}`
    }
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
    .finally(() => setLoading(false)); 

  return res
}

export const getFollowing = async (url, setLoading) => {
  const res = await fetch(`${url}/modules/social-feed/my-following/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${userToken}`
    }
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
    .finally(() => setLoading(false)); 

  return res
}


export const followUser = (id, setLoading) => {
  setLoading(true)
  fetch(`http://10.48.106.1:8000/modules/social-feed/follow/${id}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${userToken}`
    },
    body: JSON.stringify({
      
    })
  })
    .then((response) => response.json())
    .then((json) => console.log(json, 'follow'))
    .catch((error) => console.log(error))
    .finally(() => setLoading(false)); 
}


export const unFollowUser = (id, setLoading) => {
  setLoading(true)
  fetch(`http://10.48.106.1:8000/modules/social-feed/unfollow/${id}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${userToken}`
    },
    body: JSON.stringify({
      
    })
  })
    .then((response) => response.json())
    .then((json) => console.log(json, 'follow'))
    .catch((error) => console.log(error))
    .finally(() => setLoading(false)); 
}