import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { Text, View, ScrollView, Image } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import ShadowView from 'px/components/shadow-view';
import AnimatedHeaderScroll from 'px/components/animated-header-scroll';
import { HorisontalScrollPageSection } from 'px/components/page-section';
import { ClickableContentSummaryBox } from 'px/components/content-summary-card';
import { createStackNavigator } from 'react-navigation';
import RaceDetails from 'px/pages/race-details';

import colors from 'px/styles/colors';
import styles from 'px/styles/pages/races';

class Races extends PureComponent {
  render() {
    return (
      <AnimatedHeaderScroll
        title='races'
        subtitle="See who's running for office in the places that matter to you"
      >
        <HorisontalScrollPageSection title='#8' titleSecondary='ward'>
          <RaceOverview
            position='alderman'
            currentOfficialName='David Reyes'
            nav={this.props}
          />
        </HorisontalScrollPageSection>
        <HorisontalScrollPageSection title='new haven' titleSecondary='city'>
          <RaceOverview
            position='mayor'
            currentOfficialName='Tony Harp'
            nav={this.props}
          />
        </HorisontalScrollPageSection>
        <HorisontalScrollPageSection title='ct' titleSecondary='state'>
          <RaceOverview
            position='representative'
            currentOfficialName='Al Paolillo'
            nav={this.props}
          />
        </HorisontalScrollPageSection>
    </AnimatedHeaderScroll>
    );
  }
}

class RaceOverview extends PureComponent {
  goToDetails = () => {
    this.props.nav.navigation.navigate('RaceDetails');
  }

  render() {
    const { position, area, currentOfficialName } = this.props;
    return (
      <ClickableContentSummaryBox
        cardTitle={position}
        onPress={this.goToDetails}
        ViewType={ShadowView}
      >
        <RaceOverviewDetails candidateName={currentOfficialName} />
        <RaceOverviewCandidates />
        <View style={styles.seeDetailsLink}>
          <Text style={styles.seeDetailsLinkText}>
            { `see full race details`.toUpperCase() }
          </Text>
          <SimpleLineIcons name="arrow-right-circle" size={15} color={colors.accent} />
        </View>
      </ClickableContentSummaryBox>
    );
  }
}

class RaceOverviewDetails extends PureComponent {
  render() {
    const { candidateName } = this.props;

    return (
      <View style={styles.raceOverviewDetails}>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>
            { 'election day'.toUpperCase() }
          </Text>
          <Text style={styles.detailValue}>
            { '   jun 5, 2018'.toUpperCase() }
          </Text>
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>
            { 'number of candidates'.toUpperCase() }
          </Text>
          <Text style={styles.detailValue}>
            { '   4' }
          </Text>
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>
            { 'incumbent'.toUpperCase() }
          </Text>
          <Text style={styles.detailValue}>
            { `   ${candidateName}` }
          </Text>
        </Text>
      </View>
    );
  }
}

class RaceOverviewCandidates extends PureComponent {
  render() {
    return (
      <View style={styles.raceOverviewCandidates}>
        <View style={styles.raceOverviewCandidate} />
        <View style={styles.raceOverviewCandidate} />
        <View style={styles.raceOverviewCandidate} />
        <View style={styles.raceOverviewCandidate} />
      </View>
    );
  }
}

class RaceOverviewCurrentOfficial extends PureComponent {
  render() {
    const { position, currentOfficialName } = this.props;

    return (
      <View style={styles.currentOfficialSummary}>
        <View style={styles.currentOfficialImage} />
        <View style={styles.currentOfficialDetails}>
          <Text style={styles.currentOfficialName}>
            { currentOfficialName }
          </Text>
          <Text style={styles.currentOfficialLabel}>
            { 'incumbent'.toUpperCase() }
          </Text>
        </View>
      </View>
    );
  }
}

const nav = createStackNavigator({
  Races: {
    screen: Races,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: colors.primary,
    }),
  },
  RaceDetails: {
    screen: RaceDetails,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: colors.primary,
    }),
  },
});

export default nav;
