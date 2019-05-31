import React from 'react';
import { Notifications } from 'expo';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Router from 'px/router';
import { Provider } from 'react-redux';
import reducer from 'px/redux';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import {
  requestPermissionForPushNotifications,
  determinePushNotificationPermission,
  getDeviceId,
} from 'px/services/push_notification_permissions';
import { dataApiPost } from 'px/clients/data_api_client';

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
    requestPermissionForPushNotifications().then(() => {
      return determinePushNotificationPermission();
    }).then(permissionStatus => {
      if (permissionStatus !== 'granted') throw({});
      return getDeviceId();
    }).then(deviceId => {
      return dataApiPost('device-ids', { deviceId });
    }).then(response => {
      console.log('response', response);
    }).catch(error => {
      console.log('error', error);
    });
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
        notification.data.title || 'New Message',
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
