import React, { PureComponent } from 'react';
import colors from 'px/styles/colors';
import {
  Text,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';

export default class LinkText extends PureComponent {
  openLink = () => {
    const { link } = this.props;
    Linking.openURL(link);
  };

  render() {
    const { text, styles, icon } = this.props;
    return (
      <TouchableOpacity onPress={this.openLink}>
        {
          !!icon ? (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style={[{
                color: colors.secondary,
              }, styles]}>
                { text }
              </Text>
              { icon }
            </View>
          ) : (
            <Text style={[{
              color: colors.secondary,
            }, styles]}>
              { text }
            </Text>
          )
        }
      </TouchableOpacity>
    )
  }
}
