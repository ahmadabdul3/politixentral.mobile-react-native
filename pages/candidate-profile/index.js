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
  Initiatives: {
    screen: (props) => <Initiatives {...props} />,
  },
  Feed: {
    screen: (props) => <Activity {...props} /> ,
  },
  About: {
    screen: (props) => <About {...props} />,
  },
}, {
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: colors.brandPurpleLighter,
    style: {
      backgroundColor: colors.backgroundPurpleDarker,
    },
    indicatorStyle: {
      backgroundColor: 'white',
    }
  }
});

export default class CandidateProfile extends PureComponent {
  static router = RepTabs.router;
  name = 'Candidate';

  render() {
    const { navigation } = this.props;
    const politicianData = navigation.getParam('politicianData');

    return (
      <View style={candidateProfileStyles.screen}>
        <RepHeader politicianData={politicianData} />
        <RepTabs
          navigation={this.props.navigation}
          screenProps={{ politicianData }}
        />
      </View>
    );
  }
}

<View style={candidateProfileStyles.tabHeader}>
  <Text style={candidateProfileStyles.tabHeaderText}>
    David Reyes
  </Text>
</View>
