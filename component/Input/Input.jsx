import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

export default function Input({
  label,
  placeholder,
  onChangeText,
  keyboardType,
  secureTextEntry,
}) {
  const [value, setValue] = useState('');
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder ? placeholder : null}
        style={styles.input}
        value={value}
        onChangeText={value => {
          setValue(value);
          onChangeText(value);
        }}
        keyboardType={keyboardType}
      />
    </View>
  );
}

Input.defaultProps = {
  onChangeText: () => {},
  keyboardType: 'default',
  secureTextEntry: false,
};

Input.propTypes = {
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};
