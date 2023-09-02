import React from 'react';
import {View, StyleSheet, Text, Image, Keyboard} from 'react-native';
import Background from '../components/Background';
import Btn from '../components/Btn';
import Field from '../components/Field';
import {useTheme} from '@react-navigation/native';

const Login = props => {
  const [inputs, setInputs] = React.useState({phone: '', password: ''});
  const [errors, setErrors] = React.useState({});
  const [feilds, setFields] = React.useState({phone: 0, password: 0});
  const validatePhone = () => {
    Keyboard.dismiss();
    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      return false;
    } else if (!inputs.phone.match(/^[6-9]\d{9}$/)) {
      handleError('Please input valid phone number', 'phone');
      return false;
    }
    return true;
  };
  const validatePassword = () => {
    Keyboard.dismiss();
    if (!inputs.password) {
      handleError('Please enter password', 'password');
      return false;
    } else if (inputs.password.length < 6) {
      handleError('Min password length of 6', 'password');
      return false;
    } else if (
      !inputs.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      )
    ) {
      handleError(
        'Password should have at least one uppercase letter, one lowercase letter, one number and one special character',
        'password',
      );
      return false;
    }
    return true;
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    let validPhone = validatePhone();
    let validPassword = validatePassword();
    if (!(validPhone && validPassword)) {
      valid = false;
    }
    if (valid) {
      props.navigation.navigate('Scan');
    }
  };
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
    setFields(prevState => ({...prevState, [input]: 1}));
  };
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };
  const colors = useTheme().colors;
  return (
    <Background>
      <View style={styles(colors).container}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles(colors).logo}
        />
        <Text style={styles(colors).heading}>BUDGETALIZER</Text>
        <Field
          placeholder="Phone Number"
          keyboardType="numeric"
          onChangeText={text => handleOnChange(text, 'phone')}
          error={errors.phone}
          field={feilds.phone}
          onFocus={() => {
            handleError(null, 'phone');
          }}
          validateField={validatePhone}
        />
        <Field
          placeholder="Password"
          password={true}
          onChangeText={text => handleOnChange(text, 'password')}
          error={errors.password}
          field={feilds.password}
          onFocus={() => {
            handleError(null, 'password');
          }}
          validateField={validatePassword}
        />
        <View style={styles(colors).view1}>
          <Text
            style={styles(colors).forget}
            onPress={() => props.navigation.navigate('ForgetPassword')}>
            Forget password?
          </Text>
        </View>
        <View style={styles(colors).view2}>
          <View style={styles(colors).btn}>
            <Btn
              bgColor={colors.text}
              textColor={colors.themeColor}
              btnLabel="Login"
              onPress={validate}
            />
          </View>
          <View style={styles(colors).orContainer}>
            <Text style={styles(colors).startLine}>──────</Text>
            <Text style={styles(colors).orTxt}>OR</Text>
            <Text style={styles(colors).lastLine}>──────</Text>
          </View>

          <Btn
            textColor={colors.text}
            btnLabel="Register"
            onPress={() => props.navigation.navigate('Register')}
          />
        </View>
      </View>
    </Background>
  );
};

const styles = colors =>
  StyleSheet.create({
    container: {
      marginVertical: 100,
      width: '100%',
      alignItems: 'center',
    },
    logo: {
      width: '30%',
      height: '30%',
      resizeMode: 'contain',
    },
    heading: {fontSize: 38, color: colors.text, marginBottom: 30},
    view1: {alignItems: 'flex-end', width: '78%', marginTop: 10},
    forget: {
      color: colors.text,
      fontSize: 14,
      paddingRight: 10,
      fontWeight: '600',
    },
    view2: {marginVertical: 10, alignItems: 'center', marginTop: 40},
    btn: {width: 80},
    orContainer: {flexDirection: 'row', alignItems: 'center', padding: 10},
    startLine: {color: colors.text, opacity: 0.5},
    orTxt: {
      width: 30,
      textAlign: 'center',
      color: colors.text,
      fontWeight: '600',
    },
    lastLine: {color: colors.text, opacity: 0.5},
  });

export default Login;
