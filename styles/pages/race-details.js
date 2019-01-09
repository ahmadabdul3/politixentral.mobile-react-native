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
  raceDetailCandidates: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: standardSpacingSize,
    flexWrap: 'wrap',
  },
  candidateSummaryHeader: {
    margin: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  candidateSummaryHeaderImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: colors.brandPurpleLighter,
  },
  candidateSummaryHeaderFirstName: {
    // color: 'white',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  candidateSummaryHeaderLastName: {
    // color: 'white',
    marginTop: 0,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  raceDetailsOfficials: {
    ...verticalSpacing,
  },

  raceDetailCandidateCard: {
    marginRight: standardSpacingSize,
    marginLeft: standardSpacingSize,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  imagePlaceholder: {
    overflow: 'hidden',
    backgroundColor: colors.brandPurpleLighter,
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
  },

  reaceDetailBio: {
    flexDirection: 'row',
  },
  candidateComparisonDataItems: {
    marginLeft: 10,
  },
  candidateComparisonDataItem: {
    // color: 'white',
    marginBottom: 5,
  },

};

export default styles;
