import { StyleSheet } from 'react-native';
import colors from 'px/styles/colors';
import {
  screen,
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';

const initiativeStatusText = {
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
    color: colors.logoGreen,
  },
  statementBody: {
    ...horizontalSpacing,
    marginTop: 10,
    lineHeight: 20,
    color: colors.textColor,
  },
  initiativeList: {
    marginTop: 10,
  },
  initiative: {
    ...horizontalSpacing,
    ...verticalSpacing,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  initiativeHeader: {
    flexDirection: 'row',
  },
  initiativeTitle: {
    flexGrow: 1,
    flexShrink: 1,
  },
  initiativeTitleText: {
    color: colors.textColorLight,
    fontWeight: 'bold',
    fontSize: 12,
  },
  initiativeStatus: {
    marginLeft: 10,
    flexShrink: 0,
    flexGrow: 0,
  },
  initiativeStatusComplete: {
    ...initiativeStatusText,
    color: colors.logoGreen,
  },
  initiativeStatusNotStarted: {
    ...initiativeStatusText,
    color: colors.red,
  },
  initiativeStatusInProgress: {
    ...initiativeStatusText,
    color: colors.orange,
  },
});

export default styles;
