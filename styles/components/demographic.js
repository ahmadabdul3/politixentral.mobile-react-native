import { StyleSheet } from 'react-native';

const label = {
  fontWeight: 'bold',
  fontSize: 12,
};

const value = {
  marginLeft: 5,
  fontSize: 12,
};

const styles = StyleSheet.create({
  demographic: {
    width: '50%',
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  demographicLabel: label,
  demographicLabelWhite: {
    ...label,
    color: 'white',
  },
  demographicValue: value,
  demographicValueWhite: {
    ...value,
    color: 'white',
  },
});

export default styles;
