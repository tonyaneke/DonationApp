import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default function Header({title, type, color, numberOfLines}) {
  const styleToApply = () => {
    switch (type) {
      case 1:
        return styles.title1;
      case 2:
        return styles.title2;
      case 3:
        return styles.title3;
      default:
        return styles.title1;
    }
  };

  return (
    <View>
      <Text
        style={[styleToApply(), color && {color: color}]}
        numberOfLines={numberOfLines ? numberOfLines : null}>
        {title}
      </Text>
    </View>
  );
}

Header.default = {
  title: '',
  type: 1,
  color: '#000000',
};

Header.propTypes = {
  title: PropTypes.string,
  type: PropTypes.number,
  color: PropTypes.string,
  numberOfLines: PropTypes.number,
};
