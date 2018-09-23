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

const educationSummary = {
  ...horizontalSpacing,
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginTop: 30,
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
  },
  sectionTitle: {
    ...sectionTitle,
  },
  candidateFeed: {
    ...section,
  },
  newsAndActivityTitle: {
    ...sectionTitle,
  },
  educationSummary: {
    ...educationSummary,
  },
  educationSummaryFirst: {
    ...educationSummary,
    marginTop: 0,
  },
  educationSummaryLast: {
    ...educationSummary,
  },
  educationSummaryLeft: {
    flexGrow: 1,
    flexShrink: 1,
  },
  educationSummaryRight: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  educationSummaryLocation: {
    fontSize: 12,
  },
  school: {
    fontWeight: 'bold',
    color: colors.textColorLightest,
    fontSize: 12,
  },
  educationFieldDegree: {
    marginTop: 5,
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
