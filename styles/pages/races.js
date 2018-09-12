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
    minHeight: 300,
  },
  headerTitle: {
    color: 'white',
  },
});

export default styles;
