import { StyleSheet } from 'react-native';
import colors from 'px/styles/colors';
import { sectionTitle } from 'px/styles/typography';
import { section } from 'px/styles/sectioning';
import {
  screen,
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';

const projectShared = {
  ...verticalSpacing,
  // - using margins instead of horizontalSpacing
  //   so that the border bottom doesn't go all the way across
  marginRight: standardSpacingSize,
  marginLeft: standardSpacingSize,
  // backgroundColor: 'white',
  position: 'relative',
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: colors.backgroundGrayDarker,
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.backgroundGray,
    backgroundColor: 'white',
  },
  sectionTitle: {
    ...sectionTitle,
  },
  whatStandFor: {
    ...section,
  },
  initiativesWrapper: {
    ...horizontalSpacing,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  initiative: {
    width: 80,
    alignItems: 'center',
  },
  initiativeImage: {
    width: 70,
    height: 70,
    borderRadius: 70,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.backgroundGrayDarker,
    backgroundColor: 'white',
  },
  initiativeTitle: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 15,
    color: colors.textColor,
  },
  projects: {
    ...section,
  },
  project: {
    ...projectShared,
  },
  projectFirst: {
    ...projectShared,
    paddingTop: 0,
  },
  projectLast: {
    ...projectShared,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  projectHeader: {
    flexDirection: 'row',
  },
  projectTitle: {
    flexGrow: 1,
    flexShrink: 1,
  },
  projectTitleText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  projectStatus: {
    marginLeft: 10,
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectStatusText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textColorLighter,
    marginRight: 10,
  },
  projectDescription: {
    color: colors.textColor,
    marginTop: 5,
    fontSize: 12,
  },
  projectMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  projectFeedback: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  labelValueLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textColorLight,
  },
  labelValueValue: {
    paddingLeft: 10,
    fontSize: 10,
    color: colors.textColorLight,
  },
  feedback: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  feedbackNumber: {
    fontSize: 12,
    color: colors.textColorLighter,
    fontWeight: 'bold',
  }
});

export default styles;
