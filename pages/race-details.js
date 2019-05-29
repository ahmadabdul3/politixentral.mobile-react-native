import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Modal, TouchableHighlight, Button } from 'react-native';
import rawStyles from 'px/styles/pages/race-details';
const styles = StyleSheet.create(rawStyles);
import ShadowView from 'px/components/shadow-view';
import PageSection from 'px/components/page-section';
import { createMaterialTopTabNavigator } from 'react-navigation';
import colors from 'px/styles/colors';
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
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';


class CandidateModal extends PureComponent {
  render() {
    const { data, visible } = this.props;
    const allData = getAllData();
    let allDataForCandidate = allData[data.name];
    if (!!allDataForCandidate === false) allDataForCandidate = {};

    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={visible}
        onRequestClose={this.closeModal}
        onBackButtonPress={this.closeModal}>
        <View style={{
          paddingTop: 30,
          paddingRight: 20,
          paddingLeft: 20,
          paddingBottom: 10,
          alignItems: 'flex-start',
          backgroundColor: colors.secondary,
        }}>
          <TouchableHighlight onPress={this.props.closeModal}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Ionicons
                name='ios-arrow-back'
                color='white'
                size={20} />
              <Text style={{
                color: 'white',
                marginLeft: 10,
              }}>
                Back
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <ScrollView>
          <PageHeader>
            <View style={{
              alignItems: 'center',
              marginBottom: 20,
            }}>
              <View style={{
                width: 120,
                height: 120,
                borderRadius: 120,
                overflow: 'hidden',
                marginBottom: 15,
              }}>
                <Image
                  source={{ uri: allDataForCandidate.imageUrl }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode='cover'
                />
              </View>
              <PageTitlePrimary text={allDataForCandidate.name} />
              <Text style={{
                marginTop: -20,
                fontSize: 18,
                color: colors.secondaryLighter,
              }}>
                { allDataForCandidate.party }
              </Text>
              {
                !!allDataForCandidate.incumbent ? (
                  <Text style={{
                    fontWeight: 'bold',
                    color: colors.secondaryLighter
                  }}>
                    Incumbent
                  </Text>
                ) : <View />
              }
            </View>
            <PageDescription text={allDataForCandidate.missionStatement} />
          </PageHeader>
          <ModalSection title='What I Stand For' data={allDataForCandidate.WhatIStandFor} />
          <ModalSection title='Jobs' data={allDataForCandidate.jobs} />
          <ModalSection title='Helping Homeowners' data={allDataForCandidate.homes} />
          <ModalSection title='Addressing Slumlords' data={allDataForCandidate.slums} />
          <ModalSection title='School Deficit' data={allDataForCandidate.schools} />
          <ModalSection title='Police Outflow' data={allDataForCandidate.police} />
        </ScrollView>
      </Modal>
    );
  }
}

class ModalSection extends PureComponent {
  render() {
    const { title, data } = this.props;
    return (
      <View style={{
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 20,
      }}>
        <PageHeaderSectionTitle
          text={title}
          customStyles={{
            color: colors.primary,
            paddingRight: 0,
            paddingLeft: 0,
          }} />
        {
          data.map((item, i) => (
            <Text key={i} style={{
              color: colors.textColor,
            }}>
              { item }
            </Text>
          ))
        }
      </View>
    );
  }
}

class PoliceTab extends PureComponent {
  state = {
    modalOpen: false,
    data: '',
  };

  closeModal = () => {
    this.setState({ modalOpen: false, data: '' });
  };

  openModal = ({ data }) => {
    this.setState({ modalOpen: true, data });
  };

  render() {
    const data = getPoliceData();
    return (
      <ScrollView>
        <CandidateModal
          closeModal={this.closeModal}
          visible={this.state.modalOpen}
          data={this.state.data} />
        {
          data.map((item, i) => (
            <CandidateComparisonData
              data={item}
              imageUrl={item.imageUrl}
              index={i}
              openCandidateProfile={this.openModal} />
          ))
        }
      </ScrollView>
    );
  }
}

