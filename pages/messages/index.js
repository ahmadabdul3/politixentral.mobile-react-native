import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MessagesPageContainer from 'px/containers/messages_page_container';
import { MessageThread } from './messages';
import colors from 'px/styles/colors';

export default createStackNavigator({
  Home: {
    screen: (props) => <MessagesPageContainer navigation={props.navigation} />,
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
