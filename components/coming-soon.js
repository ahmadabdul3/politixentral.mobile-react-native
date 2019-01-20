import React, { PureComponent } from 'react';
import { View } from 'react-native';
import ScaledImage from 'px/components/scaled-image';

export default class ComingSoon extends PureComponent {
  render() {
    const uri = 'https://www.healthepro.com/wp-content/uploads/2018/06/Coming-Soon-2-copy-3.png';
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
