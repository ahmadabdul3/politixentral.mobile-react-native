import { StyleSheet } from 'react-native';
import colors from 'px/styles/colors';
import {
  screen,
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';
import { pageTitle, pageSubtitle } from 'px/styles/typography';

const styles = StyleSheet.create({
  screen: {
    ...screen,
    backgroundColor: colors.backgroundPurple,
  },
  tabHeader: {
    ...verticalSpacing,
    backgroundColor: 'white',
    flexDirection: 'column-reverse',
  },
  tabHeaderText: {
    ...pageTitle,
    paddingTop: 3,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 0,
    marginLeft: 50,
    color: colors.primary,
    fontWeight: '900',
  },
  header: {
    paddingRight: standardSpacingSize,
    paddingTop: 30,
    // paddingBottom: 30,
    backgroundColor: colors.logoGreen,
    height: '100%',
    alignItems: 'center',
    // flexDirection: 'column-reverse',
  },
  headerBio: {
    paddingLeft: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  repImage: {
    flexGrow: 0,
    flexShrink: 0,
    width: 70,
    height: 70,
    borderWidth: 5,
    borderColor: colors.primaryDark,
    borderRadius: 80,
    overflow: 'hidden',
  },
  headerBioText: {
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: 20,
  },
  repName: {
    // marginTop: 5,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  repDescription: {
    color: colors.brandPurpleLighter,
    marginTop: 5,
    fontSize: 11,
    fontWeight: 'bold',
  },
  headerDemographics: {
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
  },
  // headerDemographicsSeperator: {
  //   width: '100%',
  //   height: 0.5,
  //   marginBottom: 15,
  //   marginTop: 7,
  //   backgroundColor: 'white',
  // },
  headerDemographicsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  missionStatement: {
    paddingLeft: standardSpacingSize,
    marginTop: 25,
    paddingBottom: 30,
  },
  statementBody: {
    fontSize: 13,
    lineHeight: 18,
    color: 'white',
  },
  repAbout: {
    // marginTop: -50,
  },
  bodyTitle: {
    ...horizontalSpacing,
    ...verticalSpacing,
    paddingBottom: 10,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  tabSection: {

  },
  sectionTitle: {
    color: colors.logoGreen,
    fontWeight: 'bold',
    fontSize: 17,
  },
  aboutSection: {
    ...horizontalSpacing,
    ...verticalSpacing,
  },
  aboutSectionChildren: {
    ...horizontalSpacing,
  },
  educationInfo: {
    marginTop: 10,
  },
  educationFieldDegree: {
  },
  educationField: {
    fontWeight: 'bold',
  },
  education: {

  },

  headerStatementToggle: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: colors.brandPurpleLight,
    overflow: 'hidden',
  },
  headerStatementToggleTouchable: {
    width: 35,
    height: 35,
    borderRadius: 35,
  }
});

export default styles;
