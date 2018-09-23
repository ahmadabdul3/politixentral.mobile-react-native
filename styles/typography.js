import colors from 'px/styles/colors';
import {
  screen,
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';

export const sectionTitle = {
  ...horizontalSpacing,
  ...verticalSpacing,
  paddingBottom: 30,
  fontWeight: 'bold',
  color: colors.textColor,
  fontSize: 20,
}
