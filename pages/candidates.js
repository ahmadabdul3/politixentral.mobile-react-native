import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { Text, View, ScrollView, Image, Dimensions, TouchableHighlight } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
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
        {
          // <PageSection title='#8' titleSecondary='ward'>
          //   {
          //     // <CandidateSummary
          //     //   nav={this.props}
          //     //   title='alderman'
          //     //   officialName='David Reyes'
          //     //   officialLabel='ward 8'
          //     // />
          //   }
          // </PageSection>
          // <PageSection title='new haven' titleSecondary='city'>
          //   <CandidateSummary
          //     nav={this.props}
          //     title='mayor'
          //     officialName='Toni Harp'
          //     officialLabel='new haven'
          //   />
          //   <CandidateSummary
          //     nav={this.props}
          //     title='chief of staff'
          //     officialName='Tomas Reyes'
          //     officialLabel='new haven'
          //   />
          //   <CandidateSummary
          //     nav={this.props}
          //     title='Chief Administrative Officer'
          //     officialName='Michael Carter'
          //     officialLabel='new haven'
          //   />
          //   <CandidateSummary
          //     nav={this.props}
          //     title='Board President'
          //     officialName='Michael Carter'
          //     officialLabel='new haven'
          //   />
          // </PageSection>
          // <PageSection title='ct' titleSecondary='state'>
          //   <CandidateSummary
          //     nav={this.props}
          //     title='representative'
          //     officialName='Al Paolillo'
          //     officialLabel='connecticut'
          //   />
          // </PageSection>
        }
      </AnimatedHeaderScroll>
    );
  }
}

// <PageSection title='ct' titleSecondary='state'>
//     <CandidateSummary
//       nav={this.props}
//       title='representative'
//       officialName='Al Paolillo'
//       officialLabel='connecticut'
//     />
// </PageSection>

class CandidateSummary extends PureComponent {
  goToProfile = () => {
    this.props.nav.navigation.navigate('Alder');
  }

  get fullName() {
    const { firstName, lastName } = this.props.politicianData;
    return `${firstName} ${lastName}`;
  }

  render() {
    const { titlePrimary } = this.props.politicianData;

    return (
      <ShadowView style={styles.candidateSummaryBox}>
        <TouchableHighlight
          onPress={this.goToProfile}
          underlayColor={colors.backgroundGrayDarker}
        >
          <View style={styles.candidateSummaryBody}>
            <View style={styles.candidateSummaryBio}>
              <View style={styles.currentOfficialImage} />
              <View style={styles.currentOfficialNameWrapper}>
                <Text style={styles.currentOfficialName}>
                  { this.fullName }
                </Text>
                <Text style={styles.candidateTitle}>
                  { titlePrimary.toUpperCase() }
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
  Alder: {
    screen: CandidateProfile,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: 'white',
    }),
  },
});

export default nav;
