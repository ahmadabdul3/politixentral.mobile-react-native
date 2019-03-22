import React, { PureComponent } from 'react';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import City from 'px/pages/city';
import District from 'px/pages/district';
import colors from 'px/styles/colors';
import { MaterialCommunityIcons, Ionicons, MaterialIcons, Foundation, FontAwesome } from '@expo/vector-icons';
import RacesPageContainer from 'px/containers/races_page_container';
// import Candidates from 'px/pages/candidates';
import Animation from 'px/components/animated-header-scroll';
import SettingsPageContainer from 'px/containers/settings_page_container';
import CandidatesPageContainer from 'px/containers/candidates_page_container';
import MessagesPage from 'px/pages/messages';

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
    screen: CandidatesPageContainer,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => {
        const color = focused ? colors.primary : colors.textColorLightest;
        return <Ionicons name="ios-people" size={22} color={color} />;
      },
    },
  },
  Races: {
    screen: RacesPageContainer,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => {
        const color = focused ? colors.primary : colors.textColorLightest;
        return <FontAwesome name="flag-checkered" size={19} color={color} />;
      },
    },
  },
  Messages: {
    screen: MessagesPage,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => {
        const color = focused ? colors.primary : colors.textColorLightest;
        return <MaterialCommunityIcons name="message-text" size={19} color={color} />;
      },
    },
  },
  Settings: {
    screen: SettingsPageContainer,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => {
        const color = focused ? colors.primary : colors.textColorLightest;
        return <Ionicons name="ios-settings" size={19} color={color} />;
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
