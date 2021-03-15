import {createStackNavigator} from 'react-navigation-stack';
import {SlideMenuIcon} from '../../navigator/slideMenuIcon';

import Onboarding from './index.js';

export default OnboardingBlueprintNavigator = createStackNavigator(
  {
    Onboarding: {screen: Onboarding.navigator},
  },
  {
    initialRouteName: 'Onboarding',
    defaultNavigationOptions: ({navigation}) => (
      <SlideMenuIcon navigationProps={navigation} />
    ),
  },
);
