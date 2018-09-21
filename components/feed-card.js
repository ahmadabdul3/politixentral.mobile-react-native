import React, { PureComponent } from 'react';
import cardStyles from 'px/styles/components/card';
import styles from 'px/styles/components/feed-card';
import colors from 'px/styles/colors';
import ShadowView from 'px/components/shadow-view';
import ScaledImage from 'px/components/scaled-image';
import socialMediaSources from 'px/constants/social-media-sources';
import { Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class FeedCard extends PureComponent {
  get socialMediaSourceIcon() {
    const { socialMediaSource } = this.props;
    switch (socialMediaSource) {
      case socialMediaSources.twitter: return <TwitterIcon />;
      case socialMediaSources.facebook: return <FacebookIcon />;
      case socialMediaSources.linkedin: return <LinkedinIcon />;
      case socialMediaSources.instagram: return <InstagramIcon />;
      default: return <TwitterIcon />;
    }
  }

  get media() {
    const { media } = this.props;
    if (!media) return;

    return <ScaledImage uri={media} maxHeight={200} />;
  }

  render() {
    const {
      title,
      description,
      lastInSequence,
      date,
    } = this.props;

    const style = lastInSequence ? styles.feedCardLast : styles.feedCard;

    return (
      <ShadowView style={style}>
        <View style={styles.feedCardMediaContainer}>
          { this.media }
        </View>
        <View style={styles.feedCardText}>
          <View style={styles.socialMediaSourceIcon}>
            { this.socialMediaSourceIcon }
          </View>
          <Text style={styles.date}>{ date }</Text>
          <Text style={styles.title}>{ title }</Text>
          <Text style={styles.description}>{ description }...</Text>
          <View style={styles.learnMoreSection}>
            <View style={styles.learnMoreButton}>
              <Text style={styles.learnMoreText}>
                {'continue reading'.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </ShadowView>
    );
  }
}

const iconSize = 20;

class TwitterIcon extends PureComponent {
  render() {
    return (
      <FontAwesome
        name='twitter'
        size={iconSize}
        color={colors.textColorLighter}
      />
    );
  }
}

class FacebookIcon extends PureComponent {
  render() {
    return (
      <FontAwesome
        name='facebook-square'
        size={iconSize}
        color={colors.textColorLighter}
      />
    );
  }
}

class LinkedinIcon extends PureComponent {
  render() {
    return (
      <FontAwesome
        name='linkedin-square'
        size={iconSize}
        color={colors.textColorLighter}
      />
    );
  }
}

class InstagramIcon extends PureComponent {
  render() {
    return (
      <FontAwesome
        name='instagram'
        size={iconSize}
        color={colors.textColorLighter}
      />
    );
  }
}
