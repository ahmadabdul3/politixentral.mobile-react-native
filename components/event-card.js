import React, { PureComponent } from 'react';
import cardStyles from 'px/styles/components/card';
import eventCardStyles from 'px/styles/components/event-card';
import { Text } from 'react-native';
import ShadowView from 'px/components/shadow-view';

export default class EventCard extends PureComponent {
  render() {
    const {
      title,
      description,
      lastInSequence,
    } = this.props;

    const style = !!lastInSequence ? cardStyles.cardLast : cardStyles.card;

    return (
      <ShadowView style={style}>
        <Text style={eventCardStyles.title}>{ title }</Text>
        <Text style={eventCardStyles.description}>{ description }</Text>
      </ShadowView>
    );
  }
}
