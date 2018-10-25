import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AnimatedHeaderScroll from 'px/components/animated-header-scroll';
import rawStyles from 'px/styles/pages/race-details';
const styles = StyleSheet.create(rawStyles);
import ShadowView from 'px/components/shadow-view';
import PageSection from 'px/components/page-section';

export default class RaceDetails extends PureComponent {
  render() {
    return (
      <AnimatedHeaderScroll
        title='race details'
        subtitle="Alderman - more details about the role and the race go under this header"
        customStyles={{ pageTitle: styles.pageTitle }}
      >
        <RaceDetailCandidates />
        <PageSection title='skills'>
          <CandidateComparisonData data={['project management', 'financial analysis']} />
          <CandidateComparisonData data={['team leadership', 'group event organization', 'financial analysis']} />
          <CandidateComparisonData data={['project management', 'financial analysis']} />
          <CandidateComparisonData data={['team leadership', 'group event organization', 'financial analysis']} />
        </PageSection>
        <PageSection title='initiatives'>
          <CandidateComparisonData data={['project management', 'financial analysis']} />
          <CandidateComparisonData data={['team leadership', 'group event organization', 'financial analysis']} />
          <CandidateComparisonData data={['project management', 'financial analysis']} />
          <CandidateComparisonData data={['team leadership', 'group event organization', 'financial analysis']} />
        </PageSection>
      </AnimatedHeaderScroll>
    )
  }
}

class RaceDetailCandidates extends PureComponent {
  render() {
    return (
      <View style={styles.raceDetailCandidates}>
        <CandidateSummaryHeader />
        <CandidateSummaryHeader />
        <CandidateSummaryHeader />
        <CandidateSummaryHeader />
      </View>
    );
  }
}

class CandidateSummaryHeader extends PureComponent {
  render() {
    return (
      <View style={styles.candidateSummaryHeader}>
        <View style={styles.candidateSummaryHeaderImage} />
        <Text style={styles.candidateSummaryHeaderFirstName}>
          candidate
        </Text>
        <Text style={styles.candidateSummaryHeaderLastName}>
          name
        </Text>
      </View>
    );
  }
}

class CandidateComparisonData extends PureComponent {
  render() {
    return (
      <ShadowView style={styles.raceDetailCandidateCard}>
        <View style={styles.reaceDetailBio}>
          <View style={styles.imagePlaceholder}>

          </View>
          <View style={styles.candidateComparisonDataItems}>
            {
              this.props.data.map((item, i) => {
                return (
                  <Text key={i} style={styles.candidateComparisonDataItem}>
                    - { item }
                  </Text>
                );
              })
            }
          </View>
        </View>
      </ShadowView>
    );
  }
}
