import { sectionTitle } from 'px/styles/typography';
import colors from 'px/styles/colors';
import { horizontalSpacing, verticalSpacing } from 'px/styles/utils';

const styles = {
  pageSection: {
    marginBottom: 25,
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
    color: colors.brandPurpleLightest,
    fontWeight: '300',
    fontSize: 20,
  },
  pageSectionContent: {
    marginTop: 10,
  },
};

export default styles;
