import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { Text, View, ScrollView, Image, TouchableHighlight } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import ShadowView from 'px/components/shadow-view';
import AnimatedHeaderScroll from 'px/components/animated-header-scroll';
import PageSection from 'px/components/page-section';
import { ClickableContentSummaryBox } from 'px/components/content-summary-card';
import { createStackNavigator } from 'react-navigation';
import RaceDetails from 'px/pages/race-details';
import ComingSoon from 'px/components/coming-soon';

import colors from 'px/styles/colors';
import styles from 'px/styles/pages/races';

class Races extends PureComponent {
  render() {
    return (
      <AnimatedHeaderScroll
        title='races'
        subtitle={
          "Soon, we will provide you with profiles of all races in the city"
          + " of New Haven. You will be able to compare candidates and view their profiles"
          + " side by side helping you vote for the person the represents your ideals best!"
        }
      >
        <View style={{ marginTop: 20 }}>
          <ComingSoon />
        </View>
        {
          // <PageSection title='#8' titleSecondary='ward'>
          //   <RaceOverview
          //     position='alderman'
          //     currentOfficialName='David Reyes'
          //     nav={this.props}
          //   />
          // </PageSection>
          // <PageSection title='new haven' titleSecondary='city'>
          //   <RaceOverview
          //     position='mayor'
          //     currentOfficialName='Tony Harp'
          //     nav={this.props}
          //   />
          // </PageSection>
        }
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
      <ShadowView style={styles.raceOverviewBox}>
        <TouchableHighlight
          onPress={this.goToDetails}
          underlayColor={colors.backgroundGrayDarker}
        >
          <View>
            <RaceOverviewHeader title={position} incumbent={currentOfficialName} />
            <RaceOverviewCandidates />
          </View>
        </TouchableHighlight>
      </ShadowView>
    )
  }
}

class RaceOverviewHeader extends PureComponent {
  render() {
    const { title, incumbent } = this.props;

    return (
      <View style={styles.raceOverviewHeader}>
        <View style={styles.raceOverviewHeaderLeft}>
          <Text style={styles.raceOverviewTitle}>
            { title.toUpperCase() }
          </Text>
          <Text style={styles.raceOverviewIncumbent}>
            CURRENT: {incumbent}
          </Text>
        </View>
        <View style={styles.seeDetailsLink}>
          <Text style={styles.seeDetailsLinkText}>
            { `race details`.toUpperCase() }
          </Text>
          <SimpleLineIcons name="arrow-right-circle" size={15} color={colors.accent} />
        </View>
      </View>
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
  static defaultProps = {
    numberOfCandidates: 4,
  };

  render() {
    const { numberOfCandidates } = this.props;
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
