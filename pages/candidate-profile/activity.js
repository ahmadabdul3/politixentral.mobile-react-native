import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import FeedCard from 'px/components/feed-card';
import socialMediaSources from 'px/constants/social-media-sources';
import { sectionTitle } from 'px/styles/pages/candidate-initiatives';

export default class Activity extends PureComponent {
  get feed() {
    const data = getData();
    return data.map((item, index) => {
      const { date, title, media, description, socialMediaSource } = item;
      const lastInSequence = index === (data.length - 1);
      return (
        <FeedCard
          key={index}
          date={date}
          title={title}
          media={media}
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
        <Text style={{ ...sectionTitle, marginTop: 30 }}>
          {`news and activity`.toUpperCase()}
        </Text>
        { this.feed }
      </ScrollView>
    );
  }
}

function getData() {
  return [
    {
      date: 'Saturday, Jul 14, 2015 - 11:22am',
      title: 'David Reyes Gets Nod In The Hill',
      socialMediaSource: socialMediaSources.twitter,
      media: 'https://trello-attachments.s3.amazonaws.com/59b7df995a24fcd6afbda9ef/5ba269d6cdb46d6256210fe9/10fcddad1caac00193d9acba22e687a4/signing_550_366_88_sha-100.jpg',
      description: 'The Hill ward’s Democratic Committee Monday evening endorsed David Reyes to serve as alder, putting him on the Democratic line ballot for the general election ballot'
    },
    {
      date: 'Sunday, June 25, 2017 - 5:30pm',
      title: '3 New Haven alders to seek re-election - 1 newcomer announced in the Hill',
      socialMediaSource: socialMediaSources.facebook,
      media: 'https://trello-attachments.s3.amazonaws.com/59b7df995a24fcd6afbda9ef/5ba269d6cdb46d6256210fe9/872ee7e6309a468a73d8ad5299f1ab55/920x920.jpg',
      description: 'NEW HAVEN >> Three incumbents and one new candidate for aldermanic seats in the Hill officially kicked off their campaigns at Trowbridge Square Sunday'
    },
    {
      date: 'Wednesday, November 23, 2016 - 6:09pm',
      title: 'New Haven Hill South Management Team buys more than $2,000 in clothing for children',
      socialMediaSource: socialMediaSources.linkedin,
      media: 'https://trello-attachments.s3.amazonaws.com/59b7df995a24fcd6afbda9ef/5ba269d6cdb46d6256210fe9/f8e0501296cc10b79077cb8819035cef/920x920.jpg',
      description: 'ORANGE >> New Haven Alder Dave Reyes said he became an elected official for moments like this'
    },
    // {
    //   date: 'Jul 14, 2015 11:22 am',
    //   title: 'sed do',
    //   socialMediaSource: socialMediaSources.twitter,
    //   media: '',
    //   description: 'consectetur adipiscing elit ipsum dolor sit amet'
    // },
    // {
    //   date: 'Jul 14, 2015 11:22 am',
    //   title: 'consectetur elit',
    //   socialMediaSource: socialMediaSources.twitter,
    //   media: '',
    //   description: 'sit amet, consectetur adipiscing elit,\
    //   sed do eiusmod incididunt ut'
    // },
  ];
}
