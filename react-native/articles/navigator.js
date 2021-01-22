import React from 'react';
import { SlideMenuIcon } from '../../navigator/slideMenuIcon';
import { createStackNavigator } from "react-navigation-stack";

import Articles from "./index";
import Article from "./article";

export default ArticlesNavigator = createStackNavigator({
  Articles: {
    screen: Articles.screen,
    navigationOptions: ({ navigation }) => ({
      title: "Article List",
      headerLeft: <SlideMenuIcon navigationProps={navigation} />,
    }),
    params: {
      detail: "Article"
    }
  },
  Article: {
    screen: Article,
  },
});
