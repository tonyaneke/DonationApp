import {
  View,
  Text,
  TextInput,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../../assets/styles/globalStyle';
import {ScrollView} from 'react-native-gesture-handler';
import Input from '../../component/Input/Input';
import styles from './styles';
import Header from '../../component/Header/Header';
import Button from '../../component/Button/Button';
import {Routes} from '../../navigation/Routes';
import {loginUser} from '../../api/user';
import {useDispatch} from 'react-redux';
import {logIn, resetToInitialState} from '../../redux/reducers/User';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[globalStyles.backgroundWhite, globalStyles.flex]}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={globalStyles.marginBottom24}>
          <Header title={'Welcome Back'} type={1} />
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

        <View style={globalStyles.marginBottom24}>
          <Button
            onPress={async () => {
              const user = await loginUser(email, password);
              if (!user.status) {
                setError(user.error);
              } else {
                setError('');
                dispatch(logIn(user.data));
                navigation.navigate(Routes.Home);
              }
            }}
            isDisabled={email.length < 5 || password.length < 8}
            title={'Login'}
          />
        </View>
        <TouchableOpacity
          style={styles.resgistrationButton}
          onPress={() => navigation.navigate(Routes.Registration)}>
          <Header title={'Dont have an account?'} type={3} color={'#156CF7'} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
