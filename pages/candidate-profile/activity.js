import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import EventCard from 'px/components/event-card';

export default class Activity extends PureComponent {
  render() {
    return (
      <ScrollView>
        {
          getData().map((item, key) => {
            const { item, description } = item;
            return <EventCard key={key} title={title} description={description} />;
          }
        }
      </ScrollView>
    );
  }
}

function getData() {
  return [
    {
      title: 'One',
      description: 'One'
    },
    {
      title: 'Two',
      description: 'two'
    },
    {
      title: '',
      description: ''
    },
    {
      title: '',
      description: ''
    },
    {
      title: '',
      description: ''
    },
    {
      title: '',
      description: ''
    },
  ];
}
