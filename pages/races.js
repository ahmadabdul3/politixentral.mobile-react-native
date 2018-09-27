import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { Text, View, ScrollView, Image } from 'react-native';
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
          <CandidateCard name='Abdul Ahmad' label='some label' party={CandidateCard.party.democratic} />
          <CandidateCard name='William Ruiz' label='some label' party={CandidateCard.party.republican} />
          <CandidateCard name='David Reyes' label='some label' party={CandidateCard.party.independent} />
          <CandidateCard name='Joon Hoon Lee' label='some label' party={CandidateCard.party.democratic} />
          <CandidateCard name='John Josef' label='some label' party={CandidateCard.party.democratic} />
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
