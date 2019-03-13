import React, { PureComponent } from 'react';
import colors from 'px/styles/colors';
import { View, Text, TouchableOpacity, Image } from 'react-native';


export class PrimaryButton extends PureComponent {
  onPress = () => {
    if (this.props.loading) return;
    this.props.onPress();
  }

  render() {
    const {
      text, children, customStyles, loading
    } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={[{
          paddingTop: 10,
          paddingBottom: 10,
          paddingRight: 15,
          paddingLeft: 15,
          backgroundColor: colors.secondary,
          borderRadius: 3,
        }, customStyles ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {
            text ? (
              <Text style={{
                fontSize: 14,
                textAlign: 'center',
                color: 'white',
              }}>
                { text }
              </Text>
            ) : children
          }
          {
            loading ? (
              <Image
                style={{ width: 15, height: 15, marginLeft: 5 }}
                source={require('../assets/Rolling-1s-200px.gif')}
              />
            ) : null
          }
        </View>
      </TouchableOpacity>
    );
  }
}

export class SecondaryButton extends PureComponent {
  onPress = () => {
    if (this.props.loading) return;
    this.props.onPress();
  }

  render() {
    const {
      text, children, customStyles, loading
    } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={[{
          paddingTop: 10,
          paddingBottom: 10,
          paddingRight: 15,
          paddingLeft: 15,
          backgroundColor: colors.textColorLightest,
          borderRadius: 3,
        }, customStyles ]}
      >
        {
          text ? (
            <Text style={{
              fontSize: 14,
              textAlign: 'center',
            }}>
              { text }
            </Text>
          ) : children
        }
      </TouchableOpacity>
    );
  }
}
