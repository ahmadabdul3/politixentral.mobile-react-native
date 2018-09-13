import React, { PureComponent } from 'react';
import candidateProfileStyles from 'px/styles/pages/candidate-profile';
import {
  View, Text, ScrollView
} from 'react-native';

export default class About extends PureComponent {
  render() {
    return (
      <ScrollView style={candidateProfileStyles.tabSection}>
        <Education />
      </ScrollView>
    );
  }
}

class Education extends PureComponent {
  render() {
    return (
      <Section title='Education'>
        <View style={candidateProfileStyles.educationInfo}>
          <Text style={candidateProfileStyles.educationFieldDegree}>
            <Text style={candidateProfileStyles.educationField}>
              Political Science -
            </Text>
            <Text style={candidateProfileStyles.degree}>
              {` BS`}
            </Text>
          </Text>
          <Text>
            University of Maryland
          </Text>
        </View>
      </Section>
    );
  }
}

class Section extends PureComponent {
  render() {
    return (
      <View style={candidateProfileStyles.aboutSection}>
        <Text style={candidateProfileStyles.sectionTitle}>
          { this.props.title }
        </Text>
        <View style={candidateProfileStyles.aboutSectionChildren}>
          { this.props.children }
        </View>
      </View>
    );
  }
}
