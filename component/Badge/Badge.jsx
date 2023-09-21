import React, {useState, useRef} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import {horizontalScale} from '../../assets/styles/scaling';

export default function Badge({title}) {
  const [width, setWidth] = useState(0);
  const textRef = useRef(null);
  const paddingHorizontal = 10;
  const tabWidth = {
    width: horizontalScale(paddingHorizontal * 2 + width),
  };

  return (
    <TouchableOpacity style={[styles.badge, tabWidth]}>
      <Text
        onTextLayout={e => {
          setWidth(e.nativeEvent.lines[0].width);
        }}
        ref={textRef}
        style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

Badge.proptypes = {
  title: PropTypes.string.isRequired,
};
