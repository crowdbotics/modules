/* eslint-disable no-undef */
// FIXME - fix undefined variables

import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import {
  appleAuthAndroid,
  appleAuth
} from "@invertase/react-native-apple-authentication";
import { APPLE_SERVICE_ID, APPLE_REDIRECT_CALLBACK } from "./utils";

export async function appleForAndroid() {
  // Generate secure, random values for state and nonce
  const rawNonce = uuid();
  const state = uuid();

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

// FIXME - undefined variables
export async function appleForiOS() {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
    });
    // make response return an id_token to match the android version.
    const response = ({
      user: newUser,
      email,
      nonce,
      id_token: identityToken,
      code: authorizationCode
    } = appleAuthRequestResponse);
    return response;
  } catch (error) {
    if (error && error.code === appleAuth.Error.CANCELED) {
      throw new Error("The user canceled the signin request.");
    }
    throw error;
  }
}
