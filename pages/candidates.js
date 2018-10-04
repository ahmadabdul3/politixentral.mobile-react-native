import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { Text, View, ScrollView, Image, TouchableHighlight } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import ShadowView from 'px/components/shadow-view';
import { createStackNavigator } from 'react-navigation';
import CandidateProfile from 'px/pages/candidate-profile';

import colors from 'px/styles/colors';
import styles from 'px/styles/pages/candidates';


class Candidates extends PureComponent {
  render() {
    return (
      <ScrollView style={{ paddingTop: 60 }}>
        <CandidateSummary
          nav={this.props}
          title='alderman'
          area='ward'
          officialName='David Reyes'
          officialLabel='ward 8'
        />
        <CandidateSummary
          nav={this.props}
          title='mayor'
          area='city'
          officialName='Tony Harp'
          officialLabel='new haven'
        />
        <CandidateSummary
          nav={this.props}
          title='representative'
          area='state'
          officialName='Al Paolillo'
          officialLabel='connecticut'
        />
      </ScrollView>
    );
  }
}

class CandidateSummary extends PureComponent {
  goToProfile = () => {
    this.props.nav.navigation.navigate('Alder');
  }

  render() {
    return (
      <ShadowView style={styles.candidateSummaryBox}>
        <TouchableHighlight
          onPress={this.goToProfile}
          style={styles.candidateSummary}
          underlayColor={colors.backgroundGrayDarker}
        >
          <View>
            <View style={styles.candidateSummaryHeader}>
              <Text>
                <Text style={styles.candidateSummaryTitle}>
                  { this.props.title.toUpperCase() }
                </Text>
                <Text style={styles.candidateSummaryTitleSecondary}>
                  { `   |  ${this.props.area}`.toUpperCase() }
                </Text>
              </Text>
            </View>
            <View style={styles.candidateSummaryBody}>
              <View style={styles.currentOfficialImage} />
              <View style={styles.currentOfficialDetails}>
                <Text style={styles.currentOfficialName}>
                  { this.props.officialName }
                </Text>
                <Text style={styles.currentOfficialLabel}>
                  { this.props.officialLabel.toUpperCase() }
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </ShadowView>
    );
  }
}

const nav = createStackNavigator({
  Officials: {
    screen: Candidates,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: 'white',
    }),
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
