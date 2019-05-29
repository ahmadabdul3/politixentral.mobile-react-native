import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import {
  Text, View, ScrollView, Image, TouchableHighlight, AsyncStorage,
  Alert
} from 'react-native';
import { SimpleLineIcons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ShadowView from 'px/components/shadow-view';
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
  PageTitlePrimary,
  PageDescription,
  PageHeader,
  PageDataRow,
  PageDataLabel,
  PageDataValue,
  PageHeaderDataSeparator,
  PageHeaderSectionTitle
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
      // console.log('addressInfo', addressInfo);
      const { city, state, district } = addressInfo;
      const query = `city=${city}&state=${state}&district=${district}`;
      const urlBase = 'http://px-staging.herokuapp.com/races/location?';
      const url = urlBase + query;
      http.get(url).then(res => {
        const categorizedRaces = res.races.reduce((all, r) => {
          const category = all[r.levelOfResponsibility];
          if (!!category) all[r.levelOfResponsibility] = [...category, r];
          else all[r.levelOfResponsibility] = [r];
          return all;
        }, {});
        // const alders = categorizedPoliticians.District;
        // const sortedAlders = alders.sort((a, b) => a.areaOfResponsibility - b.areaOfResponsibility);
        this.pageSections = this.orderPageSections({ races: categorizedRaces });
        this.setState({ races: categorizedRaces, loading: false });
      });
    }).catch(err => {
      this.setState({ loading: false });
      console.warn(err);
    });
  }

  orderPageSections(options) {
    const pageSectionOrder = ['City', 'District', 'Executive Branch'];
    let racesToOrder = {};
    if (!!options && !!options.races) racesToOrder = options.races;
    else racesToOrder = this.state.races;
    const pageSections = [];
    pageSectionOrder.forEach(sectionTitle => {
      if (!!racesToOrder[sectionTitle]) pageSections.push(sectionTitle);
    });
    return pageSections;
  }

  getPageSections() {
    if (!!this.pageSections) return this.pageSections;
    this.pageSections = this.orderPageSections();
    return this.pageSections;
  }

  getSectionTitle(section) {
    const races = this.state.races[section];
    const firstRace = !!races ? races[0] : {};
    if (firstRace.levelOfResponsibility === 'District' && races.length > 1) {
      return 'All';
    }
    return firstRace.areaOfResponsibility || '';
  }

  getSectionTitleSecondary(section) {
    const races = this.state.races[section];
    const firstRace = !!races ? races[0] : {};
    if (firstRace.levelOfResponsibility === 'District') return 'Ward';
    return firstRace.levelOfResponsibility;
  }

  getRaceCurrentOfficeHolder(r) {
    const politician = !!r.officeHolderTerm ? r.officeHolderTerm.politician : {};
    const { firstName, lastName } = politician;
    return firstName + ' ' + lastName;
  }

  // <PageDataRow>
  //   <PageDataLabel text='Mail-in Registration Deadline (Primary):' />
  //   <PageDataValue text='Sept. 5th, 2019' />
  // </PageDataRow>
  // <PageDataRow>
  //   <PageDataLabel text='Changing Your Party Affiliation (to vote in Primary):' />
  //   <PageDataValue text='Jun. 10th, 2019' />
  // </PageDataRow>
  // <PageDataRow>
  //   <PageDataLabel text='In-person Voter Registration Deadline (Primary):' />
  //   <PageDataValue text='Sept. 9th, 2019' />
  // </PageDataRow>
  // <PageHeaderDataSeparator customStyles={{ marginTop: 25 }} />


  render() {
    const { races, loading } = this.state;

    return (
      <ScrollView>
        <PageHeader>
          <PageTitlePrimary text='RACES' />
          <PageDescription text='Below are the current races that are coming up in your city and state.' />
        </PageHeader>
        <View style={{
          marginRight: 10,
          marginLeft: 10,
          marginTop: 20,
          marginBottom: 20,
          paddingBottom: 25,
          borderColor: colors.textColorLightest,
          borderWidth: 1,
          borderRadius: 5,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <MaterialCommunityIcons
              name='vote'
              color={colors.textColor}
              size={25}
              style={{
                marginTop: 13,
                marginLeft: 20,
              }} />
            <PageHeaderSectionTitle
              text='Election Dates'
              customStyles={{
                color: colors.textColor,
                paddingLeft: 10,
              }} />
          </View>
          <PageDataRow>
            <PageDataLabel text='Primaries:' />
            <PageDataValue text='Sept. 10th, 2019' />
          </PageDataRow>
          <PageDataRow>
            <PageDataLabel text='Election Day:' />
            <PageDataValue text='Nov. 5, 2019' />
          </PageDataRow>
        </View>
        {
          !!loading ? (
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
                    raceData={r}
                    key={i + r.levelOfResponsibility + r.areaOfResponsibility + r.position}
                    position={r.position}
                    currentOfficialName={this.getRaceCurrentOfficeHolder(r)}
                    nav={this.props.allProps}
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

class HotRaceLabel extends PureComponent {
  render() {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
        <View style={{
          borderColor: colors.red,
          borderWidth: 1,
          borderRadius: 20,
          paddingTop: 3,
          paddingBottom: 1,
          paddingRight: 10,
          paddingLeft: 10,
          marginTop: -12,
          backgroundColor: colors.red,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <Text style={{
            color: 'white',
            fontSize: 12,
            fontWeight: 'bold',
            marginRight: 5,
          }}>
            Hot Race
          </Text>
          <Octicons name="flame" size={15} color='white' />
        </View>
      </View>
    );
  }
}

class RaceOverview extends PureComponent {
  goToDetails = () => {
    const { position } = this.props;
    if (!!position === false || position !== 'Mayor') {
      Alert.alert(
        'No Info Yet',
        `Hi there! We're still collecting information for this race, please check back soon!`,
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    };
    this.props.nav.navigation.navigate('RaceDetails');
  }

  get hotRaceLabel() {
    const { position } = this.props;
    if (!!position === false || position !== 'Mayor') return;
    return <HotRaceLabel />;
  }

  get hotRaceStyles() {
    const { position } = this.props;
    if (!!position === false || position !== 'Mayor') return {};
    return { borderTopWidth: 1, borderTopColor: colors.red };
  }

  render() {
    const { position, area, currentOfficialName, raceData } = this.props;
    return (
      <View style={[styles.raceOverviewBox, this.hotRaceStyles]}>
        { this.hotRaceLabel }
        <TouchableHighlight
          onPress={this.goToDetails}
          underlayColor={colors.backgroundGrayDarker}
        >
          <View>
            <RaceOverviewHeader title={position} incumbent={currentOfficialName} />
            <RaceOverviewCandidates raceData={raceData} />
          </View>
        </TouchableHighlight>
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
        <View style={styles.seeDetailsLink}>
          <Text style={styles.seeDetailsLinkText}>
            { `race details`.toUpperCase() }
          </Text>
          <SimpleLineIcons name="arrow-right-circle" size={15} color={colors.accent} />
        </View>
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
  render() {
    const { candidateTerms } = this.props.raceData;
    return (
      <View style={styles.raceOverviewCandidates}>
        <View>
          <Text style={{
            fontWeight: 'bold',
          }}>
            Running Candidates
          </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          marginTop: 10,
        }}>
          {
            !!candidateTerms && candidateTerms.length > 0 ? candidateTerms.map(ct => (
              <View style={styles.raceOverviewCandidate} key={ct.id}>
                {
                  !!ct.politician
                  && !!ct.politician.user
                  && !!ct.politician.user.photoUrl
                  ? (
                    <Image
                      source={{ uri: ct.politician.user.photoUrl }}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode='cover'
                    />
                  ) : null
                }
              </View>
            )) : <Text>There are no candidates running for this office at this time.</Text>
          }
        </View>
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
          return <Races address={address} allProps={props} />;
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
