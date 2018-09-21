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
  position: 'relative',
  paddingRight: 0,
  paddingLeft: 0,
  paddingTop: 0,
  paddingBottom: 0,
  marginTop: 30,
  marginRight: 10,
  marginLeft: 10,
  borderRadius,
  // overflow: 'hidden',
};

const styles = StyleSheet.create({
  feedCard: {
    ...feedCardShared,
  },
  feedCardLast: {
    ...feedCardShared,
    marginBottom: 20,
  },
  feedCardMediaContainer: {
    maxHeight: 250,
    overflow: 'hidden',
    borderBottomLeftRadius: 0,
  	borderBottomRightRadius: 0,
  	borderTopLeftRadius: borderRadius,
  	borderTopRightRadius: borderRadius,
    justifyContent: 'flex-start',
  },
  feedCardText: {
    ...horizontalSpacing,
    ...verticalSpacing,
    position: 'relative',
  },
  socialMediaSourceIcon: {
    position: 'absolute',
    top: 4,
    right: 6,
  },
  date: {
    color: colors.textColorLightest,
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    marginTop: 3,
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 18,
    lineHeight: 24,
  },
  description: {
    marginTop: 18,
    lineHeight: 21,
    color: colors.textColorLight,
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
