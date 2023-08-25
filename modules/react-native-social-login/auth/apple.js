/* eslint-disable no-undef */
// FIXME - fix undefined variables

import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import {
  appleAuthAndroid,
  appleAuth
} from "@invertase/react-native-apple-authentication";
import { validateConfig } from "../utils";

/**
 * Request and initialize Apple login process for android
 * @param  {String} APPLE_SERVICE_ID Service id obtained from apple developer account
 */
export async function appleForAndroid(APPLE_SERVICE_ID, APPLE_REDIRECT_CALLBACK) {
  // Generate secure, random values for state and nonce
  const rawNonce = uuid();
  const state = uuid();

  const errors = validateConfig(APPLE_SERVICE_ID);
  if (!errors.length) {
    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: APPLE_SERVICE_ID,

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: APPLE_REDIRECT_CALLBACK,

      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,

      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,

      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce,

      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state
    });

    // Open the browser window for user sign in
    try {
      return await appleAuthAndroid.signIn();
    } catch (error) {
      if (error && error.message) {
        switch (error.message) {
          // Insert other error treatments here, if necessary
          case appleAuthAndroid.Error.SIGNIN_CANCELLED:
            throw new Error("The user canceled the signin request.");
          default:
            throw error;
        }
      }
    }
  }
}

/**
 * Initialize apple login process for iOS and fetch required credentials
 * @return {Object} Object containing required credentials
 */
export async function appleForiOS() {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
    });
    // make response return an id_token to match the android version.
    const {
      user: newUser,
      email,
      nonce,
      id_token: identityToken,
      code: authorizationCode
    } = appleAuthRequestResponse;
    return { newUser, email, nonce, identityToken, authorizationCode };
  } catch (error) {
    if (error && error.code === appleAuth.Error.CANCELED) {
      // Error message will displayed if user stops the authorization process willingly
      throw new Error("The user canceled the signin request.");
    }
    throw error;
  }
}
