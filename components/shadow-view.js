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
      >
        { children }
      </View>
    );
  }
}
// shadowColor='black'
// shadowOpacity={0.12}
// shadowOffset={{ width: 0, height: 4 }}
// shadowRadius={7}
