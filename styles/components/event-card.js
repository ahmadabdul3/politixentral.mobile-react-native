import { StyleSheet } from 'react-native';
import colors from 'px/styles/colors';

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: colors.logoGreenDark,
  },
  description: {
    marginTop: 10,
    lineHeight: 20,
    color: colors.textColorLight,
  },
});

export default styles;
