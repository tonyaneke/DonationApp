import {StyleSheet} from 'react-native';
import styles from '../../screens/Home/styles';
import {verticalScale} from './scaling';

const globalStyles = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
  },
  marginBottom24: {
    marginBottom: verticalScale(24),
  },
});

export default globalStyles;
