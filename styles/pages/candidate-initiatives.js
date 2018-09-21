import { StyleSheet } from 'react-native';
import colors from 'px/styles/colors';
import {
  screen,
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';

export const sectionTitle = {
  ...horizontalSpacing,
  fontWeight: 'bold',
  color: colors.textColor,
  fontSize: 16,
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
  },
  sectionTitle: {
    ...sectionTitle,
  },
  whatStandFor: {
    marginTop: 30,
  },
  initiativesWrapper: {
    ...horizontalSpacing,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  initiative: {
    width: 80,
    alignItems: 'center',
  },
  initiativeImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  initiativeTitle: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 16,
    color: colors.textColor,
  },
  projects: {
    marginTop: 70,
  },
  project: {
    marginRight: standardSpacingSize,
    marginLeft: standardSpacingSize,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: 'white',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
    // borderRadius: 5,
    // marginTop: 10,
    // marginBottom: 5,
    // marginRight: 15,
    // marginLeft: 15,
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
    fontSize: 12,
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
    marginTop: 5,
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
