import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { Text, View, ScrollView, Image, Dimensions, TouchableHighlight } from 'react-native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import ShadowView from 'px/components/shadow-view';
import { createStackNavigator } from 'react-navigation';
import CandidateProfile from 'px/pages/candidate-profile';
import AnimatedHeaderScroll from 'px/components/animated-header-scroll';
import PageSection from 'px/components/page-section';
import { ClickableContentSummaryBox } from 'px/components/content-summary-card';

import colors from 'px/styles/colors';
import styles from 'px/styles/pages/candidates';


class Candidates extends PureComponent {
  pageSections;
  state = {
    politicians: {},
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch('http://px-staging.herokuapp.com/politicians').then(res => res.json()).then(res => {
      const categorizedPoliticians = res.politicians.reduce((all, p) => {
        const category = all[p.levelOfResponsibility];
        if (category) all[p.levelOfResponsibility] = [...category, p];
        else all[p.levelOfResponsibility] = [p];
        return all;
      }, {});
      const alders = categorizedPoliticians.District;
      const sortedAlders = alders.sort((a, b) => a.areaOfResponsibility - b.areaOfResponsibility);
      this.pageSections = Object.keys(categorizedPoliticians).map(key => key);
      this.setState({ politicians: categorizedPoliticians, loading: false });
    }).catch(err => {
      this.setState({ loading: false });
      console.warn(err);
    });
  }

  getPageSections() {
    if (this.pageSections) return this.pageSections;
    const { politicians } = this.state;
    this.pageSections = Object.keys(politicians).map(key => key);
    return this.pageSections;
  }

  getSectionTitle(section) {
    const politicians = this.state.politicians[section];
    const firstPolitician = politicians && politicians[0] || {};

    switch (firstPolitician.levelOfResponsibility) {
      case 'District': return 'All';
      case 'City': return firstPolitician.areaOfResponsibility;
      case 'State': return firstPolitician.areaOfResponsibility;
      default: return firstPolitician.levelOfResponsibility;
    }
  }

  getSectionTitleSecondary(section) {
    const politicians = this.state.politicians[section];
    const firstPolitician = politicians && politicians[0] || {};
    if (firstPolitician.levelOfResponsibility === 'District') return 'Ward';
    return firstPolitician.levelOfResponsibility;
  }

  render() {
    const { politicians, loading } = this.state;

    return (
      <AnimatedHeaderScroll
        title='my officials'
        subtitle='Here are the elected individuals that currently hold office in your city and state'
      >
        {
          loading ? <Text>Loading office holder profiles</Text> :
          this.getPageSections().map((section, i) => (
            <PageSection
              key={i + section}
              title={this.getSectionTitle(section)}
              titleSecondary={this.getSectionTitleSecondary(section)}
            >
              {
                politicians[section].map((p, i) => (
                  <CandidateSummary
                    key={i + p.firstName + p.lastName}
                    nav={this.props}
                    politicianData={p}
                  />
                ))
              }
            </PageSection>
          ))
        }
      </AnimatedHeaderScroll>
    );
  }
}

class CandidateSummary extends PureComponent {
  goToProfile = () => {
    this.props.nav.navigation.navigate(
      'Candidate', { politicianData: this.props.politicianData }
    );
  }

  get fullName() {
    const { firstName, lastName } = this.props.politicianData;
    return `${firstName} ${lastName}`;
  }

  get title() {
    const {
      titlePrimary,
      titleSecondary,
      levelOfResponsibility,
      areaOfResponsibility
    } = this.props.politicianData;
    let title = '';

    if (levelOfResponsibility !== 'District') title = titlePrimary;
    else title = `${titlePrimary.toUpperCase()} | Ward ${areaOfResponsibility}`;
    if (titleSecondary) return `${title} - ${titleSecondary}`;
    return title;
  }

  get image() {
    const { firstName, lastName } = this.props.politicianData;

    if (firstName === 'Dave' && lastName === 'Reyes') {
      let personImageUrl = 'https://orig00.deviantart.net/819f/f/2018/261/e/9/screen_shot_2018_09_18_at_12_42_15_pm_by_duxfox-dcn63uc.png';
      return (
        <Image
          source={{ uri: personImageUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode='cover'
        />
      );
    }

    return <Ionicons name="ios-person" size={45} color={colors.textColorLighter} />;
  }

  render() {

    return (
      <ShadowView style={styles.candidateSummaryBox}>
        <TouchableHighlight
          onPress={this.goToProfile}
          underlayColor={colors.backgroundGrayDarker}
        >
          <View style={styles.candidateSummaryBody}>
            <View style={styles.candidateSummaryBio}>
              <View style={styles.currentOfficialImage}>
                { this.image }
              </View>
              <View style={styles.currentOfficialNameWrapper}>
                <Text style={styles.currentOfficialName}>
                  { this.fullName }
                </Text>
                <Text style={styles.candidateTitle}>
                  { this.title }
                </Text>
              </View>
            </View>
            <View style={styles.viewFullProfile}>
              <Text style={styles.viewFullProfileText}>
                { `profile`.toUpperCase() }
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
  Candidate: {
    screen: CandidateProfile,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: 'white',
    }),
  },
});

export default nav;
