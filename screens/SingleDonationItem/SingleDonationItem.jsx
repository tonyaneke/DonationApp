import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  Text,
} from 'react-native';

import styles from './styles';
import {useSelector} from 'react-redux';

import BackButton from '../../component/BackButton/BackButton';
import globalStyles from '../../assets/styles/globalStyle';
import Badge from '../../component/Badge/Badge';
import Header from '../../component/Header/Header';
import Button from '../../component/Button/Button';
import {Routes} from '../../navigation/Routes';

export default function SingleDonationItem({navigation, route}) {
  const donationItemInformation = useSelector(
    state => state.donations.selectedDonationInformation,
  );
  const categoryInformation = route.params.categoryInfo;

  return (
    <SafeAreaView style={[globalStyles.backgroundWhite, globalStyles.flex]}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Image
          source={{uri: donationItemInformation.image}}
          style={styles.image}
        />
        <View style={styles.badge}>
          <Badge title={categoryInformation.name} />
        </View>
        <Header title={donationItemInformation.name} type={1} />
        <Text style={styles.description}>
          {donationItemInformation.description}
        </Text>
      </ScrollView>
      <View style={styles.button}>
        <Button
          title={'Donate'}
          onPress={() => {
            navigation.navigate(Routes.Payment);
          }}
        />
      </View>
    </SafeAreaView>
  );
}
