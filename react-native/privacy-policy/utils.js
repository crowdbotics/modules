import { Dimensions, Platform } from 'react-native'

export function isIphoneX() {
  const iphoneXLength = 812
  const iphoneXSMaxLength = 896
  const windowDimensions = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (windowDimensions.width === iphoneXLength ||
      windowDimensions.height === iphoneXLength ||
      windowDimensions.width === iphoneXSMaxLength ||
      windowDimensions.height === iphoneXSMaxLength)
  )
}

export const DimensionsStyle = {
  safeAreaTopHeight: Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0,
  safeAreaBottomHeight: Platform.OS === 'ios' && isIphoneX() ? 20 : 0,
  tabBarHeight: Platform.OS === 'ios' ? 17 : 20,
  bottomAreaHeight: Platform.OS === 'ios' && isIphoneX() ? 34 : 0
}
