import React, { PureComponent } from 'react';
import colors from 'px/styles/colors';
import { TextInput } from 'react-native';

export class BaseInput extends PureComponent {
  render() {
    const {
      value, onChange, placeholder,
      customStyles
    } = this.props;
    return (
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={[{
          height: 40,
          borderColor: colors.backgroundGrayDarker,
          borderRadius: 3,
          backgroundColor: 'white',
          borderWidth: 1,
          width: '100%',
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 5,
        }, customStyles]}
      />
    );
  }
}