class SchoolTab extends PureComponent {
  state = {
    modalOpen: false,
    data: '',
  };

  closeModal = () => {
    this.setState({ modalOpen: false, data: '' });
  };

  openModal = ({ data }) => {
    this.setState({ modalOpen: true, data });
  };

  render() {
    const data = getSchoolData();
    return (
      <ScrollView>
        <CandidateModal
          closeModal={this.closeModal}
          visible={this.state.modalOpen}
          data={this.state.data} />
        {
          data.map((item, i) => (
            <CandidateComparisonData
              data={item}
              imageUrl={item.imageUrl}
              index={i}
              openCandidateProfile={this.openModal} />
          ))
        }
      </ScrollView>
    );
  }
}

class SlumlordTab extends PureComponent {
  state = {
    modalOpen: false,
    data: '',
  };

  closeModal = () => {
    this.setState({ modalOpen: false, data: '' });
  };

  openModal = ({ data }) => {
    this.setState({ modalOpen: true, data });
  };

  render() {
    const data = getSlumlordData();
    return (
      <ScrollView>
        <CandidateModal
          closeModal={this.closeModal}
          visible={this.state.modalOpen}
          data={this.state.data} />
        {
          data.map((item, i) => (
            <CandidateComparisonData
              data={item}
              imageUrl={item.imageUrl}
              index={i}
              openCandidateProfile={this.openModal} />
          ))
        }
      </ScrollView>
    );
  }
}

class HomeOwnershipTab extends PureComponent {
  state = {
    modalOpen: false,
    data: '',
  };

  closeModal = () => {
    this.setState({ modalOpen: false, data: '' });
  };

  openModal = ({ data }) => {
    this.setState({ modalOpen: true, data });
  };

  render() {
    const data = getHomeOwnershipData();
    return (
      <ScrollView>
        <CandidateModal
          closeModal={this.closeModal}
          visible={this.state.modalOpen}
          data={this.state.data} />
        {
          data.map((item, i) => (
            <CandidateComparisonData
              data={item}
              imageUrl={item.imageUrl}
              index={i}
              openCandidateProfile={this.openModal} />
          ))
        }
      </ScrollView>
    );
  }
}

class JobsTab extends PureComponent {
  state = {
    modalOpen: false,
    data: '',
  };

  closeModal = () => {
    this.setState({ modalOpen: false, data: '' });
  };

  openModal = ({ data }) => {
    this.setState({ modalOpen: true, data });
  };

  render() {
    const data = getJobsData();
    return (
      <ScrollView>
        <CandidateModal
          closeModal={this.closeModal}
          visible={this.state.modalOpen}
          data={this.state.data} />
        {
          data.map((item, i) => (
            <CandidateComparisonData
              data={item}
              imageUrl={item.imageUrl}
              index={i}
              openCandidateProfile={this.openModal} />
          ))
        }
      </ScrollView>
    );
  }
}

class OverviewTab extends PureComponent {
  state = {
    modalOpen: false,
    data: '',
  };

  closeModal = () => {
    this.setState({ modalOpen: false, data: '' });
  };

  openModal = ({ data }) => {
    this.setState({ modalOpen: true, data });
  };

  render() {
    const data = getOverviewData();
    return (
      <ScrollView>
        <CandidateModal
          closeModal={this.closeModal}
          visible={this.state.modalOpen}
          data={this.state.data} />
        {
          data.map((d, i) => (
            <OverviewContent
              key={i}
              data={d}
              index={i}
              openCandidateProfile={this.openModal} />
          ))
        }
      </ScrollView>
    );
  }
}

