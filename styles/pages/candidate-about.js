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
  marginRight: standardSpacingSize,
  marginLeft: standardSpacingSize,
  marginTop: 15,
  paddingTop: 25,
  borderTopWidth: 1,
  borderTopColor: colors.lightestGray,
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
  },
  sectionTitle: {
    ...sectionTitle,
  },
  section: {
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
    borderTopWidth: 0,
    marginTop: 0,
    paddingTop: 0,
  },
  educationSummaryLast: {
    ...educationSummary,
  },
  schoolAndLocation: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  educationSummaryRight: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  educationSummaryDate: {
    color: colors.brandPurpleLighter,
    fontWeight: 'bold',
    fontSize: 10,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  educationSummaryLocation: {
    fontSize: 10,
    color: colors.textColorLight,
    fontWeight: 'bold',
  },
  school: {
    fontWeight: 'bold',
    color: colors.textColorLightest,
    fontSize: 12,
  },
  educationFieldDegree: {
    marginTop: 3,
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
  },
});

export default styles;