import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { Text, View, ScrollView, Image } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import ShadowView from 'px/components/shadow-view';
import AnimatedHeaderScroll from 'px/components/animated-header-scroll';
import { HorisontalScrollPageSection } from 'px/components/page-section';
import { ClickableContentSummaryBox } from 'px/components/content-summary-card';

import colors from 'px/styles/colors';
import styles from 'px/styles/pages/races';

export default class Races extends PureComponent {
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
          />
        </HorisontalScrollPageSection>
        <HorisontalScrollPageSection title='new haven' titleSecondary='city'>
          <RaceOverview
            position='mayor'
            currentOfficialName='Tony Harp'
          />
        </HorisontalScrollPageSection>
        <HorisontalScrollPageSection title='ct' titleSecondary='state'>
          <RaceOverview
            position='representative'
            currentOfficialName='Al Paolillo'
          />
        </HorisontalScrollPageSection>
    </AnimatedHeaderScroll>
    );
  }
}

class RaceOverview extends PureComponent {
  render() {
    const { position, area, currentOfficialName } = this.props;
    return (
      <ClickableContentSummaryBox
        cardTitle={position}
        onPress={() => {}}
        ViewType={ShadowView}
      >
        <RaceOverviewDetails candidateName={currentOfficialName} />
        <RaceOverviewCurrentOfficial
          position={position}
          currentOfficialName={currentOfficialName}
        />
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

class CandidateCard extends PureComponent {
  static party = {
    democratic: 'democratic',
    republican: 'republican',
    independent: 'independent',
  };

  get imageBoxClass() {
    const { party } = this.props;
    if (party === CandidateCard.party.democratic) return styles.candidateCardImageBoxBlue;
    if (party === CandidateCard.party.republican) return styles.candidateCardImageBoxRed;
    if (party === CandidateCard.party.independent) return styles.candidateCardImageBoxYellow;
    return styles.candidateCardImageBox;
  }

  render() {
    const { name, label } = this.props;
    personImage = 'https://orig00.deviantart.net/819f/f/2018/261/e/9/screen_shot_2018_09_18_at_12_42_15_pm_by_duxfox-dcn63uc.png';

    return (
      <View style={styles.candidateCard}>
        <View style={this.imageBoxClass} >
          <Image
            source={{ uri: personImage }}
            style={{ width: '100%', height: '100%' }}
            resizeMode='cover'
          />
        </View>
        <Text style={styles.candidateName}>
          { name }
        </Text>
        <Text style={styles.candidateLabel}>
          { label.toUpperCase() }
        </Text>
      </View>
    );
  }
}
