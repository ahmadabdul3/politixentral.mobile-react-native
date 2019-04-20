import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from 'px/router';
import { Provider } from 'react-redux';
import reducer from 'px/redux';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { requestPermissionForPushNotifications } from 'px/services/push_notification_permissions';

requestPermissionForPushNotifications();

const store = createStore(
  reducer, // new root reducer with router state
  {}, // initial state
  compose(
    applyMiddleware(thunk),
  ),
);

export default class App extends React.Component {
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
