import { sectionTitle } from 'px/styles/typography';
import colors from 'px/styles/colors';
import { horizontalSpacing, verticalSpacing } from 'px/styles/utils';

const styles = {
  pageSection: {
    marginBottom: 25,
    position: 'relative',
  },
  sectionTitleBox: {
    ...verticalSpacing,
    ...horizontalSpacing,
    paddingBottom: 0,
  },
  sectionTitle: {
    ...sectionTitle,
    paddingBottom: 0,
    color: colors.textColor,
  },
  sectionTitleSecondary: {
    color: colors.textColorLighter,
    fontWeight: '300',
    fontSize: 20,
  },
  pageSectionContent: {
    marginTop: 10,
  },
  horizontalScrollPageSectionDots: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  horizontalScrollPageSectionDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    opacity: 0.5,
    marginRight: 3,
  },
};

export default styles;
