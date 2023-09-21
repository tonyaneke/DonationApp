import React from 'react';
import {View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import globalStyles from '../../assets/styles/globalStyle';
import styles from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

export default function BackButton({onPress}) {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </TouchableOpacity>
  );
}

BackButton.proptypes = {
  onPress: PropTypes.func.isRequired,
};
