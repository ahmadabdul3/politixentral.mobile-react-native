import React, { PureComponent } from 'react';
import {
  Text, View, StyleSheet,
  ScrollView, Image, Modal,
  TouchableHighlight, Button,
  TouchableOpacity,
} from 'react-native';
import rawStyles from 'px/styles/pages/race-details';
const styles = StyleSheet.create(rawStyles);
import ShadowView from 'px/components/shadow-view';
import PageSection from 'px/components/page-section';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
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
import { Ionicons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import LinkText from 'px/components/link_text';
import { dataApiGet } from 'px/clients/data_api_client';

let raceDetailData = {
  allData: {
    ob: null,
    ar: null,
  },
  articles: null,
};

class CantLoadData extends PureComponent {
  render() {
    return (
      <View>
        <Text style={{
          margin: 20,
        }}>
          Oops! We could't load the race information. Please try closing and opening
          the app. If this problem keeps happening you can send us an email
          or reach out to us via our social media. You can find all of our contact
          info in the settings page.
        </Text>
      </View>
    );
  }
}

class CandidateModal extends PureComponent {
  render() {
    const { data, visible } = this.props;
    if (!!data === false || !!raceDetailData.allData.ob === false) return null;
    const allData = raceDetailData.allData.ob;
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
          alignItems: 'flex-end',
          backgroundColor: colors.secondary,
        }}>
          <TouchableHighlight onPress={this.props.closeModal}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style={{
                color: 'white',
                marginRight: 5,
                marginTop: -3,
              }}>
                Close
              </Text>
              <AntDesign
                name='close'
                color='white'
                size={20} />
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

class TopicModalWrapper extends PureComponent {
  render() {
    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={this.props.visible}
        onRequestClose={this.props.closeModal}
        onBackButtonPress={this.props.closeModal}>
        <View style={{
          paddingTop: 35,
          paddingRight: 20,
          paddingLeft: 20,
          paddingBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          backgroundColor: colors.secondary,
          borderBottomWidth: 1,
          borderBottomColor: colors.secondaryLight
        }}>
          <PageTitlePrimary text={this.props.topic.name} customStyles={{
            flexGrow: 1,
            flexShrink: 1,
            marginTop: 0,
            marginBottom: 0,
            paddingBottom: 0,
          }} />
          <TouchableHighlight
            onPress={this.props.closeModal}
            style={{
              flexGrow: 0,
              flexShrink: 0,
              marginLeft: 15,
            }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style={{
                color: 'white',
                marginRight: 5,
                marginTop: -3,
              }}>
                Close
              </Text>
              <AntDesign
                name='close'
                color='white'
                size={20} />
            </View>
          </TouchableHighlight>
        </View>
        { this.props.pageContent() }
      </Modal>
    );
  }
}

class TopicModal extends PureComponent {
  get topicMarkup() {
    const { topic } = this.props;
    switch (topic.route) {
      case 'Missions': return <CandidatesTab />;
      case 'Jobs': return <JobsTab />;
      case 'Homeowners': return <HomeOwnershipTab />;
      case 'Slumlords': return <SlumlordTab />;
      case 'Schools': return <SchoolTab />;
      case 'Police': return <PoliceTab />;
      case 'Articles': return <ArticlesTab />;
      default: return <View />;
    }
  }

  render() {
    return (
      <TopicModalWrapper
        visible={this.props.visible}
        closeModal={this.props.closeModal}
        pageContent={() => this.topicMarkup}
        topic={this.props.topic} />
    );
  }
}

class OverviewTabCandidates extends PureComponent {
  render() {
    if (!!this.props.error) return (<Text>Error Loading Candidates.</Text>);
    if (!!this.props.data === false) return (<Text>Loading Candidates...</Text>);

    const imageSize = 50;
    return (
      <View style={{
        marginTop: -10,
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: colors.primary,
          marginBottom: 10,
        }}>
          Running Candidates
        </Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: -10,
          marginLeft: -18,
          marginRight: -18,
        }}>
          {
            raceDetailData.allData.ar.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => this.props.openCandidateModal({ candidateData: item })}
                style={{
                  // flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 30,
                  marginRight: 10,
                  marginLeft: 10,
                  maxWidth: 120,
                  // backgroundColor: 'white',
                  // borderRadius: 5,
                  // borderWidth: 1,
                  // borderColor: colors.backgroundGrayDark,
                  // padding: 15,
                }}>
                <View style={{
                  width: imageSize,
                  height: imageSize,
                  borderRadius: imageSize,
                  overflow: 'hidden',
                }}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    resizeMode='cover'
                  />
                </View>
                <View style={{
                  // marginLeft: 10,
                }}>
                  <Text style={{
                    marginTop: 5,
                    fontWeight: 'bold',
                    color: colors.primary,
                    fontSize: 14,
                    textAlign: 'center',
                  }}>
                    { item.name }
                  </Text>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{
                        color: colors.accent,
                        fontWeight: 'bold',
                        fontSize: 12,
                      }}>
                        Profile
                      </Text>
                      <SimpleLineIcons
                        name='arrow-right-circle'
                        size={12}
                        color={colors.accent}
                        style={{
                          marginTop: 3,
                          marginLeft: 5,
                        }} />
                    </View>
                  </View>
                  {
                    // <Text style={{ color: colors.secondary, marginTop: 3 }}>
                    //   { item.party }
                    // </Text>
                    // <Text style={{
                    //   color: colors.secondaryLight,
                    //   fontWeight: 'bold',
                    //   marginTop: 2,
                    //   fontSize: 11,
                    // }}>
                    //   { !!item.incumbent ? 'INCUMBENT' : 'MAYORAL CANDIDATE' }
                    // </Text>
                  }
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    )
  }
}

