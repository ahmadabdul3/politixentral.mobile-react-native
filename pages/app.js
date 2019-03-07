import React, { PureComponent } from 'react';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import City from 'px/pages/city';
import District from 'px/pages/district';
import colors from 'px/styles/colors';
import { Ionicons, MaterialIcons, Foundation, FontAwesome } from '@expo/vector-icons';
import Races from 'px/pages/races';
import Candidates from 'px/pages/candidates';
import Animation from 'px/components/animated-header-scroll';

console.disableYellowBox = true;

export default createMaterialBottomTabNavigator ({
  // City: {
  //   screen: City,
  //   navigationOptions: {
  //     tabBarIcon: ({ tintColor, focused }) => {
  //       const color = focused ? 'white' : colors.logoGreenLight;
  //       return <MaterialIcons name="location-city" size={23} color={color} />;
  //     },
  //   },
  // },
  // District: {
  //   screen: District,
  //   navigationOptions: {
  //     tabBarIcon: ({ tintColor, focused }) => {
  //       const color = focused ? 'white' : colors.logoGreenLight;
  //       return <Foundation name="map" size={20} color={color} />;
  //     },
  //   },
  // },
  Officials: {
    screen: Candidates,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => {
        const color = focused ? colors.primary : colors.textColorLightest;
        return <Ionicons name="ios-people" size={22} color={color} />;
      },
    },
  },
  Races: {
    screen: Races,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => {
        const color = focused ? colors.primary : colors.textColorLightest;
        return <FontAwesome name="flag-checkered" size={19} color={color} />;
      },
    },
  },
}, {
  tabBarPosition: 'bottom',
  lazy: true,
  activeTintColor: colors.primary,
  inactiveTintColor: colors.textColorLightest,
  barStyle: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: colors.backgroundGrayDark,
  },
});
