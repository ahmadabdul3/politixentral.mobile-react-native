import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import rawStyles from 'px/styles/components/shadow-view';
import colors from 'px/styles/colors';
const styles = StyleSheet.create(rawStyles);

export default class ShadowView extends PureComponent {
  render() {
    const { style, children } = this.props;

    return (
      <View
        style={[styles.shadowView, style]}
        shadowColor={colors.backgroundGrayShadow}
        shadowOpacity={0.4}
        shadowOffset={{ width: 0, height: 4 }}
        shadowRadius={5}
      >
        { children }
      </View>
    );
  }
}