export default class OverviewTab extends PureComponent {
  state = {
    modalOpen: false,
    topic: '',
    data: '',
    error: '',
    candidateModalOpen: '',
    candidateData: '',
  };

  closeModal = () => {
    this.setState({ modalOpen: false, topic: '' });
  };

  openModal = ({ topic }) => {
    this.setState({ modalOpen: true, topic });
  };

  closeCandidateModal = () => {
    this.setState({ candidateModalOpen: false, candidateData: '' });
  };

  openCandidateModal = ({ candidateData }) => {
    this.setState({ candidateModalOpen: true, candidateData });
  };

  componentDidMount() {
    dataApiGet('race-details').then(r => {
      raceDetailData = r.data;
      this.setState({ data: r.data });
    }).catch(e => {
      console.log('ERROR', e);
      this.setState({ error: e });
    });
  }

  render() {
    return (
      <View style={{
        flexGrow: 1,
        flexShrink: 1,
      }}>
        <PageHeader>
          <PageTitlePrimary text='Mayoral Race Details' />
          <PageHeaderSectionTitle text='New Haven - 2019' customStyles={{
            marginTop: -10,
          }} />
        </PageHeader>
        <TopicModal
          visible={this.state.modalOpen}
          closeModal={this.closeModal}
          topic={this.state.topic} />
        <CandidateModal
          closeModal={this.closeCandidateModal}
          visible={this.state.candidateModalOpen}
          data={this.state.candidateData} />
        { getRaceDetailsTabs() }
        {
          // <ScrollView>
          //   <View style={{
          //     marginLeft: 20,
          //     marginRight: 20,
          //     paddingTop: 30,
          //     paddingBottom: 30,
          //   }}>
          //     <OverviewTabCandidates
          //       data={this.state.data}
          //       error={this.state.error}
          //       openCandidateModal={this.openCandidateModal} />
          //     <TopicsCovered />
          //   </View>
          // </ScrollView>
        }
      </View>
    );
  }
}

class TopicsCovered extends PureComponent {
  render() {
    return (
      <View>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        marginTop: 40,
      }}>
        Topics Covered
      </Text>
      <Text style={{
        color: colors.textColor,
        fontSize: 16,
        lineHeight: 22,
        marginTop: 10,
      }}>
        Below is a list of topics that cover detailed comparative information
        about the mayoral candidates and their stance on current issues.
      </Text>
      <Text style={{
        marginTop: 10,
        fontSize: 16,
        lineHeight: 22,
        color: colors.textColorLight,
        fontStyle: 'italic',
      }}>
        Click on a topic below to see the details
      </Text>
      <View style={{ marginTop: 10 }} />
      {
        [
          {
            name: 'Mission Statements',
            route: 'Missions',
          },
          {
            name: 'Jobs',
            route: 'Jobs',
          },
          {
            name: 'Helping Homeowners',
            route: 'Homeowners',
          },
          {
            name: 'Slumlords',
            route: 'Slumlords',
          },
          {
            name: 'School Deficit',
            route: 'Schools',
          },
          {
            name: 'Police Outflow',
            route: 'Police',
          },
          {
            name: 'News Articles',
            route: 'Articles',
          },
        ].map((topic, i) => (
          <View style={{
            flexDirection: 'row',
            // justifyContent: 'center',
          }}>
            <TouchableOpacity
              key={i}
              onPress={() => this.openModal({ topic })}
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{
                color: colors.accent,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
                { topic.name }
              </Text>
              <SimpleLineIcons
                name='arrow-right-circle'
                size={15}
                color={colors.accent}
                style={{
                  marginTop: 2,
                  marginLeft: 10,
                }} />
            </TouchableOpacity>
          </View>
        ))
      }
      </View>
    );
  }
}

