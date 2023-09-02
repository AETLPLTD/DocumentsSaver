import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Background from '../components/Background';
import Icon from 'react-native-vector-icons/Ionicons';

const Reciepts = props => {
  const {colors} = useTheme();
  const onBack = () => {
    props.navigation.navigate('Scan');
  };
  return (
    <Background>
      <View style={styles(colors).container}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="arrow-back" color={colors.text} size={30} />
        </TouchableOpacity>
        <Text style={styles(colors).titleText}>Reciepts</Text>
        <View style={styles(colors).imgList}>
          {props.route.params.imageNames.map((image, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  props.navigation.navigate('ShowImage', {
                    image: props.route.params.capturedImages[index],
                  });
                }}>
                <Text style={styles(colors).text}>{image}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Background>
  );
};

const styles = colors =>
  StyleSheet.create({
    container: {
      marginTop: 30,
      marginHorizontal: 30,
      marginBottom: 180,
    },
    previewImage: {
      height: 150,
      width: 150,
      margin: 10,
    },
    titleText: {
      color: colors.text,
      fontWeight: '500',
      fontSize: 20,
      marginTop: 20,
    },
    imgList: {
      marginTop: 30,
      marginBottom: 20,
    },
    text: {
      color: colors.text,
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });
export default Reciepts;
