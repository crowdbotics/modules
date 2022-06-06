import { PermissionsAndroid } from "react-native";
import ImageResizer from "react-native-image-resizer";

export const reSizeImage = (uri, width, height) => {
  return ImageResizer.createResizedImage(
    uri,
    width,
    height,
    "JPEG",
    100,
    0,
    undefined,
    false,
    { mode: "stretch", onlyScaleDown: false }
  );
};

export const hasAndroidPermission = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === "granted";
};
