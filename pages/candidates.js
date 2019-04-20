import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import {
  Text, View, ScrollView, Image, Dimensions, TouchableHighlight, AsyncStorage
} from 'react-native';
import LOCAL_STORAGE from 'px/constants/local-storage';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import ShadowView from 'px/components/shadow-view';
import { createStackNavigator } from 'react-navigation';
import CandidateProfile from 'px/pages/candidate-profile';
import AnimatedHeaderScroll from 'px/components/animated-header-scroll';
import PageSection from 'px/components/page-section';
import { ClickableContentSummaryBox } from 'px/components/content-summary-card';
import {
  PageTitlePrimary, PageDescription, PageHeader
} from 'px/components/page-text';
import { dataApiGet } from 'px/clients/data_api_client';
import colors from 'px/styles/colors';
import styles from 'px/styles/pages/candidates';
import http from 'px/services/http';


class Candidates extends PureComponent {
  pageSections;
  addressInfo;

  state = {
    politicians: {},
    loading: false,
  };

  getAddressInfo = async () => {
    if (this.addressInfo) return this.addressInfo;
    const info = await AsyncStorage.getItem(LOCAL_STORAGE.ADDRESS_INFO);
    if (!info) throw({ message: 'Cant determine address, please provide a new address' });
    this.addressInfo = JSON.parse(info);
    return this.addressInfo;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.address !== this.props.address) this.fetchCandidates();
  }

  fetchCandidates() {
    this.setState({ loading: true });
    this.getAddressInfo().then(addressInfo => {
      // console.log('addressInfo', addressInfo);
      const { city, state, district } = addressInfo;
      const query = `city=${city}&state=${state}&district=${district}`;
      const urlBase = 'politicians/location?';
      const url = urlBase + query;
      dataApiGet(url).then(res => {
        const categorizedPoliticians = res.politicians.reduce((all, p) => {
          const category = all[p.levelOfResponsibility];
          if (category) all[p.levelOfResponsibility] = [...category, p];
          else all[p.levelOfResponsibility] = [p];
          all = this.addAlderBoardPresidentToCity(all, p);
          return all;
        }, {});
        const distPols = categorizedPoliticians.District;
        if (distPols && distPols.length > 1) {
          categorizedPoliticians.District = distPols.filter(p => (
            p.titleSecondary !== 'Board President'
          ));
        }
        // const alders = categorizedPoliticians.District;
        // const sortedAlders = alders.sort((a, b) => a.areaOfResponsibility - b.areaOfResponsibility);
        this.setState({ politicians: categorizedPoliticians, loading: false });
      });
    }).catch(err => {
      this.setState({ loading: false });
      console.warn(err);
    });
  }

  addAlderBoardPresidentToCity(all, politician) {
    // - if a person's address is in the ward where the alder is the
    //   board president, we will only get 1 alder response from the server
    // - otherwise, we will get 2 alders
    // - and if the address is out of a town we support, we show all alders
    // - therefore, if the address returns the board president alder under the
    //   ward section, we also show that person under city
    // - if the address returns the non-board president alder, then the board
    //   alder just goes under city
    if (politician.levelOfResponsibility !== 'District') return all;
    else if (politician.titleSecondary !== 'Board President') return all;
    const cityPoliticians = all.City;
    if (cityPoliticians) all.City = [...cityPoliticians, politician];
    else all.City = [politician];
    return all;
  }

  componentDidMount() {
    this.fetchCandidates();
  }

  getPageSections() {
    if (this.pageSections) return this.pageSections;
    const { politicians } = this.state;
    if (!politicians || Object.keys(politicians).length < 1) return [];
    const pageSectionOrder = ['District', 'City', 'State', 'Executive Branch'];
    const tempSections = [];
    this.pageSections = pageSectionOrder.forEach(s => {
      if (politicians[s]) tempSections.push(s);
    });
    this.pageSections = [ ...tempSections ];
    return this.pageSections;
  }

  getSectionTitle(section) {
    if (this.addressInfo) {
      console.log('section', section);
      const { city, state, district } = this.addressInfo;
      if (section === 'District') return `${district}`;
      else if (section === 'City') return `${city}`;
      else if (section === 'State') return `${state}`;
      return 'USA';
    }
    const politicians = this.state.politicians[section];
    const firstPolitician = politicians && politicians[0] || {};
    return firstPolitician.areaOfResponsibility || '';

    // switch (firstPolitician.levelOfResponsibility) {
    //   case 'District': return 'All';
    //   case 'City': return firstPolitician.areaOfResponsibility;
    //   case 'State': return firstPolitician.areaOfResponsibility;
    //   default: return firstPolitician.levelOfResponsibility;
    // }
  }

  getSectionTitleSecondary(section) {
    if (section === 'District') return 'Ward';
    return section;
  }

  renderCityPoliticians() {
    const politicians = this.state.politicians.City;
    const order = [
      'Mayor',
      'Alder',
      'City Clerk',
      'Director of Legislative Services'
    ];
    const addedPoliticians = {};
    const allPols = order.map((titlePrimary, i) => {
      const p = politicians.find(p => p.titlePrimary === titlePrimary);
      addedPoliticians[p.titlePrimary] = true;
      return (
        <CandidateSummary
          key={i + p.firstName + p.lastName}
          nav={this.props}
          politicianData={p}
        />
      );
    });

    politicians.forEach((p, i) => {
      if (addedPoliticians[p.titlePrimary]) return;
      addedPoliticians[p.titlePrimary] = true;
      allPols.push(
        <CandidateSummary
          key={i + p.firstName + p.lastName}
          nav={this.props}
          politicianData={p}
        />
      );
    });

    return allPols;
  }

  render() {
    const { politicians, loading } = this.state;
    // console.log('render', this.getPageSections());
    // if (loading) return (<Text>Loading office holder profiles</Text>);

    return (
      <ScrollView>
        {
          // <AnimatedHeaderScroll
          //   title='my officials'
          //   subtitle='Here are the elected individuals that currently hold office in your city and state'
          // >
        }
        <PageHeader>
          <PageTitlePrimary>
            MY OFFICIALS
          </PageTitlePrimary>
          <PageDescription>
            Here are the elected individuals that currently hold office in your city and state.
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
                <Text>Loading Office Holders...</Text>
              </View>
            ) :
            this.getPageSections().map((section, i) => (
              <PageSection
                key={i + section}
                title={this.getSectionTitle(section)}
                titleSecondary={this.getSectionTitleSecondary(section)}
              >
                {
                  section === 'City' ?
                    this.renderCityPoliticians() :
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
      </ScrollView>
    );
  }
}

class CandidateSummary extends PureComponent {
  goToProfile = () => {
    // console.log(this.props);
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
    // let title = '';
    // if (levelOfResponsibility !== 'District') title = titlePrimary;
    // else title = `${titlePrimary.toUpperCase()} | Ward ${areaOfResponsibility}`;

    if (titleSecondary) return `${titlePrimary} - ${titleSecondary}`;
    return titlePrimary;
  }

  get image() {
    const { photoUrl } = this.props.politicianData;

    if (photoUrl) {
      return (
        <Image
          source={{ uri: photoUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode='cover'
        />
      );
    }

    return <Ionicons name="ios-person" size={63} color={colors.textColorLighter} />;
  }

  render() {
    return (
      <View style={styles.candidateSummaryBox}>
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
      </View>
    );
  }
}

export default class CandidatesNav extends PureComponent {
  render() {
    const { address, navigation } = this.props;
    const Nav = createStackNavigator({
      Officials: {
        screen: (props) => {
          return <Candidates address={address} navigation={props.navigation} />;
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
      Candidate: {
        screen: CandidateProfile,
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
    return <Nav />;
  }
}


// export default nav;
