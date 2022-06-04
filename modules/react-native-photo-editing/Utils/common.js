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
