// import options from "../options";
// @ts-ignore
import React, { useRef, useContext, useEffect, useState } from "react";
import { OptionsContext, GlobalOptionsContext } from "@options";


const token = 'cf1b4cf39330a955ba203ddbfefa2e6707006f64'

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
        'Authorization': `Token ${token}`
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
      'Authorization': `Token ${token}`
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
      'Authorization': `Token ${token}`
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
      'Authorization': `Token ${token}`
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
      'Authorization': `Token ${token}`
    }
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
    .finally(() => setLoading(false)); 

  return res
}
