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
  screen: {
    ...screen,
    backgroundColor: colors.backgroundGrayDark,
  },
  pageHeader: {
    backgroundColor: colors.backgroundGrayLighter,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundGrayDark,
    flexDirection: 'column-reverse',
  },
  pageTitle: {
    ...horizontalSpacing,
    paddingLeft: standardSpacingSize * 1.5,
    paddingTop: 24,
    paddingBottom: 10,
    fontWeight: '900',
    color: colors.primary,
    fontSize: 30,
  },
  pageSubtitle: {
    marginTop: -10,
    paddingBottom: 30,
    paddingLeft: standardSpacingSize * 2.5,
    paddingRight: standardSpacingSize,
    fontWeight: '300',
    fontSize: 24,
    lineHeight: 30,
    color: colors.textColorLighter,
  },
  scrollView: {
    backgroundColor: colors.backgroundGray,
  },
};

export default styles;
