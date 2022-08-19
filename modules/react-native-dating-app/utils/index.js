import EncryptedStorage from "react-native-encrypted-storage";

async function setToken(token) {
  try {
    await EncryptedStorage.setItem("access_token", token);
  } catch (error) {
    console.log(error);
  }
}

async function getToken() {
  try {
    return await EncryptedStorage.getItem("access_token");
  } catch (error) {
    console.log(error);
  }
}

async function removeToken() {
  try {
    await EncryptedStorage.removeItem("access_token");
  } catch (error) {
    console.log(error);
  }
}

export const storage = { setToken, getToken, removeToken };
