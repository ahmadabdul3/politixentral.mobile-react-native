import { StyleSheet } from 'react-native';
import colors from 'px/styles/colors';
import { cardStyles } from 'px/styles/components/card';
import {
  screen,
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';

const borderRadius = 10;

const feedCardShared = {
  ...cardStyles,
  paddingRight: standardSpacingSize * 0.5,
  paddingLeft: standardSpacingSize * 0.5,
  paddingTop: 20,
  paddingBottom: 20,
  marginTop: 0,
  marginBottom: 0,
  marginRight: 0,
  marginLeft: 0,
  backgroundColor: 'transparent',
  position: 'relative',
  flexDirection: 'row',
  borderBottomColor: colors.backgroundGrayDark,
  borderBottomWidth: 1,
};

const styles = StyleSheet.create({
  feedCard: {
    ...feedCardShared,
  },
  feedCardFirst: {
    ...feedCardShared,
    marginTop: 0,
  },
  feedCardLast: {
    ...feedCardShared,
    marginBottom: 20,
    borderBottomWidth: 0,
  },
  feedCardMediaSection: {
    marginLeft: 15,
    flexGrow: 0,
    flexShrink: 0,
  },
  feedCardMediaContainer: {
    overflow: 'hidden',
    borderRadius: 2,
    // backgroundColor: 'red',
  },
  feedCardText: {
    paddingRight: 10,
    paddingBottom: 10,
    flexGrow: 1,
    flexShrink: 1,
  },
  socialMediaSourceIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 1,
  },
  socialMediaSourceIconBox: {
    backgroundColor: 'white',
    borderRadius: 18,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialMediaSourceIconLabel: {
    fontWeight: 'bold',
    fontSize: 10,
    color: colors.textColorLight,
    marginLeft: 8,
  },
  date: {
    marginTop: 20,
    color: colors.brandPurpleLight,
    fontSize: 11,
    fontWeight: 'bold',
  },
  title: {
    marginTop: 7,
    fontWeight: 'bold',
    color: colors.textColor,
    fontSize: 16,
    lineHeight: 22,
  },
  description: {
    marginTop: 15,
    lineHeight: 21,
    color: colors.textColorLight,
    maxHeight: 50,
  },
  learnMoreSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  learnMoreButton: {
    borderColor: colors.accent,
    borderWidth: 1,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  learnMoreText: {
    color: colors.accent,
    fontWeight: 'bold',
    fontSize: 9,
  },
});

export default styles;
