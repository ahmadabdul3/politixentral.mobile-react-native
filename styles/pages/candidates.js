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
  screen: {
    ...screen,
    backgroundColor: colors.backgroundGray,
  },
  pageHeader: {
    backgroundColor: colors.backgroundGrayLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundGrayDark,
  },
  pageTitle: {
    ...pageTitle,
  },
  pageSubtitle: {
    ...pageSubtitle,
    marginBottom: 40,
  },
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
  candidateSummaryHeader: {
    ...horizontalSpacing,
    paddingTop: standardSpacingSize,
  },
  candidateSummaryTitle: {
    ...sectionTitle,
    color: colors.primary,
  },
  candidateSummaryTitleSecondary: {
    ...pageSubtitle,
    fontSize: 20,
    fontWeight: '300',
  },

  candidateSummaryBody: {
    ...horizontalSpacing,
    marginTop: standardSpacingSize,
    flexDirection: 'row',
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

  currentOfficialDetails: {
    marginLeft: 15,
  },

  currentOfficialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textColor,
  },

  currentOfficialLabel: {
    marginTop: 2,
    fontSize: 11,
    color: colors.textColor,
  },
};

export default styles;
