import React, { PureComponent } from 'react';
import colors from 'px/styles/colors';
import { TextInput } from 'react-native';

export class BaseInput extends PureComponent {
  ref;

  onFocus = () => {
    this.ref.focus();
  }

  render() {
    const {
      value, onChange, placeholder,
      customStyles
    } = this.props;
    return (
      <TextInput
        value={value}
        onFocus={this.onFocus}
        onChangeText={onChange}
        placeholder={placeholder}
        ref={r => this.ref = r}
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

export class BaseTextarea extends PureComponent {
  ref;

  onFocus = () => {
    this.ref.focus();
  }

  render() {
    const {
      value, onChange, placeholder,
      customStyles,
    } = this.props;

    return (
      <TextInput
        value={value}
        multiline={true}
        numberOfLines={5}
        onChangeText={onChange}
        placeholder={placeholder}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        ref={r => this.ref = r}
        style={[{
          height: 160,
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
