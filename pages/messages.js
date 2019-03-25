import React, { PureComponent } from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  TextInput,
  Text, View, ScrollView, Image,
  TouchableHighlight, AsyncStorage, Button,
  TouchableOpacity,
  FlatList,
  Modal,
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

class PageComponent extends PureComponent {
  state = {
    messages: [],
    messagesRefreshing: false,
    error: '',
  };

  componentDidMount() {
    this.fetchMessages();
  }

  async getUser() {
    if (this.user) return this.user;
    const rawUser = await AsyncStorage.getItem(LOCAL_STORAGE.USER_INFO);
    if (rawUser) {
      const user = JSON.parse(rawUser);
      this.user = user;
      return user;
    }
    // - I have to update the redux global store to keep track of a user session when a person logs in / out
    // this.setState({ error: `Please create an account or log in to send and view messages. You can get started on the Settings (gear icon) page.` });
    throw({ message: 'no user session' });
  }

  async fetchMessages() {
    try {
      const user = await this.getUser();
      const { id } = user;
      const url = urls.dataApiServer + 'messages?userId=' + id;
      const res = await http.get(url);
      this.setState({ messages: res.messageData });
    } catch (e) {
      console.log('error', e);
    }
  }

  refreshMessages = async () => {
    this.setState({ messagesRefreshing: true, messages: [] });
    await this.fetchMessages();
    this.setState({ messagesRefreshing: false });
  }

  render() {
    const { messages, messagesRefreshing } = this.state;
    // console.log('messages', this.props);

    return (
      <ScrollView>
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
              flexGrow: 1, flexShrink: 1,
              marginTop: 25,
              marginRight: 25,
              marginLeft: 25,
              marginBottom: 0
            }}
            onPress={this.refreshMessages}
            loading={messagesRefreshing} />
        </PageHeader>
        <View style={{ paddingBottom: 20 }}>
          {
            messages && messages.length ? (
              messages.map(m =>
                <MessageSummary
                  messageData={m}
                  key={m.id}
                  navigation={this.props.navigation}
                  currentUser={this.user} />)
            ) : <NoMessages />
          }
        </View>
      </ScrollView>
    );
  }
}

class MessageSummary extends PureComponent {
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

  render() {
    const { messageData, navigation, currentUser } = this.props;
    const { title, body, createdAt } = messageData;
    return (
      <View style={{
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.backgroundGrayDarker,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 3,
        minHeight: 50,
      }}>
        <TouchableHighlight
          onPress={() => { navigation.navigate('MessageThread', { messageData, currentUser }); }}
          underlayColor={colors.backgroundGrayDarker}
        >
          <View style={{ padding: 20 }}>
            <Text style={{ fontWeight: 'bold', color: colors.textColor }}>
              { title }
            </Text>
            <Text style={{ marginTop: 10, color: colors.textColor }}>
              { body }
            </Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
              borderTopWidth: 1,
              borderTopColor: colors.backgroundGray,
              paddingTop: 15,
            }}>
              <View>
                <Text style={{
                  color: colors.textColorLight,
                  fontWeight: 'bold',
                  fontSize: 9,
                }}>
                  SENT TO
                </Text>
                <Text style={{
                  color: colors.textColorLight,
                  fontSize: 10,
                  marginTop: 2,
                }}>
                  { this.determinePolitician() }
                </Text>
              </View>
              <View>
                <Text style={{
                  color: colors.textColorLight,
                  fontWeight: 'bold',
                  fontSize: 9,
                  textAlign: 'right',
                }}>
                  DATE SENT
                </Text>
                <Text style={{
                  textAlign: 'right',
                  fontSize: 10,
                  marginTop: 2,
                  color: colors.textColorLight
                }}>
                  { createdAt.slice(0, 10) }
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
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

class MessageThread extends PureComponent {
  state = {
    messages: [],
  };

  componentDidMount() {
    const { navigation } = this.props;
    const messageData = navigation.getParam('messageData');
    const { threadId } = messageData;
    const url = urls.dataApiServer + 'messages/thread/' + threadId;
    http.get(url).then(r => {
      const { messageData } = r;
      this.setState({ messages: messageData });
    }).catch(e => {
      console.log('err', e);
    });
  }

  render() {
    const { navigation } = this.props;
    const currentUser = navigation.getParam('currentUser');
    const { messages } = this.state;

    return (
      <ScrollView style={{ paddingBottom: 20 }}>
        {
          messages && messages.length > 0 ? (
            messages.map(m => (
              <MessageSummary
                key={m.id}
                messageData={m}
                currentUser={currentUser}
                navigation={{ navigate: () => {}}}
              />
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

// class MessageThreadSummary extends PureComponent {
//   render() {
//     return (
//       <View style={{
//         padding: 20,
//         margin: 10,
//         marginTop: 20,
//         marginBottom: 20,
//         backgroundColor: 'white',
//         borderWidth: 1,
//         borderColor: colors.backgroundGrayDarker,
//       }}>
//         <Text>
//
//         </Text>
//       </View>
//     );
//   }
// }


export default class PageNav extends PureComponent {
  render() {
    const Nav = createStackNavigator({
      Home: {
        screen: PageComponent,
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
      MessageThread: {
        screen: MessageThread,
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
