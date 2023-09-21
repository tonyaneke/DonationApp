import React, {useState, useRef} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import {horizontalScale} from '../../assets/styles/scaling';

export default function Tab({title, isInactive, onPress, tabId}) {
  const [width, setWidth] = useState(0);
  const textRef = useRef(null);
  const paddingHorizontal = 33;
  const tabWidth = {
    width: horizontalScale(paddingHorizontal * 2 + width),
  };

  return (
    <TouchableOpacity
      style={[styles.tab, isInactive && styles.inactiveTab, tabWidth]}
      onPress={() => onPress(tabId)}>
      <Text
        onTextLayout={e => {
          setWidth(e.nativeEvent.lines[0].width);
        }}
        ref={textRef}
        style={[styles.title, isInactive && styles.inactiveTabTitle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

Tab.default = {
  isInactive: false,
  onPress: () => {},
};

Tab.proptypes = {
  tabId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isInactive: PropTypes.bool,
  onPress: PropTypes.func,
};