class ArticlesTab extends PureComponent {
  render() {
    const data = raceDetailData.articles;
    if (!!data === false) return <CantLoadData navigation={this.props.navigation} />;
    return (
      <ScrollView>
        {
          data.map((item, i) => (
            <ArticleSummary
              data={item}
              index={i}
              key={i} />
          ))
        }
      </ScrollView>
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
    const data = raceDetailData.allData.ar;
    if (!!data === false) return <CantLoadData navigation={this.props.navigation} />;;
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
              stances={item.police}
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
    const data = raceDetailData.allData.ar;
    if (!!data === false) return <CantLoadData navigation={this.props.navigation} />;;
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
              stances={item.schools}
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
    const data = raceDetailData.allData.ar;
    if (!!data === false) return <CantLoadData navigation={this.props.navigation} />;;
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
              stances={item.slums}
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
    const data = raceDetailData.allData.ar;
    if (!!data === false) return <CantLoadData navigation={this.props.navigation} />;;
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
              stances={item.homes}
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
    const data = raceDetailData.allData.ar;
    if (!!data === false) return <CantLoadData navigation={this.props.navigation} />;;
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
              stances={item.jobs}
              imageUrl={item.imageUrl}
              index={i}
              openCandidateProfile={this.openModal} />
          ))
        }
      </ScrollView>
    );
  }
}

class CandidatesTab extends PureComponent {
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
    const data = raceDetailData.allData.ar;
    if (!!data === false) return <CantLoadData navigation={this.props.navigation} />;;
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
      <View style={styles}>
        <View style={[{
          flexDirection: 'row',
          alignItems: 'flex-start',
        }]}>
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
              {
                // <TouchableOpacity
                //   onPress={() => this.props.openCandidateProfile({ data: this.props.data })}
                // >
                //   <View style={{
                //     flexDirection: 'row',
                //     alignItems: 'center',
                //     marginTop: 4,
                //   }}>
                //     <Text style={{
                //       color: colors.accent,
                //       flexGrow: 0,
                //       flexShrink: 0,
                //       marginLeft: 15,
                //       marginRight: 10,
                //       fontSize: 12,
                //       fontWeight: 'bold',
                //     }}>
                //       Profile
                //     </Text>
                //     <SimpleLineIcons
                //       name='arrow-right-circle'
                //       size={15}
                //       color={colors.accent} />
                //   </View>
                // </TouchableOpacity>
              }
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
      </View>
    );
  }
}

// const overviewTabs = createStackNavigator ({
//   RunningCandidates: {
//     screen: RunningCandidates,
//     navigationOptions: {
//       tabBarLabel: 'Overview',
//     },
//   },
//   TopicsCovered: {
//     screen: CandidatesTab,
//   },
// }, {
//   lazy: true,
//   tabBarOptions: {
//     scrollEnabled: true,
//     activeTintColor: 'white',
//     inactiveTintColor: colors.secondaryLighter,
//     style: {
//       backgroundColor: colors.secondary,
//     },
//     indicatorStyle: {
//       backgroundColor: 'white',
//     },
//   },
// });

// export default createStackNavigator ({
//   Overview: {
//     screen: OverviewTab,
//     navigationOptions: {
//       tabBarLabel: 'Overview',
//     },
//   },
//   Candidates: {
//     screen: CandidatesTab,
//   },
//   Jobs: {
//     screen: JobsTab,
//     navigationOptions: {
//       tabBarLabel: 'Jobs',
//     },
//   },
//   Homeowners: {
//     screen: HomeOwnershipTab,
//     navigationOptions: {
//       tabBarLabel: 'Helping Homeowners',
//     },
//   },
//   Slumlords: {
//     screen: SlumlordTab,
//   },
//   Schools: {
//     screen: SchoolTab,
//     navigationOptions: {
//       tabBarLabel: 'School Deficit',
//     },
//   },
//   Police: {
//     screen: PoliceTab,
//     navigationOptions: {
//       tabBarLabel: 'Police Outflow',
//     },
//   },
//   Articles: {
//     screen: ArticlesTab,
//   },
// }, {
//   lazy: true,
//   tabBarOptions: {
//     scrollEnabled: true,
//     activeTintColor: 'white',
//     inactiveTintColor: colors.secondaryLighter,
//     style: {
//       backgroundColor: colors.secondary,
//     },
//     indicatorStyle: {
//       backgroundColor: 'white',
//     },
//   },
// });

