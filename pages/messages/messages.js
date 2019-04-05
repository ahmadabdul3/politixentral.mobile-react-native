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
      return senderFirstName + ' ' + senderLastName;
    }

    let otherPerson;

    if (senderId === currentUserId) otherPerson = receiverFirstName + ' ' + receiverLastName;
    else otherPerson = senderFirstName + ' ' + senderLastName;
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
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 16, color: colors.textColor }}>
                { this.parties }
              </Text>
              <Text style={{
                fontSize: 11,
                color: colors.textColorLight
              }}>
                { createdAt.slice(0, 10) }
              </Text>
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
          { senderEmail[0].toUpperCase() }
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
          { receiverEmail[0].toUpperCase() }
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
  state = {
    messages: [],
  };

  componentDidMount() {
    const { navigation } = this.props;
    const messageData = navigation.getParam('messageData');
    const { threadId } = messageData;
    const url = 'messages/thread/' + threadId;
    dataApiGet(url).then(r => {
      this.setState({ messages: r.messageData });
    }).catch(e => {
      console.log('err', e);
    });
  }

  render() {
    const { navigation } = this.props;
    const currentUser = navigation.getParam('currentUser');
    const { messages } = this.state;

    return (
      <ScrollView style={{
        paddingBottom: 20,
        backgroundColor: 'white',
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
                  borderTopColor: i === 0 ? 'white' : colors.backgroundGray,
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
    );
  };
}
