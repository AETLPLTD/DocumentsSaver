import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Keyboard, StyleSheet, TextInput} from 'react-native';
import Background from '../components/Background';
import Btn from '../components/Btn';
import RNOtpVerify from 'react-native-otp-verify';
import {useTheme} from '@react-navigation/native';

const Otp = props => {
  const f1 = useRef();
  const f2 = useRef();
  const f3 = useRef();
  const f4 = useRef();
  const [fv1, setFv1] = useState('');
  const [fv2, setFv2] = useState('');
  const [fv3, setFv3] = useState('');
  const [fv4, setFv4] = useState('');
  useEffect(() => {
    RNOtpVerify.getHash().then(console.log).catch(console.log);
    RNOtpVerify.getOtp()
      .then(p => {
        RNOtpVerify.addListener(otpHandler).catch(console.log);
      })
      .catch(console.log);
  }, []);
  const otpHandler = message => {
    const otp = /(\d{4})/g.exec(message)[1];
    setFv1(otp[0]);
    setFv2(otp[1]);
    setFv3(otp[2]);
    setFv4(otp[3]);
    RNOtpVerify.removeListener();
    Keyboard.dismiss();
  };
  const colors = useTheme().colors;
  return (
    <Background>
      <View style={styles(colors).view1}>
        <Text style={styles(colors).head}>Forgot password?</Text>
      </View>

      <View style={styles(colors).view2}>
        <Text style={styles(colors).subhead}>Enter OTP</Text>
        <View style={styles(colors).otpView}>
          <TextInput
            ref={f1}
            style={[
              styles(colors).inputView,
              {borderColor: fv1.length == 1 ? 'white' : '#292865'},
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={fv1}
            onChangeText={txt => {
              setFv1(txt);
              if (txt.length == 1) f2.current.focus();
              else if (txt.length == 0) f1.current.focus();
            }}
          />
          <TextInput
            ref={f2}
            style={[
              styles(colors).inputView,
              {borderColor: fv2.length == 1 ? 'white' : '#292865'},
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={fv2}
            onChangeText={txt => {
              setFv2(txt);
              if (txt.length == 1) f3.current.focus();
              else if (txt.length == 0) f1.current.focus();
            }}
          />
          <TextInput
            ref={f3}
            style={[
              styles(colors).inputView,
              {borderColor: fv3.length == 1 ? 'white' : '#292865'},
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={fv3}
            onChangeText={txt => {
              setFv3(txt);
              if (txt.length == 1) f4.current.focus();
              else if (txt.length == 0) f2.current.focus();
            }}
          />
          <TextInput
            ref={f4}
            style={[
              styles(colors).inputView,
              {
                borderColor:
                  fv4.length == 1
                    ? colors.themeColor === '#FFFFFF'
                      ? colors.secondary
                      : 'white'
                    : '#292865',
              },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={fv4}
            onChangeText={txt => {
              setFv4(txt);
              if (txt.length == 1) f4.current.focus();
              else if (txt.length == 0) f3.current.focus();
            }}
          />
        </View>
        <View>
          <Btn
            disabled={
              fv1 !== '' && fv2 !== '' && fv3 !== '' && fv4 !== ''
                ? false
                : true
            }
            bgColor={
              fv1 !== '' && fv2 !== '' && fv3 !== '' && fv4 !== ''
                ? colors.text
                : 'grey'
            }
            textColor={colors.themeColor}
            btnLabel="Enter"
          />
        </View>
      </View>
    </Background>
  );
};

const styles = colors =>
  StyleSheet.create({
    view1: {
      marginTop: 100,
      marginLeft: 20,
      marginBottom: 50,
      width: '40%',
      alignItems: 'flex-start',
    },
    head: {fontSize: 28, color: colors.text, fontWeight: '600'},
    view2: {
      width: '100%',
      alignItems: 'center',
    },
    subhead: {
      fontSize: 20,
      color: colors.text,
      marginBottom: 20,
      fontWeight: '600',
    },
    otpView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '80%',
      marginBottom: 50,
    },
    inputView: {
      width: 60,
      height: 60,
      borderWidth: 0.5,
      borderRadius: 5,
      backgroundColor: '#292865',
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '600',
    },
  });

export default Otp;
