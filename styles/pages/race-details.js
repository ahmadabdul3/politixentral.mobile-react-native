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

const styles = {
  pageTitle: {
    paddingLeft: 50,
    paddingTop: 27,
  },
  raceDetailsOfficials: {
    ...verticalSpacing,
  },

  raceDetailCandidateCard: {
    marginRight: standardSpacingSize * 0.5,
    marginLeft: standardSpacingSize * 0.5,
    marginTop: -1,
    backgroundColor: 'white',
    borderRadius: 2,
    ...horizontalSpacing,
    ...verticalSpacing,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
  },

  imagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.backgroundGrayDark,
    marginRight: 10,
  },

  reaceDetailBio: {
    flexDirection: 'row',
    alignItems: 'center',
  },

};

export default styles;
