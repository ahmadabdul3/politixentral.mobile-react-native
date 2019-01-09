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
    backgroundColor: colors.backgroundGrayLighter,
    backgroundColor: 'white',
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
    paddingLeft: standardSpacingSize,
    paddingTop: 30,
    paddingBottom: 10,
    fontWeight: '900',
    color: colors.primary,
    fontSize: 26,
  },
  pageSubtitle: {
    marginTop: -10,
    paddingBottom: 30,
    paddingLeft: standardSpacingSize + 1,
    paddingRight: standardSpacingSize,
    fontWeight: '300',
    fontSize: 22,
    lineHeight: 27,
    color: colors.brandPurpleMutedLight,
  },
  pageBody: {
    flexGrow: 1,
  },
  scrollView: {
    backgroundColor: colors.backgroundGray,
  },
};

export default styles;
