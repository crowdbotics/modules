import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import options from "./options";

const { photoParams, albumParams } = options;

export const getPhotos = async (first, assetType, after, groupTypes, groupName, mimeTypes, fromTime, toTime, include) => {
  try {
    const response = await CameraRoll.getPhotos({
      first: first || photoParams.first,
      assetType: assetType || photoParams.assetType,
      after: after || photoParams.after,
      groupTypes: groupTypes || photoParams.groupTypes,
      groupName: groupName || photoParams.groupName,
      mimeTypes: mimeTypes || photoParams.mimeTypes,
      fromTime: fromTime || photoParams.fromTime,
      toTime: toTime || photoParams.toTime,
      include: include || photoParams.include
    });
    return response;
  } catch (error) {
    console.log("Error : ", error);
  }
};

export const getAlbums = async (assetType) => {
  try {
    const response = await CameraRoll.getAlbums({
      assetType: assetType || albumParams.assetType
    });
    return response;
  } catch (error) {
    console.log("Error: ", error);
  }
};