class OverviewContent extends PureComponent {
  render() {
    const imageSize = 50;
    const { data, index } = this.props;
    const styles = {
      marginBottom: 30,
      paddingRight: 20,
      paddingLeft: 20,
    };
    if (index === 0) styles.marginTop = 30;

    return (
      <TouchableHighlight
        onPress={() => this.props.openCandidateProfile({ data: this.props.data })}
        underlayColor={colors.backgroundGrayDarker}
        style={styles}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}>
          <View style={{
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize,
            overflow: 'hidden',
          }}>
            <Image
              source={{ uri: data.imageUrl }}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode='cover'
            />
          </View>
          <View style={{
            marginLeft: 15,
            flexShrink: 1,
            flexGrow: 1,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: colors.primary,
                flexGrow: 1,
                flexShrink: 1,
              }}>
                { data.name }
              </Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 4,
              }}>
                <Text style={{
                  color: colors.accent,
                  flexGrow: 0,
                  flexShrink: 0,
                  marginLeft: 15,
                  marginRight: 10,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                  See Profile
                </Text>
                <SimpleLineIcons
                  name='arrow-right-circle'
                  size={15}
                  color={colors.accent} />
              </View>
            </View>
            <Text style={{
              color: colors.secondary,
              fontSize: 16,
            }}>
              { data.party }
            </Text>
            {
              !!data.incumbent ? (
                <Text style={{
                  color: colors.secondary,
                  fontWeight: 'bold',
                }}>
                  Incumbent
                </Text>
              ) : <View />
            }
            <Text style={{
              marginTop: 10,
              color: colors.textColor,
            }}>
              { data.missionStatement }
            </Text>
            <Text style={{
              marginTop: 10,
              marginBottom: 5,
              fontWeight: 'bold',
              fontSize: 16,
              color: colors.secondary,
            }}>
              What I Stand For
            </Text>
            {
              data.WhatIStandFor.map((wisf, i) => (
                <Text key={i} style={{
                  marginTop: 2,
                  color: colors.textColor
                }}>
                  - { wisf }
                </Text>
              ))
            }
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

function getPoliceData() {
  const data = getOverviewData();
  data[0].stances = [
    `Our police department is in a great place. We have one of the most diverse police forces in the country!`,
  ];
  data[1].stances = [
    `"I haven't had a contract in 3 years." That's what many officers tell me. "Treat us like human." We need to treat our officers with respect, compensation and support.`,
  ];
  data[2].stances = [
    `Our police outflow is a problem, but what we need is a stronger force that is properly trained and focused in policing our communities for a better future.`,
  ];
  data[3].stances = [
    `The police outflow is a good thing! We should keep the best cops and pay them better! Then we should concentrate their efforts on high crime issues!`,
  ];
  data[4].stances = [
    `No Information`,
  ];
  return data;
}

function getSchoolData() {
  const data = getOverviewData();
  data[0].stances = [
    `To fix our school deficity, we need to first hire a CFO and improve our Education Cost Sharing terms.`,
  ];
  data[1].stances = [
    `We need to stop gambling on our youth! We need parents part of the decision in choosing superintendents, invest in arts curriculum and grow the BOE with leaders with experience.`,
  ];
  data[2].stances = [
    `To improve the public school deficit, we need to desegregate districts, restructure our education system and hire new talent!`,
  ];
  data[3].stances = [
    `Our school system has problems. We need to fire the Board of Education, hire new superintendents and more personnel. We have too many Principals.`,
  ];
  data[4].stances = [
    `No Information`,
  ];
  return data;
}

function getSlumlordData() {
  const data = getOverviewData();
  data[0].stances = [
    `A huge initiative that we are working on is bad landlords having Municity; a single record for all properties to capitalize on all city officials to report potential issues with a given property.`,
  ];
  data[1].stances = [
    `Our efforts have not been effective, and this is life or death. We need to support LCI to do their work effectively.`,
  ];
  data[2].stances = [
    `We need to hold landlords accountable for their property upkeep and the conditions of their tenants. By increasing inspectors (by 35%) and fining absent owners, our city will improve.`,
  ];
  data[3].stances = [
    `My plan is to go after the biggest offenders in the city of New Haven. We should not accept how these large companies and corporations take advantage of our city! Enough is enough!`,
  ];
  data[4].stances = [
    `The city needs to stop neglecting how property ownership is changing hands and how properties are being managed, especially with absent landlords.`,
  ];
  return data;
}

function getHomeOwnershipData() {
  const data = getOverviewData();
  data[0].stances = [
    `Helping homeowners in New Haven is rooted into fixing our budget while holding off tax increases, which I have done as Mayor! One example of fixing the budget is we stopped refinancing our pensions to avoid a very vicious cycle.`,
  ];
  data[1].stances = [
    `New Haven city taxes has increased by 11%, this has to stop.`,
  ];
  data[2].stances = [
    `No Information`,
  ];
  data[3].stances = [
    `Helping homeowners is connected to our budget issues. We need to live within our means. Retain or lower taxes where possible!`,
  ];
  data[4].stances = [
    `No Information`,
  ];
  return data;
}

function getJobsData() {
  const data = getOverviewData();
  data[0].stances = [
    `New Haven has incredible resources for jobs! We have the Hillhouse Apprenticeship, Eli Whitney, and the Evergreen project which is a huge step in the right direction!`,
  ];
  data[1].stances = [
    `As the most critical challenge, we need to invest in vocational jobs and invest in our residents!`,
  ];
  data[2].stances = [
    `Unlike all the other Mayoral candidates, I understand what it is like to look for a job in New Haven. It is an uphill battle, not matter how qualified you are. I will fight to make this right for the underrepresented.`,
  ];
  data[3].stances = [
    `There are no jobs! We need to work on adding blue collar jobs and my plan to improve New Haven's infrastructure will do exactly that!`,
  ];
  data[4].stances = [
    `No Information`,
  ];
  return data;
}

function getOverviewData() {
  return [
    {
      name: 'Toni Harp',
      party: 'Democrat',
      missionStatement: `New Haven is a wonderful city with many things to be appreciated here! We have come a long way and still have a long way to go. I hope you support my bid as Mayor so that we continue this great progress!`,
      imageUrl: 'https://res.cloudinary.com/politixentral/image/upload/v1555284242/hds7hj578agq9fiidnhz.jpg',
      WhatIStandFor: [
        `Lower Income Support`,
        `Public Safety`,
        `Improve Education`,
        `Improve Job Opportunities`,
      ],
      incumbent: true,
    },
    {
      name: 'Justin Elicker',
      party: 'Democrat',
      missionStatement: `I’m running for Mayor because I want my daughters to grow up in a city that provides everyone the education and opportunities they need to be successful in life. We can and we must do better.`,
      imageUrl: 'https://res.cloudinary.com/politixentral/image/upload/v1549073233/Mayor_Justin_Elicker_City_New%20Haven.jpg',
      WhatIStandFor: [
        `Neighborhood Development`,
        `Inclusive Growth`,
        `Effective Government`,
      ],
    },
    {
      name: 'Urn Pendragon',
      party: 'Democrat',
      missionStatement: `I'm running for Mayor to stop the city from hemmoraging money and to ultimately advocate for the underrepsented!`,
      imageUrl: 'https://res.cloudinary.com/politixentral/image/upload/v1558813777/Screen_Shot_2019-05-25_at_3.48.39_PM.png',
      WhatIStandFor: [
        `No Information`,
      ],
    },
    {
      name: 'Wendy Hamilton',
      party: 'Democrat',
      missionStatement: `My plans for New Haven include reasonable budget cuts and serious restructuring so that we can get more done sooner!`,
      imageUrl: 'https://res.cloudinary.com/politixentral/image/upload/v1558814021/Screen_Shot_2019-05-25_at_3.53.19_PM.png',
      WhatIStandFor: [
        `Improve Tax Structure`,
        `Cut the Red Tape`,
        `Improve City Infrastructure`,
      ],
    },
    {
      name: 'Seth Poole',
      party: 'Unaffiliated',
      missionStatement: `As person that was raised and educated in New Haven, I, above all others have a better understanding of New Haven as a city and home.`,
      imageUrl: 'https://res.cloudinary.com/politixentral/image/upload/v1558814238/Screen_Shot_2019-05-25_at_3.56.59_PM.png',
      WhatIStandFor: [
        `No Information`,
      ],
    },
  ];
}

// - this is gross, but were on a time crunch and we need to get
//   an investment :)
function getAllData() {
  const allData = [];
  const overview = getOverviewData();
  const jobsData = getJobsData();
  const homeData = getHomeOwnershipData();
  const slumData = getSlumlordData();
  const schoolData = getSchoolData();
  const policeData = getPoliceData();
  for (let i = 0; i < 5; i++) {
    allData.push({
      ...overview[i],
      jobs: jobsData[i].stances,
      homes: homeData[i].stances,
      slums: slumData[i].stances,
      schools: schoolData[i].stances,
      police: policeData[i].stances,
    });
  }
  return allData.reduce((all, item) => {
    all[item.name] = item;
    return all;
  }, {});
}

export default createMaterialTopTabNavigator ({
  Overview: {
    screen: OverviewTab,
    navigationOptions: {
      tabBarLabel: 'Overview',
    },
  },
  Jobs: {
    screen: JobsTab,
    navigationOptions: {
      tabBarLabel: 'Jobs',
    },
  },
  Homeowners: {
    screen: HomeOwnershipTab,
    navigationOptions: {
      tabBarLabel: 'Helping Homeowners',
    },
  },
  Slumlords: {
    screen: SlumlordTab,
  },
  Schools: {
    screen: SchoolTab,
    navigationOptions: {
      tabBarLabel: 'School Deficit',
    },
  },
  Police: {
    screen: PoliceTab,
    navigationOptions: {
      tabBarLabel: 'Police Outflow',
    },
  },
}, {
  lazy: true,
  tabBarOptions: {
    scrollEnabled: true,
    activeTintColor: 'white',
    inactiveTintColor: colors.secondaryLighter,
    style: {
      backgroundColor: colors.secondary,
    },
    indicatorStyle: {
      backgroundColor: 'white',
    },
  },
});

class RaceDetailCandidates extends PureComponent {
  render() {
    return (
      <View style={styles.raceDetailCandidates}>
        <CandidateSummaryHeader />
        <CandidateSummaryHeader />
        <CandidateSummaryHeader />
        <CandidateSummaryHeader />
      </View>
    );
  }
}

class CandidateSummaryHeader extends PureComponent {
  render() {
    return (
      <View style={styles.candidateSummaryHeader}>
        <View style={styles.candidateSummaryHeaderImage} />
        <Text style={styles.candidateSummaryHeaderFirstName}>
          candidate
        </Text>
        <Text style={styles.candidateSummaryHeaderLastName}>
          name
        </Text>
      </View>
    );
  }
}

class CandidateComparisonData extends PureComponent {
  render() {
    const { index, data } = this.props;
    const imageSize = 50;
    const styles = {
      paddingRight: 20,
      paddingLeft: 20,
      marginBottom: 30,
    };
    if (index === 0) styles.marginTop = 30;

    return (
      <TouchableHighlight
        onPress={() => this.props.openCandidateProfile({ data })}
        underlayColor={colors.backgroundGrayDarker}
        style={styles}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}>
          <View style={{
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize,
            overflow: 'hidden',
          }}>
            <Image
              source={{ uri: data.imageUrl }}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode='cover'
            />
          </View>
          <View style={{
            flexGrow: 1,
            flexShrink: 1,
            marginLeft: 20,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: colors.primary,
                flexGrow: 1,
                flexShrink: 1,
              }}>
                { data.name }
              </Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 3,
                flexGrow: 0,
                flexShrink: 0,
              }}>
                <Text style={{
                  color: colors.accent,
                  flexGrow: 0,
                  flexShrink: 0,
                  marginLeft: 15,
                  marginRight: 10,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                  See Profile
                </Text>
                <SimpleLineIcons
                  name='arrow-right-circle'
                  size={15}
                  color={colors.accent} />
              </View>
            </View>
            {
              data.stances.map((item, i) => {
                return (
                  <Text key={i} style={styles.candidateComparisonDataItem}>
                    { item }
                  </Text>
                );
              })
            }
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
