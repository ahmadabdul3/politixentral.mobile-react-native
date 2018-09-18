import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import FeedCard from 'px/components/feed-card';
import socialMediaSources from 'px/constants/social-media-sources';

export default class Activity extends PureComponent {
  get feed() {
    const data = getData();
    return data.map((item, index) => {
      const { title, description, socialMediaSource } = item;
      const lastInSequence = index === (data.length - 1);
      console.log('last in sequence: ', lastInSequence);
      return (
        <FeedCard
          key={index}
          title={title}
          description={description}
          socialMediaSource={socialMediaSource}
          lastInSequence={lastInSequence}
        />
      );
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
      socialMediaSource: socialMediaSources.twitter,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
      sed do eiusmod tempor incididunt ut'
    },
    {
      title: 'tempor incididunt',
      socialMediaSource: socialMediaSources.facebook,
      description: 'dolor sit amet, consectetur adipiscing elit,\
      sed do eiusmod tempor'
    },
    {
      title: 'sit amet',
      socialMediaSource: socialMediaSources.linkedin,
      description: 'ipsum dolor sit amet, consectetur adipiscing elit,\
      sed do eiusmod tempor incididunt ut'
    },
    {
      title: 'sed do',
      socialMediaSource: socialMediaSources.twitter,
      description: 'consectetur adipiscing elit ipsum dolor sit amet'
    },
    {
      title: 'consectetur elit',
      socialMediaSource: socialMediaSources.twitter,
      description: 'sit amet, consectetur adipiscing elit,\
      sed do eiusmod incididunt ut'
    },
    {
      title: 'eiusmod tempor',
      socialMediaSource: socialMediaSources.instagram,
      description: 'elit, sed do eiusmod tempor incididunt ut sit amet, consectetur adipiscing'
    },
  ];
}
