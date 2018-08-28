import React, { PureComponent } from 'react';
import { View } from 'react-native';

export default class ShadowView extends PureComponent {
  render() {
    const { style, children } = this.props;

    return (
      <View
        shadowColor='black'
        shadowOpacity={0.2}
        shadowOffset={{ width: 0, height: 1 }}
        style={style}
      >
        { children }
      </View>
    );
  }
}
