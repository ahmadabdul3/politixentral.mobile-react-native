import { StyleSheet } from 'react-native';
import {
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';

 export const cardStyles = {
  ...horizontalSpacing,
  ...verticalSpacing,
  marginTop: 10,
  marginRight: 5,
  marginLeft: 5,
  borderRadius: 3,
  backgroundColor: 'white',
  minHeight: 20,
};

const card = StyleSheet.create({
  card: cardStyles,
  cardLast: {
    ...cardStyles,
    marginBottom: 10,
  }
});

export default card;
