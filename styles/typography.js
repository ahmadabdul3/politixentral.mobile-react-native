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
};

export const pageTitle = {
  ...horizontalSpacing,
  paddingTop: 60,
  paddingBottom: 60,
  fontWeight: 'bold',
  color: colors.primary,
  fontSize: 30,
};

export const pageSubtitle = {
  marginTop: -50,
  marginBottom: 60,
  marginLeft: standardSpacingSize * 2,
  marginRight: standardSpacingSize,
  fontWeight: '300',
  fontSize: 24,
  lineHeight: 28,
  color: colors.textColorLighter,
};
