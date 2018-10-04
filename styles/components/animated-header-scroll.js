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
    marginTop: -10,
    paddingBottom: 30,
    marginLeft: standardSpacingSize * 2,
    marginRight: standardSpacingSize,
    fontWeight: '300',
    fontSize: 24,
    lineHeight: 30,
    color: colors.textColorLighter,
  },
};

export default styles;
