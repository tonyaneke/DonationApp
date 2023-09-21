import React from 'react';
import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

export default function Button({title, isDisabled, onPress}) {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[styles.button, isDisabled && styles.disabled]}
      onPress={() => onPress()}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

Button.default = {
  isDisabled: false,
  onPress: () => {},
};

Button.proptypes = {
  title: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func,
};
