import React, { PureComponent } from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import City from 'px/pages/city';
import District from 'px/pages/district';
import DistrictRepresentative from 'px/pages/district-representative';
import colors from 'px/styles/colors';
import { Ionicons, MaterialIcons, Foundation } from '@expo/vector-icons';

export default createMaterialBottomTabNavigator({
  City: {
    screen: City,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => {
        const color = focused ? 'white' : colors.logoGreenLight;
        return <MaterialIcons name="location-city" size={23} color={color} />;
      },
    },
  },
  District: {
    screen: District,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => {
        const color = focused ? 'white' : colors.logoGreenLight;
        return <Foundation name="map" size={20} color={color} />;
      },
    },
  },
  Alder: {
    screen: DistrictRepresentative,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => {
        const color = focused ? 'white' : colors.logoGreenLight;
        return <MaterialIcons name="person-outline" size={24} color={color} />;
      },
    },
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
