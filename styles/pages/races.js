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
  section: {
    ...section,
    marginBottom: 60,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionHeaderLink: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: standardSpacingSize,
  },
  sectionTitle: {
    ...sectionTitle,
    paddingTop: 0,
    paddingBottom: 0,
  },
  sectionTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  titleSubtitleSeparator: {
    marginRight: 15,
    width: 1,
    height: 20,
    backgroundColor: colors.textColorLighter,
  },
  sectionSubtitle: {
    color: colors.textColorLighter,
    fontWeight: '300',
    fontSize: 20,
  },
  sectionContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // marginRight: standardSpacingSize,
    // marginLeft: standardSpacingSize,
  },
  candidateCard: {
    padding: 15,
    // flexGrow: 1,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.backgroundGrayDarker,
  },
  candidateCardImageBox: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: colors.textColorLighter,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  candidateCardImageBoxBlue: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.blue,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  candidateCardImageBoxRed: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.red,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  candidateCardImageBoxYellow: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.yellow,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  candidateName: {
    marginTop: 15,
    color: colors.textColor,
    fontWeight: 'bold',
    fontSize: 15,
  },
  candidateLabel: {
    marginTop: 3,
    fontWeight: 'bold',
    fontSize: 10,
    color: colors.textColorLighter,
  },

  raceOverview: {
    backgroundColor: 'white',
    marginRight: standardSpacingSize * 0.5,
    marginLeft: standardSpacingSize * 0.5,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 5,
  },

  // raceOverviewTop: {
  //   backgroundColor: colors.primary,
  //   borderTopRightRadius: 5,
  //   borderTopLeftRadius: 5,
  // },
  raceOverviewHeader: {
    ...horizontalSpacing,
    ...verticalSpacing,
    paddingBottom: 10,
  },
  raceOverviewTitle: {
    ...sectionTitle,
    color: colors.primary,
    // color: 'white',
  },
  raceOverviewTitleSecondary: {
    ...pageSubtitle,
    // color: colors.brandPurpleLightest,
    fontSize: 20,
    fontWeight: '300',
  },

  raceOverviewDetails: {
    ...horizontalSpacing,
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
    borderBottomColor: colors.backgroundGrayDark,
    borderBottomWidth: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
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

  seeDetailsLink: {
    ...horizontalSpacing,
    marginTop: 15,
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
