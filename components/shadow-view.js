import React, { PureComponent } from 'react';
import { View } from 'react-native';

export default class ShadowView extends PureComponent {
  render() {
    const { style, children } = this.props;

    return (
      <View
        shadowColor='black'
        shadowOpacity={0.12}
        shadowOffset={{ width: 0, height: 4 }}
        shadowRadius={7}
        style={style}
      >
        { children }
      </View>
    );
  }
}
