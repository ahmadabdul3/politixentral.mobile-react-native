import React, { PureComponent } from 'react';
import demographicStyles from 'px/styles/components/demographic';
import { View, Text } from 'react-native';

export default class Demographic extends PureComponent {
  render() {
    const { label, value, white } = this.props;
    const labelStyle = white ?
      demographicStyles.demographicLabelWhite : demographicStyles.demographicLabel;
    const valueStyle = white ?
      demographicStyles.demographicValueWhite : demographicStyles.demographicValue;

    return (
      <View style={demographicStyles.demographic}>
        <Text style={labelStyle}>
          { label }
        </Text>
        <Text style={valueStyle}>
          { value }
        </Text>
      </View>
    );
  }
}
