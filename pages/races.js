import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import {
  Text, View, ScrollView, Image, TouchableHighlight, AsyncStorage
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import ShadowView from 'px/components/shadow-view';
import AnimatedHeaderScroll from 'px/components/animated-header-scroll';
import PageSection from 'px/components/page-section';
import { ClickableContentSummaryBox } from 'px/components/content-summary-card';
import { createStackNavigator } from 'react-navigation';
import RaceDetails from 'px/pages/race-details';
import ComingSoon from 'px/components/coming-soon';
import LOCAL_STORAGE from 'px/constants/local-storage';

import colors from 'px/styles/colors';
import styles from 'px/styles/pages/races';
import http from 'px/services/http';

import {
  PageTitlePrimary, PageDescription, PageHeader
} from 'px/components/page-text';

class Races extends PureComponent {
  pageSections;
  state = {
    races: {},
    loading: false,
  };

  getAddressInfo = async () => {
    const info = await AsyncStorage.getItem(LOCAL_STORAGE.ADDRESS_INFO);
    return info;
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getAddressInfo().then(addressInfoString => {
      const addressInfo = JSON.parse(addressInfoString);
      console.log('addressInfo', addressInfo);
      const { city, state, district } = addressInfo;
      const query = `city=${city}&state=${state}&district=${district}`;
      const urlBase = 'http://px-staging.herokuapp.com/races/location?';
      const url = urlBase + query;
      http.get(url).then(res => {
        const categorizedRaces = res.races.reduce((all, r) => {
          const category = all[r.levelOfResponsibility];
          if (category) all[r.levelOfResponsibility] = [...category, r];
          else all[r.levelOfResponsibility] = [r];
          return all;
        }, {});
        // const alders = categorizedPoliticians.District;
        // const sortedAlders = alders.sort((a, b) => a.areaOfResponsibility - b.areaOfResponsibility);
        this.pageSections = Object.keys(categorizedRaces).map(key => key);
        this.setState({ races: categorizedRaces, loading: false });
      });
    }).catch(err => {
      this.setState({ loading: false });
      console.warn(err);
    });
  }

  getPageSections() {
    if (this.pageSections) return this.pageSections;
    const { races } = this.state;
    this.pageSections = Object.keys(races).map(key => key);
    return this.pageSections;
  }

  getSectionTitle(section) {
    const races = this.state.races[section];
    const firstRace = races && races[0] || {};
    return firstRace.areaOfResponsibility || '';
  }

  getSectionTitleSecondary(section) {
    const races = this.state.races[section];
    const firstRace = races && races[0] || {};
    if (firstRace.levelOfResponsibility === 'District') return 'Ward';
    return firstRace.levelOfResponsibility;
  }

  getRaceCurrentOfficeHolder(r) {
    const politician = r.officeHolderTerm && r.officeHolderTerm.politician || {};
    const { firstName, lastName } = politician;
    return firstName + ' ' + lastName;
  }

  render() {
    const { races, loading } = this.state;
    return (
      <ScrollView>
        <PageHeader>
          <PageTitlePrimary>
            RACES
          </PageTitlePrimary>
          <PageDescription>
            These are the current races that are coming up in your city and state.
          </PageDescription>
        </PageHeader>
        {
          loading ? (
            <View style={{
              backgroundColor: 'white',
              paddingTop: 20,
              paddingBottom: 20,
              paddingRight: 20,
              paddingLeft: 20,
              borderRadius: 3,
              marginTop: 20,
              marginRight: 10,
              marginLeft: 10,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: colors.backgroundGrayDark,
            }}>
              <Text>Loading Races...</Text>
            </View>
          ) :
          this.getPageSections().map((section, i) => (
            <PageSection
              key={i + section}
              title={this.getSectionTitle(section)}
              titleSecondary={this.getSectionTitleSecondary(section)}
            >
              {
                races[section].map((r, i) => (
                  <RaceOverview
                    key={i + r.levelOfResponsibility + r.areaOfResponsibility + r.position}
                    position={r.position}
                    currentOfficialName={this.getRaceCurrentOfficeHolder(r)}
                    nav={this.props}
                  />
                ))
              }
            </PageSection>
          ))
        }
      </ScrollView>
    );
  }
}

// <PageSection title='#8' titleSecondary='ward'>
//   <RaceOverview
//     position='alderman'
//     currentOfficialName='David Reyes'
//     nav={this.props}
//   />
// </PageSection>
// <PageSection title='new haven' titleSecondary='city'>
//   <RaceOverview
//     position='mayor'
//     currentOfficialName='Tony Harp'
//     nav={this.props}
//   />
// </PageSection>

class RaceOverview extends PureComponent {
  goToDetails = () => {
    // this.props.nav.navigation.navigate('RaceDetails');
    console.log('');
  }

  render() {
    const { position, area, currentOfficialName } = this.props;
    return (
      <View style={styles.raceOverviewBox}>
        {
          // <TouchableHighlight
          //   onPress={this.goToDetails}
          //   underlayColor={colors.backgroundGrayDarker}
          // >
        }
          <View>
            <RaceOverviewHeader title={position} incumbent={currentOfficialName} />
            <RaceOverviewCandidates />
          </View>
        {
          //</TouchableHighlight>
        }
      </View>
    )
  }
}

class RaceOverviewHeader extends PureComponent {
  render() {
    const { title, incumbent } = this.props;

    return (
      <View style={styles.raceOverviewHeader}>
        <View style={styles.raceOverviewHeaderLeft}>
          <Text style={styles.raceOverviewTitle}>
            { title.toUpperCase() }
          </Text>
          <Text style={styles.raceOverviewIncumbent}>
            CURRENT: {incumbent}
          </Text>
        </View>
        {
          // <View style={styles.seeDetailsLink}>
          //   <Text style={styles.seeDetailsLinkText}>
          //     { `race details`.toUpperCase() }
          //   </Text>
          //   <SimpleLineIcons name="arrow-right-circle" size={15} color={colors.accent} />
          // </View>
        }
      </View>
    );
  }
}

class RaceOverviewDetails extends PureComponent {
  render() {
    const { candidateName } = this.props;

    return (
      <View style={styles.raceOverviewDetails}>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>
            { 'election day'.toUpperCase() }
          </Text>
          <Text style={styles.detailValue}>
            { '   jun 5, 2018'.toUpperCase() }
          </Text>
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>
            { 'number of candidates'.toUpperCase() }
          </Text>
          <Text style={styles.detailValue}>
            { '   4' }
          </Text>
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>
            { 'incumbent'.toUpperCase() }
          </Text>
          <Text style={styles.detailValue}>
            { `   ${candidateName}` }
          </Text>
        </Text>
      </View>
    );
  }
}

class RaceOverviewCandidates extends PureComponent {
  static defaultProps = {
    numberOfCandidates: 4,
  };

  render() {
    const { numberOfCandidates } = this.props;
    return (
      <View style={styles.raceOverviewCandidates}>
        <View style={styles.raceOverviewCandidate} />
        <View style={styles.raceOverviewCandidate} />
        <View style={styles.raceOverviewCandidate} />
        <View style={styles.raceOverviewCandidate} />
      </View>
    );
  }
}

class RaceOverviewCurrentOfficial extends PureComponent {
  render() {
    const { position, currentOfficialName } = this.props;

    return (
      <View style={styles.currentOfficialSummary}>
        <View style={styles.currentOfficialImage} />
        <View style={styles.currentOfficialDetails}>
          <Text style={styles.currentOfficialName}>
            { currentOfficialName }
          </Text>
          <Text style={styles.currentOfficialLabel}>
            { 'incumbent'.toUpperCase() }
          </Text>
        </View>
      </View>
    );
  }
}

export default class RacesNav extends PureComponent {
  render() {
    const { address, navigation } = this.props;
    const Nav = createStackNavigator({
      Races: {
        screen: (props) => {
          const { address } = props.screenProps;
          return <Races address={address} />;
        },
        navigationOptions: ({ navigation }) => ({
          // title: `${navigation.state.params.name}'s Profile'`,
          title: 'POLITIXENTRAL',
          headerStyle: {
            backgroundColor: colors.secondary,
            borderBottomColor: colors.secondaryLight,
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
        }),
      },
      RaceDetails: {
        screen: RaceDetails,
        navigationOptions: ({ navigation }) => ({
          // title: `${navigation.state.params.name}'s Profile'`,
          title: 'POLITIXENTRAL',
          headerStyle: {
            backgroundColor: colors.secondary,
            borderBottomColor: colors.secondaryLight,
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
        }),
      },
    });
    return <Nav screenProps={{ address }} />;
  }
}
