import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from 'px/router';

export default class App extends React.Component {
  render() {
    return (
      <Router />
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
