import { sectionTitle } from 'px/styles/typography';
import colors from 'px/styles/colors';
import { horizontalSpacing, verticalSpacing } from 'px/styles/utils';

const styles = {
  pageSection: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  sectionTitleBox: {
    ...verticalSpacing,
    ...horizontalSpacing,
    paddingBottom: 0,
  },
  sectionTitle: {
    ...sectionTitle,
    paddingBottom: 0,
  },
  sectionTitleSecondary: {
    color: colors.textColorLighter,
    fontWeight: '300',
    fontSize: 20,
  },
  pageSectionContent: {

  },
};

export default styles;
