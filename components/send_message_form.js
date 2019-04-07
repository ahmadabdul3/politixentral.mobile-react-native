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

  validateInputs() {
    const body = this.state.body.trim();
    if (this.props.replyMessage) return this.validateReplyMessage({ body });
    return this.validateInitialMessage({ body });
  }

  validateReplyMessage({ body }) {
    if (body) return { body };
    throw ({
      friendlyMessage: 'Please provide the details of your message.'
    });
  }

  validateInitialMessage({ body }) {
    const title = this.state.title.trim();
    if (title && body) return { title, body };
    throw ({
      friendlyMessage: 'Please provide a title and the details of your message.'
    });
  }

  getMessageData() {
    const senderId = this.user.id;
    const receiverId = this.props.politicianData.userId;
    return { senderId, receiverId };
  }

  sendMessage = async () => {
    if (this.messageSending) return;
    this.messageSending = true;
    try {
      const { getMessagesSuccess, getMessageData, updateThreadMessages } = this.props;
      this.setState({ messageSending: true });
      const { title, body } = this.validateInputs();
      const messageData = getMessageData ? await getMessageData() : this.getMessageData();
      messageData.title = messageData.title || title;
      messageData.body = body;
      const newMessage = await dataApiPost('messages', { message: messageData });
      getMessagesSuccess(newMessage.messageData);
      if (updateThreadMessages) await updateThreadMessages();
      this.setState({
        formMessage: '',
        messageSending: false,
        title: '',
        body: ''
      });
      this.messageSending = false;
      Alert.alert(
        'Good News',
        'Your message was delivered successfully.',
        [{ text: 'OK', onPress: this.props.closeModal }],
        { cancelable: false },
      );
    } catch (e) {
      console.log(e);
      this.messageSending = false;
      if (e.message === 'user not logged in') {
        this.setState({ formMessage: 'Please log in to send messages.', messageSending: false });
        return;
      }
      const formMessage = e.friendlyMessage
        || `There was a problem with sending your message, please try again.`;
      this.setState({ formMessage, messageSending: false });
    }
  };

  get pageDescriptionText() {
    const { replyMessage } = this.props;
    if (replyMessage) return 'Please provide the details for your message.';
    return 'Please provide a title and the details for your message.';
  }

  render() {
    const { visible, replyMessage } = this.props;
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
                    { this.pageDescriptionText }
                  </PageDescription>
                </PageHeaderLargeTop>
              <View style={{ padding: 20, paddingRight: 15, paddingLeft: 15 }}>
                {
                  replyMessage ? null : (
                    <BaseInput
                      placeholder='Title'
                      onChange={this.changeTitle}
                      value={title} />
                  )
                }
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
