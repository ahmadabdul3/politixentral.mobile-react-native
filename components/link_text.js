import React, { PureComponent } from 'react';
import colors from 'px/styles/colors';
import {
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';

export default class LinkText extends PureComponent {
  openLink = () => {
    const { link } = this.props;
    Linking.openURL(link);
  };

  render() {
    const { text, styles } = this.props;
    return (
      <TouchableOpacity onPress={this.openLink}>
        <Text style={[{
          color: colors.secondary,
        }, styles]}>
          { text }
        </Text>
      </TouchableOpacity>
    )
  }
}
