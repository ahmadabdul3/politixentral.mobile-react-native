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
  fontWeight: '800',
  // color: 'white',
  fontSize: 22,
};

export const sectionTitleGray = {
  ...sectionTitle,
  color: colors.textColor,
};

export const pageTitle = {
  ...horizontalSpacing,
  paddingTop: 60,
  paddingBottom: 60,
  fontWeight: '900',
  color: colors.primary,
  fontSize: 26,
};

export const pageSubtitle = {
  marginTop: -50,
  marginBottom: 60,
  marginLeft: standardSpacingSize * 2,
  marginRight: standardSpacingSize,
  fontWeight: '300',
  fontSize: 23,
  lineHeight: 28,
  color: colors.brandPurpleLight,
};
