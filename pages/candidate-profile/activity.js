import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import EventCard from 'px/components/event-card';

export default class Activity extends PureComponent {
  get feed() {
    return getData().map((item, key) => {
      const { title, description } = item;
      return <EventCard key={key} title={title} description={description} />;
    });
  }
  render() {
    return (
      <ScrollView>
        { this.feed }
      </ScrollView>
    );
  }
}

function getData() {
  return [
    {
      title: 'consectetur adipiscing elit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
      sed do eiusmod tempor incididunt ut'
    },
    {
      title: 'tempor incididunt',
      description: 'dolor sit amet, consectetur adipiscing elit,\
      sed do eiusmod tempor'
    },
    {
      title: 'sit amet',
      description: 'ipsum dolor sit amet, consectetur adipiscing elit,\
      sed do eiusmod tempor incididunt ut'
    },
    {
      title: 'sed do',
      description: 'consectetur adipiscing elit ipsum dolor sit amet'
    },
    {
      title: 'consectetur elit',
      description: 'sit amet, consectetur adipiscing elit,\
      sed do eiusmod incididunt ut'
    },
    {
      title: 'eiusmod tempor',
      description: 'elit, sed do eiusmod tempor incididunt ut sit amet, consectetur adipiscing'
    },
  ];
}
