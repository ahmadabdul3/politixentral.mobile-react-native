import React, { PureComponent, Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  TextInput,
  Text, View, ScrollView, Image,
  TouchableHighlight, AsyncStorage, Button,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import colors from 'px/styles/colors';
import {
  PageTitlePrimary, PageDescription, PageHeader
} from 'px/components/page-text';
import ComingSoon from 'px/components/coming-soon';
import http from 'px/services/http';
import urls from 'px/constants/urls';
import LOCAL_STORAGE from 'px/constants/local-storage';
import { PrimaryButton } from 'px/components/buttons';
import { dataApiGet } from 'px/clients/data_api_client';
import SendMessageFormContainer from 'px/containers/send_message_form_container';

export default class PageComponent extends PureComponent {
  user;
  state = {
    messages: [],
    messagesRefreshing: false,
    error: '',
  };

  componentDidMount() {
    this.fetchMessages();
  }

  getUser = async () => {
    if (this.user) return this.user;
    const rawUser = await AsyncStorage.getItem(LOCAL_STORAGE.USER_INFO);
    if (rawUser) {
      const user = JSON.parse(rawUser);
      this.user = user;
      return user;
    }

    throw({ name: 'NoAuthSession', message: 'no user session' });
  };

  getSession = async () => {
    const rawSession = await AsyncStorage.getItem(LOCAL_STORAGE.SESSION_INFO);
    if (!rawSession) throw({ name: 'NoAuthSession', message: 'Please log in or sign up' });
    const session = JSON.parse(rawSession);
    return session;
  };

  fetchMessages = async () => {
    try {
      const user = await this.getUser();
      const session = await this.getSession();
      const { id } = user;
      const { access_token } = session;
      const url = 'messages?userId=' + id;
      const res = await dataApiGet(url);
      this.props.getMessagesSuccess(res.messageData);
    } catch (e) {
      console.log('error', e);
      if (e.name === 'NoAuthSession') {
        Alert.alert(
          'Please Log In',
          'You need to log in to send and view messages. You can log in or sign up in the settings page.',
          [{ text: 'OK', onPress: () => {} }],
          { cancelable: false },
        );
      }
    }
  };

  refreshMessages = async () => {
    this.setState({ messagesRefreshing: true, messages: [] });
    await this.fetchMessages();
    this.setState({ messagesRefreshing: false });
  };

  render() {
    const { messagesRefreshing } = this.state;
    const { messages } = this.props;

    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <PageHeader>
          <PageTitlePrimary>
            MESSAGES
          </PageTitlePrimary>
          <PageDescription>
            Communicate with your Representatives and let your voice be heard.
          </PageDescription>
          <PrimaryButton
            text={'Click to Refresh Messages'}
            customStyles={{
              flexGrow: 1,
              flexShrink: 1,
              marginTop: 25,
              marginRight: 25,
              marginLeft: 25,
              marginBottom: 0
            }}
            onPress={this.refreshMessages}
            loading={messagesRefreshing} />
        </PageHeader>
        <View style={{ paddingTop: 15, paddingBottom: 15 }}>
          {
            !messagesRefreshing && messages && messages.length ? (
              messages.map(m => (
                <MessageSummary
                  messageData={m}
                  key={m.id}
                  navigation={this.props.navigation}
                  currentUser={this.user} />
              ))
            ) : <NoMessages />
          }
        </View>
      </ScrollView>
    );
  }
}

class MessageSummary extends PureComponent {
  static defaultProps = {
    showTitle: true,
    currentUser: {},
  };

  determinePolitician() {
    const {
      senderId,
      senderFirstName,
      senderLastName,
      receiverId,
      receiverFirstName,
      receiverLastName
    } = this.props.messageData;
    const { id } = this.props.currentUser;
    if (id === senderId) return receiverFirstName + ' ' + receiverLastName;
    return senderFirstName + ' ' + senderLastName;
  }

