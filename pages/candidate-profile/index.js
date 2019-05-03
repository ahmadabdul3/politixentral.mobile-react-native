import React, { PureComponent } from 'react';
import candidateProfileStyles from 'px/styles/pages/candidate-profile';
import colors from 'px/styles/colors';
import { createMaterialTopTabNavigator } from 'react-navigation';
import {
  View, Text, ScrollView, Modal,
  TouchableOpacity,
  Keyboard,
  AsyncStorage,
  Alert
} from 'react-native';
import RepHeader from './rep-header';
import About from './about';
import Activity from './activity';
import Initiatives from './initiatives';
import LOCAL_STORAGE from 'px/constants/local-storage';
import {
  PageTitlePrimary, PageDescription, PageHeader, PageHeaderLargeTop
} from 'px/components/page-text';
import { BaseInput, BaseTextarea } from 'px/components/inputs';
import { PrimaryButton, SecondaryButton } from 'px/components/buttons';
import urls from 'px/constants/urls';
import http from 'px/services/http';
import { dataApiPost } from 'px/clients/data_api_client';
import SendMessageFormContainer from 'px/containers/send_message_form_container';

const RepTabs = createMaterialTopTabNavigator({
  Initiatives: {
    screen: (props) => <Initiatives {...props} />,
  },
  Feed: {
    screen: (props) => <Activity {...props} /> ,
  },
  About: {
    screen: (props) => <About {...props} />,
  },
}, {
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: colors.brandPurpleLighter,
    style: {
      backgroundColor: colors.backgroundPurpleDarker,
    },
    indicatorStyle: {
      backgroundColor: 'white',
    }
  }
});

export default class CandidateProfile extends PureComponent {
  static router = RepTabs.router;
  name = 'Candidate';
  state = {
    newMessageModalVisible: false,
  };

  openNewMessageForm = () => {
    this.setState({ newMessageModalVisible: true });
  };

  closeModal = () => {
    this.setState({ newMessageModalVisible: false });
  };

  render() {
    const { navigation } = this.props;
    const { newMessageModalVisible } = this.state;
    const politicianData = navigation.getParam('politicianData');

    return (
      <ScrollView style={candidateProfileStyles.screen}>
        <RepHeader
          politicianData={politicianData}
          openNewMessageForm={this.openNewMessageForm} />
        {
          // <RepTabs
          //   navigation={this.props.navigation}
          //   screenProps={{ politicianData }}
          // />
        }
        <SendMessageFormContainer
          visible={newMessageModalVisible}
          closeModal={this.closeModal}
          politicianData={politicianData} />
        <Initiatives politicianData={politicianData} />
      </ScrollView>
    );
  }
}
