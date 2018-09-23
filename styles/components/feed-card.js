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
  borderRadius: 0,
  position: 'relative',
  paddingTop: 0,
  paddingBottom: 0,
  marginRight: 0,
  marginLeft: 0,
  marginTop: 20,
  flexDirection: 'row',
  alignItems: 'flex-start',
  overflow: 'hidden',
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
  },
  feedCardMediaSection: {
    marginLeft: 10,
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'flex-start',
  },
  feedCardMediaContainer: {
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: 'red',
  },
  feedCardText: {
    paddingRight: 10,
    flexGrow: 1,
    flexShrink: 1,
  },
  socialMediaSourceIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 1,
  },
  socialMediaSourceIconLabel: {
    fontWeight: 'bold',
    fontSize: 10,
    color: colors.textColorLighter,
    marginLeft: 10,
  },
  date: {
    marginTop: 20,
    color: colors.textColorLightest,
    fontSize: 11,
    fontWeight: 'bold',
  },
  title: {
    marginTop: 7,
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 16,
    lineHeight: 18,
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
