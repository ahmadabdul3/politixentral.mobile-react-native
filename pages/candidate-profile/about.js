import React, { PureComponent } from 'react';
import styles from 'px/styles/pages/candidate-about';
import { Entypo } from '@expo/vector-icons';
import colors from 'px/styles/colors';
import PageSection from 'px/components/page-section';
import {
  View, Text, ScrollView
} from 'react-native';

export default class About extends PureComponent {
  render() {
    return (
      <ScrollView style={styles.mainView}>
        <Skills />
        <Experience />
        <Education />
      </ScrollView>
    );
  }
}

class Skills extends PureComponent {
  render() {
    return (
      <PageSection title='skills'>
        <Text style={styles.skill}>
          - Financial Analysis
        </Text>
        <Text style={styles.skill}>
          - Team Leading and Management
        </Text>
        <Text style={styles.skill}>
          - Tracking and Reporting
        </Text>
      </PageSection>
    );
  }
}

class Experience extends PureComponent {
  get experiences() {
    const education = getExperience();
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
          date={item.date}
          firstInSequence={firstInSequence}
          lastInSequence={lastInSequence}
        />
      );
    });
  }

  render() {
    return (
      <Section title='Experience'>
        { this.experiences }
      </Section>
    );
  }
}

function getExperience() {
  return [
    {
      degree: '',
      fieldOfStudy: 'Business Account Manager',
      school: 'Verizon',
      location: 'Norwalk CT',
      date: 'jun 2014 - mar 2018',
    },
    {
      degree: '',
      fieldOfStudy: 'Marketing Operations Coordinator',
      school: 'Verizon',
      location: 'Meriden CT',
      date: 'feb 2012 - may 2014',
    },
  ];
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
          date={item.date}
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
    const { degree, fieldOfStudy, school, location, date } = this.props;

    return (
      <View style={this.style}>
        <Text style={styles.educationSummaryDate}>
          { date.toUpperCase() }
        </Text>
        <Text style={styles.educationFieldDegree}>
          <Text style={styles.educationField}>
            { fieldOfStudy }
          </Text>
          <Text style={styles.degree}>
            { degree ?  ` - ${degree}` : '' }
          </Text>
        </Text>
        <View style={styles.schoolAndLocation}>
          <Text style={styles.school}>
            { school.toUpperCase() }
          </Text>
          <View style={styles.location}>
            <Text style={styles.educationSummaryLocation}>
              { location }
            </Text>
            <Entypo
              name='location' size={12} color={colors.accent}
              style={{ marginLeft: 10 }}
            />
          </View>
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
      date: 'may 2011',
    },
    {
      degree: 'BS',
      fieldOfStudy: 'Business Administration',
      school: 'Mitchell College',
      location: 'New London CT',
      date: 'may 2008',
    },
  ];
}

class Section extends PureComponent {
  render() {
    return (
      <View style={styles.section}>
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
