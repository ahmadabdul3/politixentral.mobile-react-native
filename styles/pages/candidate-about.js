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
  marginTop: 25,
  paddingTop: 22,
  borderTopWidth: 1,
  borderTopColor: colors.backgroundGrayDark,
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.backgroundPurple,
    backgroundColor: colors.backgroundGray,
  },
  sectionTitle: {
    ...sectionTitle,
  },
  section: {
    ...section,
  },
  skill: {
    ...horizontalSpacing,
    // color: 'white',
    // fontSize: 16,
    marginTop: 5,
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
    color: colors.brandPurpleLight,
    fontWeight: 'bold',
    fontSize: 10,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  educationSummaryLocation: {
    fontSize: 10,
    color: colors.textColorLighter,
    fontWeight: 'bold',
  },
  school: {
    fontWeight: 'bold',
    color: colors.textColorLighter,
    fontSize: 12,
  },
  educationFieldDegree: {
    marginTop: 3,
    // color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
  },
  experienceSummary: {
    // color: 'white',
    marginTop: 10,
    marginBottom: 5,
  }
});

export default styles;
