import React from 'react';
import {View, Text, Keyboard, StyleSheet, Image} from 'react-native';
import Background from '../components/Background';
import Field from '../components/Field';
import Btn from '../components/Btn';
import {passwordStrength} from 'check-password-strength';
import {useTheme} from '@react-navigation/native';

const Register = props => {
  const [inputs, setInputs] = React.useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState({});
  const [feilds, setFields] = React.useState({
    email: 0,
    phone: 0,
    password: 0,
    confirmPassword: 0,
  });
  const validateEmail = () => {
    Keyboard.dismiss();
    if (!inputs.email) {
      handleError('Please enter email id', 'email');
      return false;
    } else if (
      !inputs.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/)
    ) {
      handleError('Please enter valid email id', 'email');
      return false;
    }
    return true;
  };
  const validatePhone = () => {
    Keyboard.dismiss();
    if (!inputs.phone) {
      return true;
    } else if (!inputs.phone.match(/^[6-9]\d{9}$/)) {
      handleError('Please enter valid phone number', 'phone');
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{6,})/,
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
  const validateCPassword = () => {
    if (!inputs.confirmPassword) {
      handleError('Please confirm password', 'confirmPassword');
      return false;
    } else if (inputs.confirmPassword != inputs.password) {
      handleError('Password not same as above', 'confirmPassword');
      return false;
    }
    return true;
  };
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    let validEmail = validateEmail();
    let validPhone = validatePhone();
    let validPassword = validatePassword();
    let validCPassword = validateCPassword();

    if (!(validEmail && validPhone && validPassword && validCPassword)) {
      valid = false;
    }

    if (valid) {
      props.navigation.navigate('GetStarted');
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
        <Text style={styles(colors).head}>Register your account</Text>
        <View style={styles(colors).fieldView1}>
          <Field
            placeholder="Email Address"
            onChangeText={text => handleOnChange(text, 'email')}
            error={errors.email}
            field={feilds.email}
            onFocus={() => {
              handleError(null, 'email');
            }}
            validateField={validateEmail}
          />

          <Field
            placeholder="Enter mobile number"
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
            placeholder="Create Password"
            password={true}
            onChangeText={text => handleOnChange(text, 'password')}
            error={errors.password}
            field={feilds.password}
            onFocus={() => {
              handleError(null, 'password');
            }}
            validateField={validatePassword}
          />
        </View>
        <Field
          placeholder="Confirm Password"
          password={true}
          onChangeText={text => handleOnChange(text, 'confirmPassword')}
          error={errors.confirmPassword}
          field={feilds.confirmPassword}
          onFocus={() => {
            handleError(null, 'confirmPassword');
          }}
        />
        <View style={styles(colors).indicatorView}>
          <View
            style={[
              styles(colors).indicator,
              {
                backgroundColor:
                  inputs.password == ''
                    ? 'white'
                    : passwordStrength(inputs.password).value == 'Too weak'
                    ? 'red'
                    : passwordStrength(inputs.password).value == 'Weak'
                    ? 'yellow'
                    : passwordStrength(inputs.password).value == 'Medium'
                    ? '#00D100'
                    : passwordStrength(inputs.password).value == 'Strong'
                    ? '#007500'
                    : colors.themeColor === '#FFFFFF'
                    ? '#D3D3D3'
                    : 'white',
              },
            ]}
          />
          <View
            style={[
              styles(colors).indicator,
              {
                backgroundColor:
                  passwordStrength(inputs.password).value == 'Weak'
                    ? 'yellow'
                    : passwordStrength(inputs.password).value == 'Medium'
                    ? '#00D100'
                    : passwordStrength(inputs.password).value == 'Strong'
                    ? '#007500'
                    : colors.themeColor === '#FFFFFF'
                    ? '#D3D3D3'
                    : 'white',
              },
            ]}
          />
          <View
            style={[
              styles(colors).indicator,
              {
                backgroundColor:
                  passwordStrength(inputs.password).value == 'Medium'
                    ? '#00D100'
                    : passwordStrength(inputs.password).value == 'Strong'
                    ? '#007500'
                    : colors.themeColor === '#FFFFFF'
                    ? '#D3D3D3'
                    : 'white',
              },
            ]}
          />
          <View
            style={[
              styles(colors).indicator,
              {
                backgroundColor:
                  passwordStrength(inputs.password).value == 'Strong'
                    ? '#007500'
                    : colors.themeColor === '#FFFFFF'
                    ? '#D3D3D3'
                    : 'white',
              },
            ]}
          />
          <View>
            <Text style={styles(colors).strength}>
              {inputs.password === ''
                ? ''
                : passwordStrength(inputs.password).value === 'Too weak'
                ? 'TOO WEAK'
                : passwordStrength(inputs.password).value === 'Weak'
                ? 'WEAK'
                : passwordStrength(inputs.password).value === 'Medium'
                ? 'GOOD'
                : passwordStrength(inputs.password).value === 'Strong'
                ? 'STRONG'
                : ''}
            </Text>
          </View>
        </View>

        <View style={styles(colors).btn}>
          <Btn
            bgColor={colors.text}
            textColor={colors.themeColor}
            btnLabel="Sign Up"
            onPress={validate}
          />
        </View>
      </View>
    </Background>
  );
};

const styles = colors =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: '40%',
      height: '30%',
      resizeMode: 'contain',
    },
    head: {
      fontSize: 28,
      color: colors.text,
      marginBottom: 20,
      marginTop: -20,
      fontWeight: '600',
    },
    fieldView1: {marginBottom: 20, width: '100%', alignItems: 'center'},
    fieldView2: {marginBottom: 20, width: '100%', alignItems: 'center'},
    indicatorView: {
      flexDirection: 'row',
      marginTop: 20,
      marginLeft: 12,
      width: '75%',
      alignItems: 'center',
    },
    indicator: {
      borderRadius: 15,
      width: 40,
      height: 8,
      marginRight: 4,
    },
    strength: {
      color: colors.text,
      fontSize: 15,
      fontWeight: 'bold',
      marginLeft: 8,
    },
    btn: {marginTop: 30, width: 80},
  });

export default Register;
