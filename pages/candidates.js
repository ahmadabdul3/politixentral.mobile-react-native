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

import colors from 'px/styles/colors';
import styles from 'px/styles/pages/candidates';
import http from 'px/services/http';


class Candidates extends PureComponent {
  pageSections;

  state = {
    politicians: {},
    loading: false,
  };

  getAddressInfo = async () => {
    const info = await AsyncStorage.getItem(LOCAL_STORAGE.ADDRESS_INFO);
    return info;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.address !== this.props.address) this.fetchCandidates();
  }

  fetchCandidates() {
    this.setState({ loading: true });
    this.getAddressInfo().then(addressInfoString => {
      const addressInfo = JSON.parse(addressInfoString);
      // console.log('addressInfo', addressInfo);
      const { city, state, district } = addressInfo;
      const query = `city=${city}&state=${state}&district=${district}`;
      const urlBase = 'http://px-staging.herokuapp.com/politicians/location?';
      const url = urlBase + query;
      http.get(url).then(res => {
        const categorizedPoliticians = res.politicians.reduce((all, p) => {
          const category = all[p.levelOfResponsibility];
          if (category) all[p.levelOfResponsibility] = [...category, p];
          else all[p.levelOfResponsibility] = [p];
          return all;
        }, {});
        // const alders = categorizedPoliticians.District;
        // const sortedAlders = alders.sort((a, b) => a.areaOfResponsibility - b.areaOfResponsibility);
        this.pageSections = Object.keys(categorizedPoliticians).map(key => key);
        this.setState({ politicians: categorizedPoliticians, loading: false });
      });
    }).catch(err => {
      this.setState({ loading: false });
      console.warn(err);
    });
  }

  componentDidMount() {
    this.fetchCandidates();
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
    return firstPolitician.areaOfResponsibility || '';

    // switch (firstPolitician.levelOfResponsibility) {
    //   case 'District': return 'All';
    //   case 'City': return firstPolitician.areaOfResponsibility;
    //   case 'State': return firstPolitician.areaOfResponsibility;
    //   default: return firstPolitician.levelOfResponsibility;
    // }
  }

  getSectionTitleSecondary(section) {
    const politicians = this.state.politicians[section];
    const firstPolitician = politicians && politicians[0] || {};
    if (firstPolitician.levelOfResponsibility === 'District') return 'Ward';
    return firstPolitician.levelOfResponsibility;
  }

  render() {
    const { politicians, loading } = this.state;
    // console.log('render again', this.props);
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
    let title = '';

    if (levelOfResponsibility !== 'District') title = titlePrimary;
    else title = `${titlePrimary.toUpperCase()} | Ward ${areaOfResponsibility}`;
    if (titleSecondary) return `${title} - ${titleSecondary}`;
    return title;
  }

  get image() {
    const {
      firstName,
      lastName,
      levelOfResponsibility,
      areaOfResponsibility,
      titlePrimary
    } = this.props.politicianData;

    if (levelOfResponsibility === 'District' || firstName + lastName === 'JustinElicker') {
      const urlBase = 'https://res.cloudinary.com/politixentral/image/upload/v1548117437';
      const level = levelOfResponsibility === 'District' ? 'ward' : levelOfResponsibility;
      // if (areaOfResponsibility.indexOf(' ') > -1) areaOfResponsibility.replace(' ', '%20')
      const extension = firstName + lastName === 'JustinElicker' ? 'jpg' : 'png';
      const urlEnd = `${titlePrimary}_${firstName}_${lastName}_${level}_${areaOfResponsibility}.${extension}`;
      const url = `${urlBase}/${urlEnd}`;

      return (
        <Image
          source={{ uri: url }}
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
