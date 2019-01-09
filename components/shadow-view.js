import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import rawStyles from 'px/styles/components/shadow-view';
const styles = StyleSheet.create(rawStyles);

export default class ShadowView extends PureComponent {
  render() {
    const { style, children } = this.props;

    return (
      <View
        style={[styles.shadowView, style]}
        shadowColor='black'
        shadowOpacity={0.1}
        shadowOffset={{ width: 0, height: 2 }}
        shadowRadius={3}
      >
        { children }
      </View>
    );
  }
}
