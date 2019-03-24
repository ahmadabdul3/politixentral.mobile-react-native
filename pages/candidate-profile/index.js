import React, { PureComponent } from 'react';
import candidateProfileStyles from 'px/styles/pages/candidate-profile';
import colors from 'px/styles/colors';
import { createMaterialTopTabNavigator } from 'react-navigation';
import {
  View, Text, Animated, ScrollView, Modal,
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
        <NewMessageForm
          visible={newMessageModalVisible}
          closeModal={this.closeModal}
          politicianData={politicianData} />
        <Initiatives politicianData={politicianData} />
      </ScrollView>
    );
  }
}

class NewMessageForm extends PureComponent {
  messageSending = false;
  user;
  state = {
    title: '',
    body: '',
    messageSending: false,
    formMessage: '',
  };

  componentDidMount() {
    AsyncStorage.getItem(LOCAL_STORAGE.USER_INFO).then(rawUser => {
      if (rawUser) return JSON.parse(rawUser);
      throw({ message: 'no user session' });
    }).then(user => {
      this.user = user;
    }).catch(e => {
      console.log('error', e);
    });
  }

  changeTitle = (title) => {
    this.setState({
      title,
      formMessage: '',
    });
  };

  changeBody = (body) => {
    this.setState({
      body,
      formMessage: '',
    });
  };

  sendMessage = async () => {
    if (this.messageSending) return;
    try {
      this.messageSending = true;
      this.setState({ messageSending: true });
      const title = this.state.title.trim();
      const body = this.state.body.trim();
      if (!title || !body) throw({ friendlyMessage: 'Please provide a title and the details of your message.' });
      const url = urls.dataApiServer + 'messages';
      const { politicianData } = this.props;
      const senderId = this.user.id;
      const receiverId = this.props.politicianData.userId;
      const polFirstName = politicianData.firstName;
      const polLastName = politicianData.lastName;
      const polFullName = polFirstName + ' ' + polLastName;
      const message = { senderId, receiverId, title, body };
      console.log('message', message);
      const newMessage = await http.post(url, { message });
      this.setState({
        formMessage: '',
        messageSending: false,
        title: '',
        body: ''
      });
      this.messageSending = false;
      Alert.alert(
        'Good News',
        'Your message successfully reached ' + polFullName + '.',
        [{ text: 'OK', onPress: this.props.closeModal }],
        { cancelable: false },
      );
    } catch (e) {
      console.log(e);
      const formMessage = e.friendlyMessage
        || `There was a problem with sending your message, please try again.`;
      this.setState({ formMessage, messageSending: false });
      this.messageSending = false;
    }
  };

  render() {
    const { visible, closeModal } = this.props;
    const { title, body, messageSending, formMessage } = this.state;

    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <ScrollView
              style={{
                flexGrow: 1,
                flexShrink: 1,
              }}>
                <PageHeaderLargeTop>
                  <PageTitlePrimary>
                    Send a Message
                  </PageTitlePrimary>
                  <PageDescription>
                    Please provide a title and the details for your message.
                  </PageDescription>
                </PageHeaderLargeTop>
              <View style={{ padding: 20, paddingRight: 15, paddingLeft: 15 }}>
                <BaseInput
                  placeholder='Title'
                  onChange={this.changeTitle}
                  value={title} />
                <BaseTextarea
                  placeholder='Details'
                  value={body}
                  onChange={this.changeBody} />
                <FormMessage message={formMessage} />
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                  <SecondaryButton
                    onPress={closeModal}
                    customStyles={{ marginRight: 3 }}
                    text='Cancel' />
                  <PrimaryButton
                    onPress={this.sendMessage}
                    customStyles={{ marginLeft: 3 }}
                    text='Send Message'
                    loading={messageSending} />
                </View>
              </View>
            </ScrollView>
        </Modal>
    )
  }
}

class FormMessage extends PureComponent {
  render() {
    const { message } = this.props;
    if (!message) return null;
    return (
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Text>
          { message }
        </Text>
      </View>
    );
  }
}

// <TouchableOpacity
//   activeOpacity={1}
//   onPress={() => {
//     console.log('textarea focused', this.messageDetailsTextareaFocused);
//     if (this.messageDetailsTextareaFocused) {
//       Keyboard.dismiss();
//     }
//   }}
//   style={{
//     flexGrow: 1,
//     flexShrink: 1,
//   }}>


// <View style={candidateProfileStyles.tabHeader}>
//   <Text style={candidateProfileStyles.tabHeaderText}>
//     David Reyes
//   </Text>
// </View>