class Something extends PureComponent {
  render() {
    return (
      <Text>something</Text>
    );
  }
}

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
    const { index, data, stances } = this.props;
    const imageSize = 50;
    const styles = {
      paddingRight: 20,
      paddingLeft: 20,
      marginBottom: 30,
    };
    if (index === 0) styles.marginTop = 30;

    return (
      <View style={styles}>
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
              {
                // <TouchableOpacity
                //   onPress={() => this.props.openCandidateProfile({ data })}
                // >
                //   <View style={{
                //     flexDirection: 'row',
                //     alignItems: 'center',
                //     marginTop: 3,
                //     flexGrow: 0,
                //     flexShrink: 0,
                //   }}>
                //     <Text style={{
                //       color: colors.accent,
                //       flexGrow: 0,
                //       flexShrink: 0,
                //       marginLeft: 15,
                //       marginRight: 10,
                //       fontSize: 12,
                //       fontWeight: 'bold',
                //     }}>
                //       Profile
                //     </Text>
                //     <SimpleLineIcons
                //       name='arrow-right-circle'
                //       size={15}
                //       color={colors.accent} />
                //   </View>
                // </TouchableOpacity>
              }
            </View>
            {
              stances.map((item, i) => {
                return (
                  <Text key={i} style={styles.candidateComparisonDataItem}>
                    { item }
                  </Text>
                );
              })
            }
          </View>
        </View>
      </View>
    );
  }
}

// {
//     "articleTitle": "Elicker, Brennan Eye Mayoral Runs",
//     "image": "https://www.newhavenindependent.org/images/made/archives/upload/2018/12/Misc/brennan_elicker_720_385_88_sha-100.jpg",
//     "link": "https://www.newhavenindependent.org/index.php/archives/entry/mayoral_runs/",
//     "author": "Paul Bass",
//     "date": "2018-12-19T05:00:00.000Z",
//     "summary": "Two 40-something New Haveners —a former alder who runs the Land Trust and an ex-federal prosecutor who targeted government corruption — are “seriously considering” challenging incumbent Toni Harp for mayor in 2019.",
//     "source": "New Haven Independent",
//     "tags": "#elicker #mayoralrace"
// }

class ArticleSummary extends PureComponent {
  render() {
    const { data, index } = this.props;
    const { date } = data;
    const style = {
      marginRight: 10,
      marginLeft: 10,
      marginBottom: 30,
      flexDirection: 'row',
      alignItems: 'flex-start',
    };

    if (index === 0) style.marginTop = 30;
    return (
      <View style={style}>
        <View style={{
          flexGrow: 0,
          flexShrink: 0,
          width: 75,
          height: 75,
          borderRadius: 5,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors.textColorLightest,
        }}>
          <Image
            source={{ uri: data.image }}
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
          <Text style={{
            fontWeight: 'bold',
            color: colors.primary,
          }}>
            { data.articleTitle}
          </Text>
          <Text style={{
            color: colors.secondary,
            marginTop: 3,
            fontStyle: 'italic',
          }}>
            By { data.author }
          </Text>
          <Text style={{
            marginTop: 10,
            color: colors.textColor,
          }}>
            { data.summary }
          </Text>
          <Text style={{
            fontSize: 12,
            color: colors.secondaryLight,
            marginTop: 10,
            fontWeight: 'bold',
          }}>
            { data.tags.toLowerCase() }
          </Text>
          <Text style={{
            fontSize: 12,
            color: colors.textColor,
            marginTop: 10,
          }}>
            { data.source }
          </Text>
          <View style={{
            flexDirection: 'row',
          }}>
            <Text style={{
              fontSize: 12,
              color: colors.textColor,
              flexGrow: 1,
              flexShrink: 1,
            }}>
              { date.substring(5, 7) }/{ date.substring(8, 10) }/{ date.substring(2, 4) }
            </Text>
            <LinkText
              text='Full Article'
              icon={(
                <SimpleLineIcons
                  name='arrow-right-circle'
                  size={15}
                  color={colors.accent}
                  style={{
                    marginTop: 2,
                  }} />
              )}
              link={data.link}
              styles={{
                color: colors.accent,
                flexGrow: 0,
                flexShrink: 0,
                marginLeft: 10,
                fontSize: 12,
                fontWeight: 'bold',
                marginRight: 10,
              }} />
          </View>
        </View>
      </View>
    );
  }
}

class BackToOverview extends PureComponent {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          key={i}
          onPress={() => this.props.navigation.navigate('Overview')}
          style={{
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Ionicons
            name='ios-arrow-round-back'
            size={18}
            color={colors.secondary}
            style={{
              marginTop: 3,
            }} />
          <Text style={{
            color: colors.secondary,
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
            Back to Overview
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
