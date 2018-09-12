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
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: colors.logoGreenDark,
    minHeight: 50,
    alignItems: 'center',
  },
  repImage: {
    flexGrow: 0,
    flexShrink: 0,
    width: 80,
    height: 80,
    borderWidth: 5,
    borderColor: colors.brandPurpleDark,
    borderRadius: 100,
    overflow: 'hidden',
  },
  repName: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  repDescription: {
    color: 'white',
    marginTop: 2,
    fontSize: 12,
  },
  headerDemographics: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  headerDemographicsSeperator: {
    width: 300,
    height: 0.5,
    marginBottom: 15,
    marginTop: 7,
    backgroundColor: 'white',
  },
  headerDemographicsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
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
    color: colors.logoGreenDark,
    fontWeight: 'bold',
    fontSize: 17,
  },
  educationSection: {
    ...horizontalSpacing,
    ...verticalSpacing,
  },
  educationField: {

  },
  education: {

  },
});

export default styles;
