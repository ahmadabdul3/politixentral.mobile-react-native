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
  Bio: {
    screen: RepHeader
  },
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
    activeTintColor: 'white',
    inactiveTintColor: colors.brandPurpleLight,
    style: {
      backgroundColor: colors.primary,
    },
    indicatorStyle: {
      backgroundColor: 'white',
    }
  }
});

class ScrollViewWrapper extends PureComponent {
  scrollBeginPosition = null;
  headerCollapsed = false;

  onScrollBeginDrag = (e) => {
    this.scrollBeginPosition = e.nativeEvent.contentOffset.y;
  }

  onScroll = (e) => {
    const { setShouldCollapse } = this.props;

    const yPosition = e.nativeEvent.contentOffset.y;
    if (yPosition > this.scrollBeginPosition) {
      if (!this.headerCollapsed) {
        this.headerCollapsed = true;
        setShouldCollapse(true);
      }
    } else if (yPosition < this.scrollBeginPosition) {
      if (yPosition < 50 && this.headerCollapsed) {
        this.headerCollapsed = false;
        setShouldCollapse(false);
      }
    }
  }

  render() {
    return (
      <ScrollView
        style={this.props.style}
        onScrollBeginDrag={this.onScrollBeginDrag}
        onScroll={this.onScroll}
        scrollEventThrottle={16}
      >
        { this.props.children }
      </ScrollView>
    );
  }
}

export default class CandidateProfile extends PureComponent {
  static router = RepTabs.router;
  name = 'Alder';
  // headerCollapsed = false;
  state = {
    shouldCollapse: false,
  };

  setShouldCollapse = (shouldCollapse) => {
    this.setState({ shouldCollapse });
  }

  render() {
    const { shouldCollapse } = this.state;

    return (
      <View style={candidateProfileStyles.screen}>
        <View style={candidateProfileStyles.tabHeader}>
          <Text style={candidateProfileStyles.tabHeaderText}>
            David Reyes
          </Text>
        </View>
        <RepTabs
          navigation={this.props.navigation}
          screenProps={{
            setShouldCollapse: this.setShouldCollapse,
            ScrollViewWrapper: ScrollViewWrapper,
          }}
        />
      </View>
    );
  }
}
