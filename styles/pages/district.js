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
    flexGrow: 0,
    flexShrink: 0,
    position: 'relative',
  },
  headerTitle: {
    position: 'absolute',
    bottom: 30,
    left: standardSpacingSize,
    color: 'black',
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
  cityDescription: {
    ...horizontalSpacing,
    marginTop: standardSpacingSize,
    color: colors.textColorLight,
    lineHeight: 22,
    fontStyle: 'italic',
  },
});

export default styles;
