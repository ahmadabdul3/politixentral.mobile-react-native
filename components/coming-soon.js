import React, { PureComponent } from 'react';
import { View } from 'react-native';
import ScaledImage from 'px/components/scaled-image';

export default class ComingSoon extends PureComponent {
  render() {
    const uri = 'https://res.cloudinary.com/politixentral/image/upload/c_scale,q_100,w_316/v1548081017/Coming-Soon.png';
    return (
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ScaledImage uri={uri} maxWidth={250} />
      </View>
    );
  }
}
