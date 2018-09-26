import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { Text, View, ScrollView } from 'react-native';
import styles from 'px/styles/pages/races';

export default class Races extends PureComponent {
  render() {
    return (
      <ScrollView style={styles.screen}>
        <Text style={styles.pageTitle}>
          { 'races'.toUpperCase() }
        </Text>
        <Text style={styles.pageSubtitle}>
          See who's running for office in the places that matter to you
        </Text>
        <Section title='alderman' subtitle='ward'>
          <CandidateCard name='First Last' label='some label' party={CandidateCard.party.democratic} />
          <CandidateCard name='First Last' label='some label' party={CandidateCard.party.republican} />
          <CandidateCard name='First Last' label='some label' party={CandidateCard.party.independent} />
          <CandidateCard name='First Last' label='some label' party={CandidateCard.party.democratic} />
          <CandidateCard name='First Last' label='some label' party={CandidateCard.party.democratic} />
        </Section>
        <Section title='mayor' subtitle='city'>
          <CandidateCard name='First Last' label='some label' party={CandidateCard.party.democratic} />
          <CandidateCard name='First Last' label='some label' party={CandidateCard.party.democratic} />
          <CandidateCard name='First Last' label='some label' party={CandidateCard.party.republican} />
        </Section>
      </ScrollView>
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

    return (
      <View style={styles.candidateCard}>
        <View style={this.imageBoxClass} />
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
