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

// <RepAbout />
// <Text style={candidateProfileStyles.bodyTitle}>
//   Initiatives
// </Text>
// <ScrollView>
//   <InitiativeSummary title='Pave roads' />
//   <InitiativeSummary title='Increase something' />
//   <InitiativeSummary title='Other initiative' />
// </ScrollView>

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
