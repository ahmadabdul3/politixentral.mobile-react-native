import { StyleSheet } from 'react-native';
import colors from 'px/styles/colors';
import { pageTitle, pageSubtitle, sectionTitle } from 'px/styles/typography';
import { section } from 'px/styles/sectioning';
import {
  screen,
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';


const styles = {
  candidateSummaryBox: {
    marginRight: standardSpacingSize * 0.5,
    marginLeft: standardSpacingSize * 0.5,
    marginTop: 20,
    marginBottom: 10,
  },
  candidateSummary: {
    backgroundColor: 'white',
    borderRadius: 5,
  },

  candidateSummaryTitle: {
    fontSize: 13,
    color: colors.brandPurpleLighter,
    fontWeight: 'bold',
    marginLeft: 5,
    marginBottom: 2,
  },

  candidateSummaryBody: {
    ...horizontalSpacing,
    paddingTop: standardSpacingSize,
    // flexDirection: 'row',
    alignItems: 'center',
  },

  viewFullProfile: {
    ...horizontalSpacing,
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: colors.backgroundGrayLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },

  viewFullProfileText: {
    fontSize: 10,
    color: colors.accent,
    fontWeight: 'bold',
    marginRight: 10,
  },

  currentOfficialImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.backgroundGrayDark,
  },

  currentOfficialName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textColor,
  },

  currentOfficialLabel: {
    marginTop: 2,
    fontSize: 9,
    color: colors.textColor,
  },
};

export default styles;
