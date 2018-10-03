import React, { PureComponent } from 'react';
import candidateProfileStyles from 'px/styles/pages/candidate-profile';
import colors from 'px/styles/colors';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
import RepHeader from './rep-header';
import About from './about';
import Activity from './activity';
import Initiatives from './initiatives';


const RepTabs = createMaterialTopTabNavigator({
  Initiatives: {
    screen: Initiatives
  },
  Feed: {
    screen: Activity
  },
  About: {
    screen: About
  },
}, {
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: colors.brandPurpleLight,
    style: {
      backgroundColor: colors.primaryDark,
    },
    indicatorStyle: {
      backgroundColor: 'white',
    }
  }
});

export default class CandidateProfile extends PureComponent {
  static router = RepTabs.router;
  name = 'Alder';

  render() {
    return (
      <View style={candidateProfileStyles.screen}>
        <RepHeader />
        <RepTabs navigation={this.props.navigation} />
      </View>
    );
  }
}
