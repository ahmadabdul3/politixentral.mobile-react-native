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
    backgroundColor: colors.logoGreen,
    minHeight: 50,
    alignItems: 'center',
  },
  repImage: {
    flexGrow: 0,
    flexShrink: 0,
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: colors.logoGreenDark,
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
    width: '60%',
    marginTop: 5,
    justifyContent: 'space-around',
    marginRight: -70,
  },
  repAbout: {
    ...horizontalSpacing,
    ...verticalSpacing,
    paddingTop: 5,
    paddingBottom: 40,
    marginTop: 20,
    backgroundColor: colors.logoGreenDark,
  },
  aboutDescription: {
    marginTop: 10,
    lineHeight: 20,
    color: 'white',
  },
  bodyTitle: {

  }
});

export default styles;
