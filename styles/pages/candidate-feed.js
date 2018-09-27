import { StyleSheet } from 'react-native';
import colors from 'px/styles/colors';
import { sectionTitle } from 'px/styles/typography';
import { section } from 'px/styles/sectioning';
import {
  screen,
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.backgroundGray,
  },
  candidateFeed: {
    ...section,
  },
  newsAndActivityTitle: {
    ...sectionTitle,
  },
});

export default styles;
