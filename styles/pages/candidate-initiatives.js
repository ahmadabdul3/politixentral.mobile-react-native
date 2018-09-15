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
  sectionTitle: {
    ...horizontalSpacing,
    fontWeight: 'bold',
    color: colors.logoGreenDark,
  },
  projects: {
    marginTop: 10,
  },
  project: {
    ...horizontalSpacing,
    paddingTop: 25,
    paddingBottom: 30,
    backgroundColor: 'white',
    position: 'relative',
    // borderBottomWidth: 1,
    // borderBottomColor: '#F5F6F7',
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
