import React, { PureComponent } from 'react';
import cardStyles from 'px/styles/components/card';
import styles from 'px/styles/components/feed-card';
import colors from 'px/styles/colors';
import ShadowView from 'px/components/shadow-view';
import ScaledImage from 'px/components/scaled-image';
import socialMediaSources from 'px/constants/social-media-sources';
import { Text, View, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const width = Dimensions.get('window').width / 3.5;
const height = width - 10;

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
    if (!!media === false) return null;

    return <ScaledImage uri={media} maxHeight={height} maxWidth={width} />;
  }

  get style() {
    const { lastInSequence, firstInSequence } = this.props;

    if (!!firstInSequence) return styles.feedCardFirst;
    if (!!lastInSequence) return styles.feedCardLast;
    return styles.feedCard;
  }

  render() {
    const {
      title,
      description,
      date,
    } = this.props;

    return (
      <View style={this.style}>
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
        <View style={styles.socialMediaSourceIconBox}>
          { icon }
        </View>
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
            color={colors.twitter}
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
            color={colors.facebook}
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
            color={colors.linkedin}
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
