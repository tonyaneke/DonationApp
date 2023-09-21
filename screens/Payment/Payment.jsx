import {Paystack} from 'react-native-paystack-webview';
import React from 'react';
import {Alert, View} from 'react-native';

import {useSelector} from 'react-redux';
import {Routes} from '../../navigation/Routes';

export default function Payment({navigation}) {
  const donationItemInformation = useSelector(
    state => state.donations.selectedDonationInformation,
  );

  const user = useSelector(state => state.user);

  const handleVerifiedPayments = res => {
    Alert.alert(`Your payment was ${res.status}full`);
    navigation.navigate(Routes.Home);
  };
  const handleUnverifiedPayment = e => {
    Alert.alert(`Your payment was ${e.status}`);
    navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <Paystack
        paystackKey={'pk_test_a9f3fdc76cf2821f5fb39a749505f173283a26d9'}
        amount={donationItemInformation.price}
        billingEmail={user.email}
        activityIndicatorColor="green"
        channels={['card', 'ussd', 'qr']}
        onCancel={e => {
          handleUnverifiedPayment(e);
        }}
        onSuccess={res => {
          handleVerifiedPayments(res);
          console.log(res);
        }}
        autoStart={true}
      />
    </View>
  );
}
