import React, {useRef, useState} from 'react';
import {View, TextInput, Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import styles from './styles';
import {scaleFontSize} from '../../assets/styles/scaling';

export default function Search({onSearch, placeholder = 'Search'}) {
  const [search, setSearch] = useState('');
  const textInputRef = useRef(null);
  const handleFocus = () => {
    textInputRef.current.focus();
  };

  const handleSearch = value => {
    setSearch(value);
    //  onSearch(value);
  };

  return (
    <Pressable style={styles.searchInputContainer} onPress={handleFocus}>
      <FontAwesomeIcon
        icon={faSearch}
        color="#25C0FF"
        size={scaleFontSize(22)}
      />
      <TextInput
        placeholder={placeholder}
        ref={textInputRef}
        style={styles.searchInput}
        value={search}
        onChangeText={value => {
          handleSearch(value);
        }}
      />
    </Pressable>
  );
}

Search.default = {
  onSearch: () => {},
  placeholder: 'Search',
};

Search.proptypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
};
