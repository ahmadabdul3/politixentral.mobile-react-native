import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { Text, View, ScrollView, Image, TouchableHighlight, Dimensions } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import ShadowView from 'px/components/shadow-view';
import { createStackNavigator } from 'react-navigation';
import CandidateProfile from 'px/pages/candidate-profile';
import AnimatedHeaderScroll from 'px/components/animated-header-scroll';
import PageSection from 'px/components/page-section';

import colors from 'px/styles/colors';
import styles from 'px/styles/pages/candidates';


class Candidates extends PureComponent {
  render() {
    return (
      <AnimatedHeaderScroll
        title='my officials'
        subtitle='Here are the elected individuals that currently hold office in your city and state'
      >
        <CandidatePageSection title='#8' titleSecondary='ward'>
          <ScrollView
            style={{ paddingTop: 5, paddingBottom: 15 }}
            horizontal={true}
          >
            <CandidateSummary
              nav={this.props}
              title='alderman'
              officialName='David Reyes'
              officialLabel='ward 8'
            />
          </ScrollView>
        </CandidatePageSection>
        <CandidatePageSection title='new haven' titleSecondary='city'>
          <ScrollView
            style={{ paddingTop: 5, paddingBottom: 15 }}
            horizontal={true}
          >
            <CandidateSummary
              nav={this.props}
              title='mayor'
              officialName='Toni Harp'
              officialLabel='new haven'
            />
            <CandidateSummary
              nav={this.props}
              title='treasurer'
              officialName='Someone Else'
              officialLabel='new haven'
            />
            <CandidateSummary
              nav={this.props}
              title='othertitle'
              officialName='Another Person'
              officialLabel='new haven'
            />
          </ScrollView>
        </CandidatePageSection>
        <CandidatePageSection title='ct' titleSecondary='state'>
          <ScrollView
            style={{ paddingTop: 5, paddingBottom: 15 }}
            horizontal={true}
          >
            <CandidateSummary
              nav={this.props}
              title='representative'
              officialName='Al Paolillo'
              officialLabel='connecticut'
            />
          </ScrollView>
        </CandidatePageSection>
      </AnimatedHeaderScroll>
    );
  }
}

class CandidatePageSection extends PureComponent {
  render() {
    const { title, titleSecondary, children } = this.props;
    const customStyles = {
      pageSection: styles.pageSection,
      pageSectionContent: styles.pageSectionContent,
    };

    return (
      <PageSection
        title={title}
        titleSecondary={titleSecondary}
        customStyles={customStyles}
      >
        { children }
      </PageSection>
    );
  }
}

class CandidateSummary extends PureComponent {
  goToProfile = () => {
    this.props.nav.navigation.navigate('Alder');
  }

  get firstName() {
    const { officialName } = this.props;
    return officialName.split(' ')[0];
  }

  render() {
    return (
      <ShadowView style={styles.candidateSummaryBox}>
        <TouchableHighlight
          onPress={this.goToProfile}
          style={styles.candidateSummary}
          underlayColor={colors.backgroundGrayDarker}
        >
          <View>
            <View style={styles.candidateSummaryBody}>
              <View style={styles.currentOfficialImage} />
              <View style={styles.currentOfficialDetails}>
                <Text style={styles.currentOfficialName}>
                  { this.props.officialName }
                </Text>
                <Text style={styles.candidateSummaryTitle}>
                  { this.props.title.toUpperCase() }
                </Text>
                <Text style={styles.currentOfficialLabel}>
                  { this.props.officialLabel.toUpperCase() }
                </Text>
              </View>
            </View>
            <View style={styles.viewFullProfile}>
              <Text style={styles.viewFullProfileText}>
                { `see ${this.firstName}'s full profile`.toUpperCase() }
              </Text>
              <SimpleLineIcons name="arrow-right-circle" size={15} color={colors.accent} />
            </View>
          </View>
        </TouchableHighlight>
      </ShadowView>
    );
  }
}

const nav = createStackNavigator({
  Officials: {
    screen: Candidates,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: 'white',
    }),
  },
  Alder: {
    screen: CandidateProfile,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: 'white',
    }),
  },
});

export default nav;
