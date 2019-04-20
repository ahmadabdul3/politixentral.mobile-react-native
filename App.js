import React from 'react';
import { Notifications } from 'expo';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Router from 'px/router';
import { Provider } from 'react-redux';
import reducer from 'px/redux';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { requestPermissionForPushNotifications } from 'px/services/push_notification_permissions';

const store = createStore(
  reducer, // new root reducer with router state
  {}, // initial state
  compose(
    applyMiddleware(thunk),
  ),
);

export default class App extends React.Component {
  state = {
    notification: {},
  };

  componentDidMount() {
    requestPermissionForPushNotifications();
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    console.log('notification', notification);
    if (notification.origin === 'received') {
      Alert.alert(
        'New Message',
        notification.data.message,
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
    this.setState({ notification: notification });
  };

  // render() {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <Text>Origin: {this.state.notification.origin}</Text>
  //       <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
  //     </View>
  //   );
  // }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
