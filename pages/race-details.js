import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AnimatedHeaderScroll from 'px/components/animated-header-scroll';
import rawStyles from 'px/styles/pages/race-details';
const styles = StyleSheet.create(rawStyles);
import ShadowView from 'px/components/shadow-view';

export default class RaceDetails extends PureComponent {
  render() {
    return (
      <AnimatedHeaderScroll
        title='race details'
        subtitle="Alderman - more details about the role and the race go under this header"
      >
        <View style={styles.raceDetailsOfficials}>
          <RaceDetailCandidate name='David Reyes' />
          <RaceDetailCandidate name='Another Person' />
          <RaceDetailCandidate name='Some Guy' />
          <RaceDetailCandidate name='William Ruiz' />
        </View>
      </AnimatedHeaderScroll>
    )
  }
}

class RaceDetailCandidate extends PureComponent {
  render() {
    return (
      <ShadowView style={styles.raceDetailCandidateCard}>
        <View style={styles.reaceDetailBio}>
          <View style={styles.imagePlaceholder}>

          </View>
          <Text>
            { this.props.name }
          </Text>
        </View>
      </ShadowView>
    );
  }
}
