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

const styles = StyleSheet.create({
  raceOverviewBox: {
    marginRight: standardSpacingSize * 0.5,
    marginLeft: standardSpacingSize * 0.5,
    marginTop: 20,
    marginBottom: 10,
  },

  raceOverview: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '100%',
  },

  raceOverviewDetails: {
    ...horizontalSpacing,
    paddingTop: standardSpacingSize,
  },
  detail: {
    marginTop: 2,
    fontSize: 13,
    color: colors.textColor,
    // color: colors.brandPurpleLightest,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 12,
  },

  raceOverviewCandidates: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    ...horizontalSpacing,
    paddingBottom: 20,
    // borderBottomColor: colors.backgroundGrayDark,
    // borderBottomWidth: 1,
  },
  raceOverviewCandidate: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.backgroundGrayDark,
    backgroundColor: 'white',
  },

  raceOverviewCurrentOfficial: {
    ...horizontalSpacing,
    paddingTop: standardSpacingSize,
  },
  currentOfficialHeader: {
    fontWeight: 'bold',
    color: colors.textColor,
    fontSize: 17,
  },

  currentOfficialSummary: {
    ...horizontalSpacing,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 15,
    borderBottomColor: colors.backgroundGrayDark,
    borderBottomWidth: 1,
  },

  currentOfficialImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.backgroundGrayDark,
  },

  currentOfficialDetails: {
    marginLeft: 15,
  },

  currentOfficialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },

  currentOfficialLabel: {
    marginTop: 2,
    fontSize: 11,
    color: colors.textColor,
  },

  seeDetailsLink: {
    ...horizontalSpacing,
    // marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.backgroundGrayLight,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  seeDetailsLinkText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.accent,
    marginRight: 10,
  }

});

export default styles;
