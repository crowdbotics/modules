import { UIManager, findNodeHandle } from "react-native";
export function switchFlash(cameraRef) {
  UIManager.dispatchViewManagerCommand(
    findNodeHandle(cameraRef.current),
    "switchFlash",
    []
  );
}
export function switchCameraDirection(cameraRef) {
  UIManager.dispatchViewManagerCommand(
    findNodeHandle(cameraRef.current),
    "switchCameraDirection",
    []
  );
}

export function takePicture(cameraRef, value) {
  UIManager.dispatchViewManagerCommand(
    findNodeHandle(cameraRef.current),
    "takePicture",
    value
  );
}

export function setFilter(cameraRef, value) {
  UIManager.dispatchViewManagerCommand(
    findNodeHandle(cameraRef.current),
    "setFilter",
    value
  );
}
