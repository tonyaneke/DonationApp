import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(7),
  },
  image: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(24),
    width: '100%',
    height: verticalScale(240),
    borderRadius: horizontalScale(5),
  },
  badge: {
    marginBottom: verticalScale(16),
  },
  description: {
    marginTop: verticalScale(7),
    marginHorizontal: horizontalScale(7),
    fontFamily: 'Inter',
    fontSize: scaleFontSize(14),
    fontWeight: '400',
    color: 'black',
    marginBottom: verticalScale(10),
  },
  button: {
    marginHorizontal: horizontalScale(20),
    marginBottom: verticalScale(15),
  },
});

export default styles;
