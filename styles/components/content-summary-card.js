import { StyleSheet } from 'react-native';
import colors from 'px/styles/colors';
import { pageTitle, pageSubtitle, sectionTitle } from 'px/styles/typography';
import { section } from 'px/styles/sectioning';
import {
  screen,
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';

const styles = {
  card: {
    marginRight: standardSpacingSize * 0.5,
    marginLeft: standardSpacingSize * 0.5,
    marginTop: 20,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 13,
    color: colors.brandPurpleLighter,
    fontWeight: 'bold',
    marginLeft: 5,
    marginBottom: 2,
  },
  cardChildrenBox: {
    backgroundColor: 'white',
    borderRadius: 5,
  }
};

export default styles;
