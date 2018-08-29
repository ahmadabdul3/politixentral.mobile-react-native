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
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: colors.logoGreenDark,
    minHeight: 50,
    alignItems: 'center',
  },
  repImage: {
    flexGrow: 0,
    flexShrink: 0,
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: colors.logoGreenDarker,
    borderRadius: 100,
    overflow: 'hidden',
  },
  repName: {
    marginTop: 10,
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
  },
  repDescription: {
    color: 'white',
    marginTop: 3,
    fontSize: 12,
  },
  headerDemographics: {
    flexDirection: 'row',
    width: 200,
    marginTop: 5,
    justifyContent: 'space-around',
    marginRight: -55,
  },
  repAbout: {
    marginTop: -50,
  },
  bodyTitle: {
    ...horizontalSpacing,
    ...verticalSpacing,
    paddingBottom: 10,
    fontWeight: 'bold',
    color: colors.textColor,
  }
});

export default styles;
