import React, { PureComponent } from 'react';
import {
  View, Text
} from 'react-native';
import initSumStyles from 'px/styles/components/initiative-summary';
import ShadowView from 'px/components/shadow-view';


export default class InitiativeSummary extends PureComponent {
  render() {
    const { title } = this.props;

    return (
      <ShadowView style={initSumStyles.initiativeSummary}>
        <Text>
          { title }
        </Text>
      </ShadowView>
    );
  }
}
