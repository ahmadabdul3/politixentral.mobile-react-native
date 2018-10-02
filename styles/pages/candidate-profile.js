import { StyleSheet } from 'react-native';
import colors from 'px/styles/colors';
import {
  screen,
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';

const styles = StyleSheet.create({
  screen,
  header: {
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 80,
    paddingBottom: 30,
    backgroundColor: colors.logoGreen,
    minHeight: 50,
    alignItems: 'center',
  },
  headerBio: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  repImage: {
    flexGrow: 0,
    flexShrink: 0,
    width: 70,
    height: 70,
    borderWidth: 5,
    borderColor: colors.blue,
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
    marginTop: 24,
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
});

export default styles;
