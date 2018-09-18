import { StyleSheet } from 'react-native';
import colors from 'px/styles/colors';
import {
  screen,
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';

const styles = StyleSheet.create({
  feedCard: {
    position: 'relative',
  },
  socialMediaSourceIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontWeight: 'bold',
    color: colors.logoGreen,
  },
  description: {
    marginTop: 10,
    lineHeight: 20,
    color: colors.textColorLight,
  },
});

export default styles;
