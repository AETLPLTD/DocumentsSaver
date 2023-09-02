import React from 'react';
import {View, Text, Keyboard, StyleSheet} from 'react-native';
import Background from '../components/Background';
import Field from '../components/Field';
import Btn from '../components/Btn';
import {useTheme} from '@react-navigation/native';

const ForgetPassword = props => {
  const [inputs, setInputs] = React.useState({phone: '', password: ''});
  const [errors, setErrors] = React.useState({});
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

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    let validPhone = validatePhone();
    if (!validPhone) {
      valid = false;
    }
    if (valid) {
      props.navigation.navigate('Otp');
    }
  };
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (erroeMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: erroeMessage}));
  };
  const colors = useTheme().colors;
  return (
    <Background>
      <View style={styles(colors).firstcontainer}>
        <Text style={styles(colors).heading}>Forgot password?</Text>
      </View>

      <View style={styles(colors).secondcontainer}>
        <Text style={styles(colors).subHead}>
          Enter your registered mobile number
        </Text>
        <Field
          placeholder=""
          keyboardType="numeric"
          onChangeText={text => handleOnChange(text, 'phone')}
          error={errors.phone}
          onFocus={() => {
            handleError(null, 'phone');
          }}
          validateField={validatePhone}
        />
        <View style={styles(colors).button}>
          <Btn
            bgColor={colors.text}
            textColor={colors.themeColor}
            btnLabel="Submit"
            onPress={validate}
          />
        </View>
      </View>
    </Background>
  );
};

const styles = colors =>
  StyleSheet.create({
    firstcontainer: {
      marginTop: 100,
      marginLeft: 20,
      marginBottom: 50,
      width: '40%',
      alignItems: 'flex-start',
    },
    heading: {fontSize: 28, color: colors.text, fontWeight: '600'},
    secondcontainer: {
      width: '100%',
      alignItems: 'center',
    },
    subHead: {
      fontSize: 15,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 20,
    },
    button: {width: 95},
  });

export default ForgetPassword;
