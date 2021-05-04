import { Platform } from 'react-native'

export const DimensionsStyle = {
  safeAreaTopHeight: Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0,
  safeAreaBottomHeight: Platform.OS === 'ios' && isIphoneX() ? 20 : 0,
  tabBarHeight: Platform.OS === 'ios' ? 17 : 20,
  bottomAreaHeight: Platform.OS === 'ios' && isIphoneX() ? 34 : 0
}
