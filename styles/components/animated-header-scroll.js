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
    backgroundColor: colors.backgroundGray,
  },
  pageHeader: {
    backgroundColor: colors.backgroundGrayLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundGrayDark,
    flexDirection: 'column-reverse',
  },
  pageTitle: {
    ...horizontalSpacing,
    paddingTop: 60,
    paddingBottom: 20,
    fontWeight: '900',
    color: colors.primary,
    fontSize: 30,
  },
  pageSubtitle: {
    backgroundColor: colors.backgroundGrayLight,
    marginTop: -10,
    paddingBottom: 30,
    paddingLeft: standardSpacingSize * 2,
    paddingRight: standardSpacingSize,
    fontWeight: '300',
    fontSize: 24,
    lineHeight: 30,
    color: colors.textColorLighter,
  },
  scrollView: {
    backgroundColor: colors.backgroundGrayLight,
  },
  scrollItems: {
    // borderTopWidth: 1,
    // borderTopColor: colors.backgroundGrayDark,
    // backgroundColor: colors.backgroundGray,
  },
};

export default styles;
