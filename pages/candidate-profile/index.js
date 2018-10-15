import React, { PureComponent } from 'react';
import candidateProfileStyles from 'px/styles/pages/candidate-profile';
import colors from 'px/styles/colors';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { View, Text, Animated, ScrollView } from 'react-native';
import RepHeader from './rep-header';
import About from './about';
import Activity from './activity';
import Initiatives from './initiatives';


const RepTabs = createMaterialTopTabNavigator({
  Inits: {
    screen: (props) => <Initiatives bulkProps={props} />,
  },
  Feed: {
    screen: (props) => <Activity bulkProps={props} />,
  },
  About: {
    screen: (props) => <About bulkProps={props} />,
  },
}, {
  tabBarOptions: {
    activeTintColor: colors.backgroundPurpleDark,
    inactiveTintColor: colors.textColorLighter,
    style: {
      backgroundColor: 'white',
    },
    indicatorStyle: {
      backgroundColor: colors.backgroundPurpleDark,
    }
  }
});

export default class CandidateProfile extends PureComponent {
  static router = RepTabs.router;
  name = 'Alder';

  render() {
    return (
      <View style={candidateProfileStyles.screen}>
        <View style={candidateProfileStyles.tabHeader}>
          <Text style={candidateProfileStyles.tabHeaderText}>
            David Reyes
          </Text>
        </View>
        <RepTabs
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}
