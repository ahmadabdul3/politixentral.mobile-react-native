import React, { PureComponent } from 'react';
import styles from 'px/styles/pages/candidate-about';
import { Entypo } from '@expo/vector-icons';
import colors from 'px/styles/colors';
import {
  View, Text, ScrollView
} from 'react-native';

export default class About extends PureComponent {
  render() {
    return (
      <ScrollView style={styles.mainView}>
        <Education />
      </ScrollView>
    );
  }
}

class Education extends PureComponent {
  get educationSummaries() {
    const education = getEducation();
    return education.map((item, index) => {
      const firstInSequence = index === 0;
      const lastInSequence = index === (education.length - 1);

      return (
        <EducationSummary
          key={index}
          degree={item.degree}
          fieldOfStudy={item.fieldOfStudy}
          school={item.school}
          location={item.location}
          firstInSequence={firstInSequence}
          lastInSequence={lastInSequence}
        />
      );
    });
  }

  render() {
    return (
      <Section title='Education'>
        { this.educationSummaries }
      </Section>
    );
  }
}

class EducationSummary extends PureComponent {
  get style() {
    const { firstInSequence, lastInSequence } = this.props;

    if (firstInSequence) return styles.educationSummaryFirst;
    if (lastInSequence) return styles.educationSummaryLast;
    return styles.educationSummary;
  }

  render() {
    const { degree, fieldOfStudy, school, location } = this.props;

    return (
      <View style={this.style}>
        <View style={styles.educationSummaryLeft}>
          <Text style={styles.school}>
            { school.toUpperCase() }
          </Text>
          <Text style={styles.educationFieldDegree}>
            <Text style={styles.educationField}>
              { fieldOfStudy } -
            </Text>
            <Text style={styles.degree}>
              {` ${degree}`}
            </Text>
          </Text>
        </View>
        <View style={styles.educationSummaryRight}>
          <Text style={styles.educationSummaryLocation}>
            { location }
          </Text>
          <Entypo
            name='location' size={14} color={colors.secondary}
            style={{ marginLeft: 10 }}
          />
        </View>
      </View>
    );
  }
}

function getEducation() {
  return [
    {
      degree: 'MS',
      fieldOfStudy: 'Business Administration',
      school: 'Sacred Heart University',
      location: 'Fairfield CT',
    },
    {
      degree: 'BS',
      fieldOfStudy: 'Business Administration',
      school: 'Mitchell College',
      location: 'New London CT',
    },
  ];
}

class Section extends PureComponent {
  render() {
    return (
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>
          { this.props.title.toUpperCase() }
        </Text>
        <View style={styles.aboutSectionChildren}>
          { this.props.children }
        </View>
      </View>
    );
  }
}
