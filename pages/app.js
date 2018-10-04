import React, { PureComponent } from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import City from 'px/pages/city';
import District from 'px/pages/district';
import CandidateProfile from 'px/pages/candidate-profile';
import colors from 'px/styles/colors';
import { Ionicons, MaterialIcons, Foundation, FontAwesome } from '@expo/vector-icons';
import Races from 'px/pages/races';
import Candidates from 'px/pages/candidates';
import Animation from 'px/components/animated-header-scroll';

console.disableYellowBox = true;

export default createMaterialBottomTabNavigator({
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
        const color = focused ? 'white' : colors.brandPurpleLight;
        return <Ionicons name="ios-people" size={22} color={color} />;
      },
    },
  },
  Races: {
    screen: Races,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => {
        const color = focused ? 'white' : colors.brandPurpleLight;
        return <FontAwesome name="flag-checkered" size={19} color={color} />;
      },
    },
  },
}, {
  tabBarPosition: 'bottom',
  lazy: true,
  activeTintColor: 'white',
  inactiveTintColor: colors.brandPurpleLight,
  barStyle: {
    backgroundColor: colors.brandPurpleDark,
  },
});
