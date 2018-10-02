import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { Text, View, ScrollView, Image, Button } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import ShadowView from 'px/components/shadow-view';
import { createStackNavigator } from 'react-navigation';
import CandidateProfile from 'px/pages/candidate-profile';

import colors from 'px/styles/colors';
import styles from 'px/styles/pages/candidates';


class Candidates extends PureComponent {
  render() {
    return (
      <ScrollView>
        <CandidateSummary pro={this.props}/>
      </ScrollView>
    );
  }
}

class CandidateSummary extends PureComponent {
  goToProfile = () => {
    this.props.pro.navigation.navigate('Alder');
  }

  render() {
    return (
      <View style={styles.candidateSummary}>
        <Button
          onPress={this.goToProfile}
          title="See alder profile"
          color={colors.primary}
        />
      </View>
    );
  }
}

const nav = createStackNavigator({
  Officials: {
    screen: Candidates,
  },
  Alder: {
    screen: CandidateProfile,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: 'white',
    }),
  },
});

export default nav;
