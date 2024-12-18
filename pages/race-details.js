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

class RunningCandidateSummary extends PureComponent {
  render() {
    const { item, openCandidateModal } = this.props;
    const imageSize = 70;
    const imageWrapperStyles = {
      width: imageSize,
      height: imageSize,
      borderRadius: imageSize,
      overflow: 'hidden',
    };
    if (!!item.title && item.title === 'INCUMBENT') {
      imageWrapperStyles.borderWidth = 5;
      imageWrapperStyles.borderColor = colors.secondaryLight;
    }

    return (
      <TouchableOpacity
        onPress={() => openCandidateModal({ candidateData: item })}
        style={{
          alignItems: 'center',
          marginTop: 30,
          marginRight: 10,
          marginLeft: 10,
          maxWidth: 120,
        }}>
        <View style={imageWrapperStyles}>
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode='cover'
          />
        </View>
        <View>
          <Text style={{
            marginTop: 5,
            fontWeight: 'bold',
            color: colors.primary,
            fontSize: 14,
            textAlign: 'center',
          }}>
            { item.name }
          </Text>
          {
            !!item.title ? (
              <Text style={{
                marginBottom: 5,
                color: colors.secondary,
                fontSize: 11,
                textAlign: 'center',
              }}>
                { item.title }
              </Text>
            ) : null
          }
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
        </View>
      </TouchableOpacity>
    );
  }
}

class OverviewTabCandidates extends PureComponent {
  state = {
    candidateModalOpen: false,
    candidateData: '',
  };

  closeCandidateModal = () => {
    this.setState({ candidateModalOpen: false, candidateData: '' });
  };

  openCandidateModal = ({ candidateData }) => {
    this.setState({ candidateModalOpen: true, candidateData });
  };

  get runners() {
    return raceDetailData.allData.ar.map((item, i) => {
      if (item.name === 'Toni Harp') item.title = 'INCUMBENT';
      return (
        <RunningCandidateSummary
        key={i}
        item={item}
        openCandidateModal={this.openCandidateModal} />
      );
    });
  }

  render() {
    if (!!this.props.allProps.error) return (<Text>Error Loading Candidates.</Text>);
    if (!!this.props.allProps.data === false) return (<Text>Loading Candidates...</Text>);

    return (
      <ScrollView>
        <CandidateModal
          closeModal={this.closeCandidateModal}
          visible={this.state.candidateModalOpen}
          data={this.state.candidateData} />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginRight: -5,
          marginLeft: -5,
          marginTop: 10,
          marginBottom: 30,
        }}>
          { this.runners }
        </View>
      </ScrollView>
    )
  }
}

class TopicsCovered extends PureComponent {
  state = {
    modalOpen: false,
    topic: '',
  };

  closeModal = () => {
    this.setState({ modalOpen: false, topic: '' });
  };

  openModal = ({ topic }) => {
    this.setState({ modalOpen: true, topic });
  };

  render() {
    const { openModal } = this.props.allProps;
    return (
      <ScrollView>
        <TopicModal
          visible={this.state.modalOpen}
          closeModal={this.closeModal}
          topic={this.state.topic} />
        <View style={{
          marginLeft: 20,
          marginRight: 20,
          paddingBottom: 30,
          paddingTop: 30,
        }}>
        <Text style={{
          color: colors.textColor,
          fontSize: 16,
          lineHeight: 22,
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
        <View style={{
          marginTop: 10,
        }} />
        {
          [
            { name: 'Mission Statements', route: 'Missions' },
            { name: 'Jobs', route: 'Jobs' },
            { name: 'Helping Homeowners', route: 'Homeowners' },
            { name: 'Slumlords', route: 'Slumlords' },
            { name: 'School Deficit', route: 'Schools' },
            { name: 'Police Outflow', route: 'Police' },
            // { name: 'News Articles', route: 'Articles' },
          ].map((topic, i) => (
            <View style={{
              flexDirection: 'row',
            }}>
              <TouchableOpacity
                key={i}
                onPress={() => this.openModal({ topic })}
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
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
      </ScrollView>
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

function getTheTabs(allProps) {
  const RaceDetailsInnerTabs = createMaterialTopTabNavigator ({
    RunningCandidates: {
      screen: (props) => <OverviewTabCandidates allProps={allProps} />,
      navigationOptions: {
        tabBarLabel: 'Running Candidates',
      },
    },
    TopicsCovered: {
      screen: (props) => <TopicsCovered allProps={allProps} />,
      navigationOptions: {
        tabBarLabel: 'Current Issues',
      },
    },
    Articles: {
      screen: ArticlesTab,
    }
  }, {
    lazy: true,
    tabBarOptions: {
      scrollEnabled: true,
      activeTintColor: 'white',
      inactiveTintColor: colors.secondaryLighter,
      style: {
        backgroundColor: colors.secondaryDark,
      },
      indicatorStyle: {
        backgroundColor: 'white',
      },
    },
  });

  return RaceDetailsInnerTabs;
}

export default class OverviewTab extends PureComponent {
  state = {
    data: '',
    error: '',
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
    const Tabs = getTheTabs({
      openModal: this.openModal,
      closeModal: this.closeModal,
      openCandidateModal: this.openCandidateModal,
      closeCandidateModal: this.closeCandidateModal,
      data: this.state.data,
      error: this.state.error,
    });
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
        { <Tabs something='one' /> }
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