  get parties() {
    const { showSenderOnly, messageData, currentUser } = this.props;
    const {
      senderId,
      senderFirstName,
      senderLastName,
      receiverFirstName,
      receiverLastName
    } = messageData;
    const currentUserId = currentUser.id;

    if (showSenderOnly) {
      if (senderId === currentUserId) return 'me';
      const { senderFirstName, senderLastName } = messageData;
      if (!senderFirstName) return 'Sender';
      return senderFirstName + ' ' + senderLastName;
    }

    let otherPerson;

    if (senderId === currentUserId) {
      if (!receiverFirstName) otherPerson = 'Recipient';
      else otherPerson = receiverFirstName + ' ' + receiverLastName;
    } else {
      if (!senderFirstName) otherPerson = 'Recipient';
      else otherPerson = senderFirstName + ' ' + senderLastName;
    }
    return otherPerson + ', me';
  }

  render() {
    const {
      messageData,
      navigation,
      currentUser,
      showTitle,
      showSenderOnly
    } = this.props;
    const { title, body, createdAt } = messageData;
    return (
      <TouchableHighlight
        onPress={() => { navigation.navigate('MessageThread', { messageData, currentUser }); }}
        underlayColor={colors.backgroundGrayDarker}
      >
        <View style={{
          backgroundColor: 'white',
          minHeight: 50,
          paddingTop: 15,
          paddingBottom: 15,
          paddingRight: 20,
          paddingLeft: 20,
          flexDirection: 'row',
        }}>
          <MessageImage
            messageData={messageData}
            showSenderOnly={showSenderOnly}
            currentUser={currentUser} />
          <View style={{
            flexGrow: 1,
            flexShrink: 1,
            marginLeft: 20,
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
              <View style={{ flexGrow: 1, flexShrink: 1, marginTop: -4 }}>
                <Text style={{ fontSize: 16, color: colors.textColor }}>
                  { this.parties }
                </Text>
              </View>
              <View style={{ flexGrow: 0, flexShrink: 0, marginLeft: 10 }}>
                <Text style={{
                  fontSize: 11,
                  color: colors.textColorLight
                }}>
                  { createdAt.slice(0, 10) }
              </Text>
              </View>
            </View>
            {
              showTitle && (
                <Text style={{ marginTop: 7, color: colors.textColor }}>
                  { title }
                </Text>
              )
            }
            <Text style={{
              marginTop: 1,
              color: colors.textColor,
              fontSize: 13,
              lineHeight: 18
            }}>
              { body }
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

class MessageImage extends PureComponent {
  get senderImage() {
    const { messageData } = this.props;
    if (messageData.senderImage) return <View />;
    const { senderFirstName, senderLastName, senderEmail } = messageData;
    if (!senderFirstName) {
      return (
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          { 'R M'.toUpperCase() }
        </Text>
      );
    }
    return (
      <Text style={{ color: 'white', fontWeight: 'bold' }}>
        { (senderFirstName[0] + ' ' + senderLastName[0]).toUpperCase() }
      </Text>
    );
  }

  get image() {
    const { messageData, showSenderOnly, currentUser } = this.props;
    const { senderId } = messageData;
    if (showSenderOnly) return this.senderImage;
    // - if the current user is not the sender, we show the sender's image,
    //   which is who the current user is communicating with. In other words,
    //   if it's a regular end user who is the current user, we want to show
    //   the image of the politician they're talking to
    else if (senderId !== currentUser.id) return this.senderImage;

    if (messageData.receiverImage) return <View />;
    const { receiverFirstName, receiverLastName, receiverEmail } = messageData;
    if (!receiverFirstName) {
      return (
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          { 'R M'.toUpperCase() }
        </Text>
      )
    }
    return (
      <Text style={{ color: 'white', fontWeight: 'bold' }}>
        { (receiverFirstName[0] + ' ' + receiverLastName[0]).toUpperCase() }
      </Text>
    );
  }

  render() {
    return (
      <View style={{
        flexGrow: 0,
        flexShrink: 0,
        width: 45,
        height: 45,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary,
      }}>
        { this.image }
      </View>
    );
  }
}

class NoMessages extends PureComponent {
  render() {
    return (
      <View style={{
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 3,
        minHeight: 30,
        padding: 20,
      }}>
        <Text>
          You don't have any messages yet.
        </Text>
      </View>
    );
  }
}

export class MessageThread extends PureComponent {
  user;
  state = {
    messages: [],
    newMessageFormOpen: false,
  };

  componentDidMount() {
    this.fetchThreadMessages();
  }

  getUser = async () => {
    if (this.user) return this.user;
    const rawUser = await AsyncStorage.getItem(LOCAL_STORAGE.USER_INFO);

    if (!rawUser) throw({ name: 'NoAuthSession', message: 'no user session' });
    const user = JSON.parse(rawUser);
    this.user = user;
    return user;
  };

  fetchThreadMessages = async () => {
    const { navigation } = this.props;
    const messageData = navigation.getParam('messageData');
    const { threadId } = messageData;
    const url = 'messages/thread/' + threadId;
    try {
      const response = await dataApiGet(url);
      this.setState({ messages: response.messageData });
    } catch (e) {
      console.log('err', e);
    }
  }

  openNewMessageForm = () => {
    AsyncStorage.getItem(LOCAL_STORAGE.SESSION_INFO).then(rawSession => {
      if (!rawSession) throw({ message: 'no user session' });
      this.setState({ newMessageFormOpen: true });
    }).catch(e => {
      if (e.message === 'no user session') {
        Alert.alert(
          'Please Log In',
          'You need to log in to send and view messages. You can log in or sign up in the settings page.',
          [{ text: 'OK', onPress: () => {} }],
          { cancelable: false },
        );
      }
    });
  }

  closeNewMessageForm = () => {
    this.setState({ newMessageFormOpen: false });
  }

  getMessageData = async () => {
    const user = await this.getUser();
    const { messages } = this.state;
    if (!messages || messages.length < 1) throw({ message: 'no messages' });
    const message = messages[messages.length - 1];
    const receiverId = message.senderId === user.id ? message.receiverId : message.senderId;
    return {
      senderId: user.id,
      receiverId,
      threadId: message.threadId,
      title: message.title,
      parentId: message.id,
    };
  }

  render() {
    const { navigation } = this.props;
    const currentUser = navigation.getParam('currentUser');
    const { messages, newMessageFormOpen } = this.state;

    return (
      <View style={{
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: 'white'
      }}>
        <SendMessageFormContainer
          replyMessage
          visible={newMessageFormOpen}
          closeModal={this.closeNewMessageForm}
          getMessageData={this.getMessageData}
          updateThreadMessages={this.fetchThreadMessages} />
        <ScrollView style={{
          paddingBottom: 20,
          backgroundColor: 'white',
          flexGrow: 1,
          flexShrink: 1,
        }}>
          {
            messages && messages.length > 0 ? (
              <Text style={{
                fontSize: 25,
                paddingTop: 35,
                paddingBottom: 20,
                paddingRight: 20,
                paddingLeft: 20,
                color: colors.textColor
              }}>
                { messages[0].title }
              </Text>
            ) : null
          }
          {
            messages && messages.length > 0 ? (
              messages.map((m, i) => (
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: i === 0 ? 'white' : colors.backgroundGrayLight,
                  }}
                  key={m.id}>
                  <MessageSummary
                    showSenderOnly
                    showTitle={false}
                    messageData={m}
                    currentUser={currentUser}
                    navigation={{ navigate: () => {}}}
                  />
                </View>
              ))
            ) : (
              <View style={{
                padding: 20,
                margin: 10,
                marginTop: 20,
                marginBottom: 20,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: colors.backgroundGrayDarker,
              }}>
                <Text>
                  Loading messages, this should only take a second.
                </Text>
              </View>
            )
          }
        </ScrollView>
        <View style={{
          flexGrow: 0,
          flexShrink: 0,
          borderTopColor: colors.backgroundGrayLight,
          borderTopWidth: 1,
        }}>
          <PrimaryButton
            text='Reply'
            customStyles={{
              flexGrow: 1,
              flexShrink: 1,
              marginTop: 10,
              marginRight: 25,
              marginLeft: 25,
              marginBottom: 10,
            }}
            onPress={this.openNewMessageForm} />
        </View>
      </View>
    );
  };
}
