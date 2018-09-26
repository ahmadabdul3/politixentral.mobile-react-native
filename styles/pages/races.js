import { StyleSheet } from 'react-native';
import colors from 'px/styles/colors';
import { pageTitle, pageSubtitle, sectionTitle } from 'px/styles/typography';
import { section } from 'px/styles/sectioning';
import {
  screen,
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';

const styles = StyleSheet.create({
  screen: {
    ...screen,
    backgroundColor: colors.backgroundGray,
  },
  pageTitle,
  pageSubtitle,
  section: {
    ...section,
    marginBottom: 60,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionHeaderLink: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: standardSpacingSize,
  },
  sectionTitle: {
    ...sectionTitle,
    paddingTop: 0,
    paddingBottom: 0,
  },
  sectionTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  titleSubtitleSeparator: {
    marginRight: 15,
    width: 1,
    height: 20,
    backgroundColor: colors.textColorLighter,
  },
  sectionSubtitle: {
    color: colors.textColorLighter,
    fontWeight: '300',
    fontSize: 20,
  },
  sectionContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  candidateCard: {
    padding: 15,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.backgroundGrayDark,
  },
  candidateCardImageBox: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.textColorLighter,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  candidateCardImageBoxBlue: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.linkedin,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  candidateCardImageBoxRed: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.red,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  candidateCardImageBoxYellow: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.yellow,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  candidateName: {
    marginTop: 15,
    color: colors.textColor,
    fontWeight: 'bold',
    fontSize: 15,
  },
  candidateLabel: {
    marginTop: 3,
    fontWeight: 'bold',
    fontSize: 10,
    color: colors.textColorLighter,
  },
});

export default styles;
