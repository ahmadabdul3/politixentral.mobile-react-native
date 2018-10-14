import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { Text, View, ScrollView, Image, Dimensions, TouchableHighlight } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import ShadowView from 'px/components/shadow-view';
import { createStackNavigator } from 'react-navigation';
import CandidateProfile from 'px/pages/candidate-profile';
import AnimatedHeaderScroll from 'px/components/animated-header-scroll';
import PageSection from 'px/components/page-section';
import { ClickableContentSummaryBox } from 'px/components/content-summary-card';

import colors from 'px/styles/colors';
import styles from 'px/styles/pages/candidates';


class Candidates extends PureComponent {
  render() {
    return (
      <AnimatedHeaderScroll
        title='my officials'
        subtitle='Here are the elected individuals that currently hold office in your city and state'
      >
        <PageSection title='#8' titleSecondary='ward'>
          <CandidateSummary
            nav={this.props}
            title='alderman'
            officialName='David Reyes'
            officialLabel='ward 8'
          />
        </PageSection>
        <PageSection title='new haven' titleSecondary='city'>
          <CandidateSummary
            nav={this.props}
            title='mayor'
            officialName='Toni Harp'
            officialLabel='new haven'
          />
          <CandidateSummary
            nav={this.props}
            title='chief of staff'
            officialName='Tomas Reyes'
            officialLabel='new haven'
          />
          <CandidateSummary
            nav={this.props}
            title='Chief Administrative Officer'
            officialName='Michael Carter'
            officialLabel='new haven'
          />
        </PageSection>
      </AnimatedHeaderScroll>
    );
  }
}

// <PageSection title='ct' titleSecondary='state'>
//     <CandidateSummary
//       nav={this.props}
//       title='representative'
//       officialName='Al Paolillo'
//       officialLabel='connecticut'
//     />
// </PageSection>

class CandidateSummary extends PureComponent {
  goToProfile = () => {
    this.props.nav.navigation.navigate('Alder');
  }

  render() {
    const { title, officialName } = this.props;

    return (
      <ShadowView style={styles.candidateSummaryBox}>
        <TouchableHighlight
          onPress={this.goToProfile}
          underlayColor={colors.backgroundGrayDarker}
        >
          <View style={styles.candidateSummaryBody}>
            <View style={styles.candidateSummaryBio}>
              <View style={styles.currentOfficialImage} />
              <View>
                <Text style={styles.currentOfficialName}>
                  { officialName }
                </Text>
                <Text style={styles.candidateTitle}>
                  { title.toUpperCase() }
                </Text>
              </View>
            </View>
            <View style={styles.viewFullProfile}>
              <Text style={styles.viewFullProfileText}>
                { `profile`.toUpperCase() }
              </Text>
              <SimpleLineIcons name="arrow-right-circle" size={15} color={colors.accent} />
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
      headerTintColor: colors.primary,
    }),
  },
  Alder: {
    screen: CandidateProfile,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: colors.primary,
    }),
  },
});

export default nav;
