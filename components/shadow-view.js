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
        shadowOpacity={0.2}
        shadowOffset={{ width: 0, height: 7 }}
        shadowRadius={12}
      >
        { children }
      </View>
    );
  }
}
