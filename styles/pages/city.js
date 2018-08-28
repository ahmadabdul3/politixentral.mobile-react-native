import { StyleSheet } from 'react-native';
import colors from 'px/styles/colors';
import {
  horizontalSpacing, verticalSpacing, standardSpacingSize
} from 'px/styles/utils';

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    paddingTop: standardSpacingSize,
    height: '100%',
  },
  header: {
    flexGrow: 0,
    flexShrink: 0,
    position: 'relative',
  },
  headerTitle: {
    position: 'absolute',
    bottom: 30,
    left: standardSpacingSize,
    color: 'white',
    fontSize: 30,
  },
  cityHome: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'white',
  },
  cityEvents: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#eee',
  },
  demographics: {
    ...horizontalSpacing,
    marginTop: standardSpacingSize,
  },
  demographicsRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  demographic: {
    width: '50%',
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  demographicLabel: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  demographicValue: {
    marginLeft: 5,
    fontSize: 12,
  },
  cityDescription: {
    ...horizontalSpacing,
    marginTop: standardSpacingSize,
    color: colors.textColorLight,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  eventCardTitle: {
    fontWeight: 'bold',
    color: colors.logoGreenDark,
  },
  eventCardDescription: {
    marginTop: 10,
    lineHeight: 22,
    color: colors.textColorLight,
  }
});

export default styles;
