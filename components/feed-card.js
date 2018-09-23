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

    return <ScaledImage uri={media} maxHeight={140} maxWidth={150} />;
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
      <View style={style}>
        <View style={styles.feedCardText}>
          { this.socialMediaSourceIcon }
          <Text style={styles.title}>{ title }</Text>
          <Text style={styles.date}>{ date }</Text>
        </View>
        <View style={styles.feedCardMediaSection}>
          <View style={styles.feedCardMediaContainer}>
            { this.media }
          </View>
        </View>
      </View>
    );
  }
}

// <Text style={styles.description}>{ description }...</Text>

// <View style={styles.learnMoreSection}>
//   <View style={styles.learnMoreButton}>
//     <Text style={styles.learnMoreText}>
//       {'continue reading'.toUpperCase()}
//     </Text>
//   </View>
// </View>

const iconSize = 12;

class SocialIcon extends PureComponent {
  render() {
    const { icon, label } = this.props;

    return (
      <View style={styles.socialMediaSourceIcon}>
        { icon }
        <Text style={styles.socialMediaSourceIconLabel}>
          {label.toUpperCase()}
        </Text>
      </View>
    );
  }
}

class TwitterIcon extends PureComponent {
  render() {
    return (
      <SocialIcon
        label='twitter'
        icon={
          <FontAwesome
            name='twitter'
            size={iconSize}
            color={colors.textColorLighter}
          />
        }
      />
    );
  }
}

class FacebookIcon extends PureComponent {
  render() {
    return (
      <SocialIcon
        label='facebook'
        icon={
          <FontAwesome
            name='facebook-square'
            size={iconSize}
            color={colors.textColorLighter}
          />
        }
      />
    );
  }
}

class LinkedinIcon extends PureComponent {
  render() {
    return (
      <SocialIcon
        label='linkedin'
        icon={
          <FontAwesome
            name='linkedin-square'
            size={iconSize}
            color={colors.textColorLighter}
          />
        }
      />
    );
  }
}

class InstagramIcon extends PureComponent {
  render() {
    return (
      <SocialIcon
        label='instagram'
        icon={
          <FontAwesome
            name='instagram'
            size={iconSize}
            color={colors.textColorLighter}
          />
        }
      />
    );
  }
}
