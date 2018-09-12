import React, { PureComponent } from 'react';
import candidateProfileStyles from 'px/styles/pages/candidate-profile';
import colors from 'px/styles/colors';
import ShadowView from 'px/components/shadow-view';
import EventCard from 'px/components/event-card';
import Demographic from 'px/components/demographic';
import InitiativeSummary from 'px/components/initiative-summary';
import { LinearGradient } from 'expo';
import {
  View, Text, StyleSheet, Image, ScrollView
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';

export default class DistrictRepresentative extends PureComponent {
  name = 'Alder';

  render() {
    return (
      <View style={candidateProfileStyles.screen}>
        <RepHeader />
        <RepTabs />
      </View>
    );
  }
}

class Education extends PureComponent {
  render() {
    return (
      <View style={candidateProfileStyles.educationSection}>
        <Text style={candidateProfileStyles.sectionTitle}>
          Education
        </Text>
        <View style={candidateProfileStyles.educationInfo}>
          <Text>
            <Text style={candidateProfileStyles.educationField}>
              Political Science
            </Text>
            <Text style={candidateProfileStyles.degree}>
              - BS
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

class About extends PureComponent {
  render() {
    return (
      <ScrollView style={candidateProfileStyles.tabSection}>
        <Education />
      </ScrollView>
    );
  }
}

class Activity extends PureComponent {
  render() {
    return (
      <Text> activity </Text>
    );
  }
}

class Initiatives extends PureComponent {
  render() {
    return (
      <Text> initiatives </Text>
    );
  }
}

const RepTabs = createMaterialTopTabNavigator({
  About: {
    screen: About
  },
  Activity: {
    screen: Activity
  },
  Initiatives: {
    screen: Initiatives
  },
}, {
  tabBarOptions: {
    activeTintColor: colors.textColor,
    inactiveTintColor: colors.textColorLight,
    style: {
      backgroundColor: 'white',
    },
    indicatorStyle: {
      backgroundColor: colors.brandPurple,
    }
  }
});

// <RepAbout />
// <Text style={candidateProfileStyles.bodyTitle}>
//   Initiatives
// </Text>
// <ScrollView>
//   <InitiativeSummary title='Pave roads' />
//   <InitiativeSummary title='Increase something' />
//   <InitiativeSummary title='Other initiative' />
// </ScrollView>

class RepHeader extends PureComponent {
  render() {
    const personImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk0-hgCk5RZ2_ZYfEGmGaa2kq3i-Wh-FZJVHbHXrBueWDFkdt0';

    return (
      <LinearGradient
        colors={[ colors.brandPurpleDark, colors.brandPurple, colors.brandBlueOffPurple ]}
        style={candidateProfileStyles.header}
      >
        <ShadowView style={candidateProfileStyles.repImage}>
          <Image
            source={{ uri: personImage }}
            style={{ width: '100%', height: '100%' }}
            resizeMode='cover'
          />
        </ShadowView>
        <Text style={candidateProfileStyles.repName}>
          Aaron Greenberg
        </Text>
        <Text style={candidateProfileStyles.repDescription}>
          Alderman
        </Text>
        <HeaderDemographics />
      </LinearGradient>
    );
  }
}

class HeaderDemographics extends PureComponent {
  render() {
    return (
      <View style={candidateProfileStyles.headerDemographics}>
        <View style={candidateProfileStyles.headerDemographicsSeperator} />
        <View style={candidateProfileStyles.headerDemographicsRow}>
          <Demographic label='City' value='New Haven' white />
          <Demographic label='Ward' value='8' white />
        </View>
        <View style={candidateProfileStyles.headerDemographicsRow}>
          <Demographic label='Party' value='Democratic' white />
          <Demographic label='Years In Position' value='2' white />
        </View>
      </View>
    );
  }
}

class RepAbout extends PureComponent {
  render() {
    const desc = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat';

    return (
      <View style={candidateProfileStyles.repAbout}>
        <EventCard title='About' description={desc} />
      </View>
    );
  }
}
