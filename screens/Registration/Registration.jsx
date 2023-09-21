import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../../assets/styles/globalStyle';
import {ScrollView} from 'react-native-gesture-handler';
import Input from '../../component/Input/Input';
import styles from './styles';
import Header from '../../component/Header/Header';
import Button from '../../component/Button/Button';
import BackButton from '../../component/BackButton/BackButton';
import {createUser} from '../../api/user';

export default function Registration({navigation}) {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  return (
    <SafeAreaView style={[globalStyles.backgroundWhite, globalStyles.flex]}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles.backButton}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={globalStyles.marginBottom24}>
          <Header title={'Hello and Welcome!'} type={1} />
        </View>
        <View style={globalStyles.marginBottom24}>
          <Input
            label={'First & Last Name'}
            placeholder={'Enter your fullname!'}
            onChangeText={value => setFullname(value)}
          />
        </View>
        <View style={globalStyles.marginBottom24}>
          <Input
            keyboardType={'email-address'}
            label={'Email'}
            placeholder={'Enter your email!'}
            onChangeText={value => setEmail(value)}
          />
        </View>
        <View style={globalStyles.marginBottom24}>
          <Input
            secureTextEntry={true}
            label={'Password'}
            placeholder={'******'}
            onChangeText={value => setPassword(value)}
          />
        </View>
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
        {success.length > 0 && <Text style={styles.success}>{success}</Text>}
        <View style={globalStyles.marginBottom24}>
          <Button
            isDisabled={
              fullname.length <= 2 || email.length <= 5 || password.length < 8
            }
            title={'Register'}
            onPress={async () => {
              let user = await createUser(fullname, email, password);
              if (user.error) {
                setError(user.error);
              } else {
                setError('');
                setSuccess('You have successfully registered');
                setTimeout(() => navigation.goBack(), 3000);
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
