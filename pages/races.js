import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { Text, View, ScrollView, Image } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import ShadowView from 'px/components/shadow-view';
import AnimatedHeaderScroll from 'px/components/animated-header-scroll';

import colors from 'px/styles/colors';
import styles from 'px/styles/pages/races';

export default class Races extends PureComponent {
  render() {
    return (
      <AnimatedHeaderScroll
        title='races'
        subtitle="See who's running for office in the places that matter to you"
      >
      <RaceOverview
        position='alderman'
        area='ward'
        currentOfficialName='David Reyes'
      />
      <RaceOverview
        position='mayor'
        area='city'
        currentOfficialName='Tony Harp'
      />
      <RaceOverview
        position='representative'
        area='state'
        currentOfficialName='Al Paolillo'
      />
    </AnimatedHeaderScroll>
    );
  }
}

class Section extends PureComponent {
  render() {
    const { title, subtitle, children } = this.props;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleBox}>
            <Text style={styles.sectionTitle}>
              { title.toUpperCase() }
            </Text>
            <View style={styles.titleSubtitleSeparator} />
            <Text style={styles.sectionSubtitle}>
              { subtitle.toUpperCase() }
            </Text>
          </View>
          <Text style={styles.sectionHeaderLink}>
            { 'more details'.toUpperCase() }
          </Text>
        </View>
        <View style={styles.sectionContent}>
          { children }
        </View>
      </View>
    );
  }
}

class RaceOverview extends PureComponent {
  render() {
    const { position, area, currentOfficialName } = this.props;
    return (
      <ShadowView style={styles.raceOverview}>
        <View style={styles.raceOverviewTop}>
          <RaceOverviewHeader position={position} area={area} />
          <RaceOverviewDetails />
          <RaceOverviewCandidates />
        </View>
        <RaceOverviewCurrentOfficial
          position={position}
          currentOfficialName={currentOfficialName}
        />
        <View style={styles.seeDetailsLink}>
          <Text style={styles.seeDetailsLinkText}>
            { `see full race details`.toUpperCase() }
          </Text>
          <SimpleLineIcons name="arrow-right-circle" size={15} color={colors.accent} />
        </View>
      </ShadowView>
    );
  }
}

class RaceOverviewHeader extends PureComponent {
  render() {
    const { position, area } = this.props;

    return (
      <View style={styles.raceOverviewHeader}>
        <Text>
          <Text style={styles.raceOverviewTitle}>
            { position.toUpperCase() }
          </Text>
          <Text style={styles.raceOverviewTitleSecondary}>
            { `   |  ${area}`.toUpperCase() }
          </Text>
        </Text>
      </View>
    );
  }
}

class RaceOverviewDetails extends PureComponent {
  render() {
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
      <View style={styles.raceOverviewCurrentOfficial}>
        <Text style={styles.currentOfficialHeader}>
          { `current ${position}`.toUpperCase() }
        </Text>
        <View style={styles.currentOfficialSummary}>
          <View style={styles.currentOfficialImage} />
          <View style={styles.currentOfficialDetails}>
            <Text style={styles.currentOfficialName}>
              { currentOfficialName }
            </Text>
            <Text style={styles.currentOfficialLabel}>
              { 'detail label'.toUpperCase() }
            </Text>
          </View>
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
