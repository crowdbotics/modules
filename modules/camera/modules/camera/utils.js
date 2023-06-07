import { Alert, Platform } from "react-native";
import * as Permissions from "react-native-permissions";
import ImagePicker from "react-native-image-crop-picker";

import axios from "axios";

async function askPermission(permission) {
  try {
    const status = await Permissions.check(permission);
    if (status !== Permissions.RESULTS.GRANTED) {
      // if not already granted then ask
      const status = await Permissions.request(permission);
      if (status !== Permissions.RESULTS.GRANTED) {
        // user denied on ask
        return false;
      }
    }
    return true;
  } catch (err) {
    console.log("askPermission err", err, " for permission", permission);
    return false;
  }
}

export async function getCameraGalleryPermissions() {
  // need both permisisons for camera, so ask both on galery and camera
  const { PERMISSIONS } = Permissions;
  let permission = Platform.select({
    android: PERMISSIONS.ANDROID.CAMERA,
    ios: PERMISSIONS.IOS.CAMERA
  });

  const cameraPermissions = await askPermission(permission);
  permission = Platform.select({
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY
  });
  const storagePermissions = await askPermission(permission);
  return cameraPermissions && storagePermissions;
}

function permissionsAlert() {
  Alert.alert(
    "Permissions Required",
    "App requires Camera & Photos access to function properly. Please go to settings to enable manually.",
    [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel Pressed");
        },
        style: "cancel"
      },
      {
        text: "Settings",
        onPress: () => {
          Permissions.openSettings().catch(() =>
            console.log("cannot open settings")
          );
        }
      }
    ]
  );
}

export const pickFromGallery = async () => {
  const havePermission = await getCameraGalleryPermissions();
  if (!havePermission) {
    permissionsAlert();
    return false;
  } else {
    try {
      const res = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        mediaType: "photo",
        includeBase64: true
      });
      return res;
    } catch (err) {
      console.log("pickFromGallery err", err);
      return false;
    }
  }
};

export const pickFromCamera = async () => {
  const havePermission = await getCameraGalleryPermissions();
  if (!havePermission) {
    permissionsAlert();
    return false;
  } else {
    try {
      const res = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        mediaType: "photo",
        includeBase64: true
      });
      return res;
    } catch (err) {
      console.log("pickFromCamera err", err);
      return false;
    }
  }
};

const APP_PLATFORM = "Mobile";

export const request = axios.create({
  headers: {
    app_platform: APP_PLATFORM,
    app_version: 1
  }
});

export async function apiPost(endpoint, data) {
  try {
    const res = await request.post(endpoint, data);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log("API POST ERROR endpoint:", endpoint, " || error:", error);
  }
}

export const uploadImage = async (response, options) => {
  const BASE_URL = options.url;
  const data = new FormData();
  data.append("image", {
    name: `rnd-${response.path}`,
    type: "image/jpg",
    uri: response.path,
    data: response.data
  });
  await apiPost(BASE_URL + "/modules/camera/upload_image/", data);
};
