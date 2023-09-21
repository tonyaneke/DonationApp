import {StyleSheet} from 'react-native';
import {scaleFontSize} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  title1: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(24),
    fontWeight: '700',
    lineHeight: scaleFontSize(29),
    color: 'black',
  },
  title2: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(18),
    fontWeight: '700',
    lineHeight: scaleFontSize(22),
    color: 'black',
  },
  title3: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(16),
    fontWeight: '700',
    lineHeight: scaleFontSize(19),
    color: 'black',
  },
});

export default styles;
