import { StyleSheet } from 'react-native';
import colors from 'px/styles/colors';
import {
  screen,
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';

const projectStatusText = {
  fontSize: 9,
  fontWeight: 'bold',
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
  },
  missionStatement: {
    ...verticalSpacing,
  },
  sectionTitle: {
    ...horizontalSpacing,
    fontWeight: 'bold',
    color: colors.logoGreenDark,
  },
  statementBody: {
    ...horizontalSpacing,
    marginTop: 10,
    lineHeight: 20,
    color: colors.textColor,
  },
  projects: {
    marginTop: 10,
  },
  project: {
    ...horizontalSpacing,
    ...verticalSpacing,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  projectHeader: {
    flexDirection: 'row',
  },
  projectTitle: {
    flexGrow: 1,
    flexShrink: 1,
  },
  projectTitleText: {
    color: colors.textColor,
    fontWeight: 'bold',
    fontSize: 12,
  },
  projectStatus: {
    marginLeft: 10,
    flexShrink: 0,
    flexGrow: 0,
  },
  projectStatusComplete: {
    ...projectStatusText,
    color: colors.logoGreen,
  },
  projectStatusNotStarted: {
    ...projectStatusText,
    color: colors.red,
  },
  projectStatusInProgress: {
    ...projectStatusText,
    color: colors.orange,
  },
  projectDescription: {
    color: colors.textColor,
    marginTop: 5,
    fontSize: 12,
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
