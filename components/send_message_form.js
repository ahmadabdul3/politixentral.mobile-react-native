import React, { PureComponent } from 'react';
import LOCAL_STORAGE from 'px/constants/local-storage';
import colors from 'px/styles/colors';
import { dataApiPost } from 'px/clients/data_api_client';
import { BaseInput, BaseTextarea } from 'px/components/inputs';
import { PrimaryButton, SecondaryButton } from 'px/components/buttons';
import {
  View, Text, Animated, ScrollView, Modal,
  TouchableOpacity,
  Keyboard,
  AsyncStorage,
  Alert
} from 'react-native';
import {
  PageTitlePrimary, PageDescription, PageHeader, PageHeaderLargeTop
} from 'px/components/page-text';

export default class SendMessageForm extends PureComponent {
  messageSending = false;
  user;
  state = {
    title: '',
    body: '',
    messageSending: false,
    formMessage: '',
  };

  componentDidMount() {
    this.setUser();
  }

  componentDidUpdate() {
    if (!this.user) this.setUser();
  }

  setUser() {
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

  closeModal = () => {
    this.setState({
      formMessage: '',
      messageSending: false,
      title: '',
      body: ''
    }, () => {
      this.props.closeModal();
    });
  };

  sendMessage = async () => {
    if (this.messageSending) return;
    try {
      const { getMessagesSuccess } = this.props;
      this.messageSending = true;
      this.setState({ messageSending: true });
      const title = this.state.title.trim();
      const body = this.state.body.trim();
      if (!title || !body) throw({ friendlyMessage: 'Please provide a title and the details of your message.' });
      const { politicianData } = this.props;
      const senderId = this.user.id;
      const receiverId = this.props.politicianData.userId;
      const polFirstName = politicianData.firstName;
      const polLastName = politicianData.lastName;
      const polFullName = polFirstName + ' ' + polLastName;
      const message = { senderId, receiverId, title, body };
      const newMessage = await dataApiPost('messages', { message });
      getMessagesSuccess(newMessage.messageData);
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
      if (e.message === 'user not logged in') {
        this.setState({ formMessage: 'Please log in to send messages.', messageSending: false });
        this.messageSending = false;
        return;
      }
      const formMessage = e.friendlyMessage
        || `There was a problem with sending your message, please try again.`;
      this.setState({ formMessage, messageSending: false });
      this.messageSending = false;
    }
  };

  render() {
    const { visible } = this.props;
    const { title, body, messageSending, formMessage } = this.state;

    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onBackButtonPress={this.closeModal}>
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
                    onPress={this.closeModal}
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
