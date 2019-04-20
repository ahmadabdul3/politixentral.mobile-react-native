import React, { PureComponent } from 'react';
import colors from 'px/styles/colors';
import {
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { PrimaryButton, SecondaryButton } from 'px/components/buttons';
import { SectionTitlePrimary, PageSection } from 'px/components/page-text';
import { FontAwesome, Feather } from '@expo/vector-icons';

export default class SocialMediaIcons extends PureComponent {
  render() {
    return (
      <View>
        <SectionTitlePrimary>
          Connect with us!
        </SectionTitlePrimary>
        <View style={{
          flexDirection: 'row',
          marginTop: 5,
        }}>
          {
            getSocialMediaData().map((item, index) => (
              <SocialMediaLink
                key={item.link + index}
                icon={item.icon}
                link={item.link} />
            ))
          }
        </View>
      </View>
    );
  }
}

class SocialMediaLink extends PureComponent {
  openLink = () => {
    const { link } = this.props;
    Linking.openURL(link);
  };

  render() {
    const { icon } = this.props;
    return (
      <TouchableOpacity onPress={this.openLink}
        style={{ marginRight: 10 }}>
        { icon }
      </TouchableOpacity>
    )
  }
}


function getSocialMediaData() {
  const size = 35;
  return [
    {
      icon: <FontAwesome name='instagram' size={size} color={colors.primary} />,
      link: 'https://www.instagram.com/politixentral/',
    },
    {
      icon: <FontAwesome name='linkedin-square' size={size} color={colors.primary} />,
      link: 'https://www.linkedin.com/company/politixentral/',
    },
    {
      icon: <FontAwesome name='facebook-square' size={size} color={colors.primary} />,
      link: 'https://www.facebook.com/Politixentral-253072588910557/',
    },
    {
      icon: <Feather name='mail' size={size} color={colors.primary} />,
      link: 'mailto: politixentral.engineering@gmail.com',
    },
  ];
}
