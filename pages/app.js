import React, { PureComponent } from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import City from 'px/pages/city';
import District from 'px/pages/district';
import DistrictRepresentative from 'px/pages/district-representative';
import colors from 'px/styles/colors';

export default createMaterialBottomTabNavigator({
  Alder: {
    screen: DistrictRepresentative,
  },
  City: {
    screen: City,
  },
  District: {
    screen: District,
  },
}, {
  tabBarPosition: 'bottom',
  lazy: true,
  activeTintColor: 'white',
  inactiveTintColor: colors.logoGreenLight,
  barStyle: {
    backgroundColor: colors.logoGreen,
  },
});
