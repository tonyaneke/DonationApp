import {View, Pressable, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Badge from '../Badge/Badge';

import styles from './styles';

export default function SingleDonationItem({
  uri,
  badgeTitle,
  donationTitle,
  price,
  onPress,
  donationItemId,
}) {
  return (
    <Pressable onPress={() => onPress(donationItemId)}>
      <View>
        <View style={styles.badge}>
          <Badge title={badgeTitle} />
        </View>
        <Image source={{uri: uri}} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.donationInfo}>
        <Header title={donationTitle} type={3} numberOfLines={1} />
        <View style={styles.price}>
          <Header title={'$' + price.toFixed(2)} type={3} color={'#156CF7'} />
        </View>
      </View>
    </Pressable>
  );
}

SingleDonationItem.defaultProps = {
  onPress: () => {},
};

SingleDonationItem.proptypes = {
  donationItemId: PropTypes.number.isRequired,
  uri: PropTypes.string.isRequired,
  badgeTitle: PropTypes.string.isRequired,
  donationTitle: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};
