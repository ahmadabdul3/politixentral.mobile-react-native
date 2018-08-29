
import { StyleSheet } from 'react-native';
import {
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';
import { cardStyles } from 'px/styles/components/card';

const styles = StyleSheet.create({
  initiativeSummary: {
    ...cardStyles,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
  },
});

export default styles;
