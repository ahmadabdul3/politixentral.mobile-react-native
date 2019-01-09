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
    marginTop: 1,
    backgroundColor: 'white',
    borderRadius: 3,
  },
  candidateSummary: {
    backgroundColor: 'white',
    borderRadius: 5,
  },

  candidateSummaryBody: {
    ...horizontalSpacing,
    paddingTop: standardSpacingSize * 0.5,
    paddingBottom: standardSpacingSize * 0.5,
    flexDirection: 'row',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  candidateSummaryBio: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },

  candidateTitle: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: 'bold',
    color: colors.textColorLighter,
  },

  viewFullProfile: {
    // marginTop: 15,
    // paddingTop: 5,
    // paddingBottom: 5,
    // backgroundColor: colors.backgroundGrayLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 0,
    // borderBottomRightRadius: 5,
    // borderBottomLeftRadius: 5,
  },

  viewFullProfileText: {
    fontSize: 10,
    color: colors.accent,
    fontWeight: 'bold',
    marginRight: 10,
  },

  currentOfficialImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 2,
    marginRight: 15,
    borderColor: colors.backgroundGrayDark,
  },

  currentOfficialNameWrapper: {
    flexWrap: 'wrap',
  },

  currentOfficialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textColor,
    flexWrap: 'wrap',
  },

  currentOfficialLabel: {
    marginTop: 2,
    fontSize: 9,
    color: colors.textColor,
  },
};

export default styles;
