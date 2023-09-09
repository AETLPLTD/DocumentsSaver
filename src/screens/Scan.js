import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import Background from '../components/Background';
import * as ImagePicker from 'expo-image-picker';
import {Camera} from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';

function Scan(props) {
  let capturedimage = props.route.params?.capturedImage;
  let imagename = props.route.params?.imageName;
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedImages, setCapturedImages] = useState(
    capturedImage ? [capturedImage] : [],
  );
  const [imageName, setImagename] = useState(null);
  const [imageNames, setImageNames] = useState(imageName ? [imageName] : []);
  const [hasPermission, setHasPermission] = useState(null);
  const colors = useTheme().colors;
  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      setCapturedImage(capturedimage ? capturedimage : null);
      setImagename(imagename ? imagename : null);
    })();
  }, [capturedimage, imagename]);
  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const pickImage = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access media library denied');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 1,
    });
    if (!result.canceled) {
      const fileName = result.assets[0].uri.split('/').pop();
      setCapturedImage(result.assets[0].uri);
      setImagename(fileName);
    }
  };
  return (
    <Background>
      <View style={styles(colors).container}>
        <Text style={styles(colors).titleText}>
          Upload a photo of your reciept
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            height: '88%',
          }}>
          <View style={{justifyContent: 'space-between', height: '80%'}}>
            <View>
              <TouchableOpacity onPress={pickImage}>
                <View style={styles(colors).choose}>
                  <Icon name="image" color={colors.text} size={30} />
                  <Text style={styles(colors).chooseTxt}>Choose a reciept</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles(colors).or}>OR</Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('CameraScreen');
                }}>
                <View style={styles(colors).camera}>
                  <Icon name="camera" color={colors.themeColor} size={20} />
                  <Text style={styles(colors).cmTxt}>
                    Open camera and take photo
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {capturedImage && (
              <View style={styles(colors).preview}>
                <TouchableOpacity
                  onPress={() => {
                    setCapturedImage(null);
                    setImagename(null);
                  }}>
                  <Icon name="ban" color={'#adadad'} size={30} />
                </TouchableOpacity>
                <Image
                  source={{uri: capturedImage}}
                  style={styles(colors).previewImage}
                />
                <TouchableOpacity
                  onPress={async () => {
                    setCapturedImages([...capturedImages, capturedImage]);
                    setCapturedImage(null);
                    setImageNames([...imageNames, imageName]);
                    setImagename(null);
                    const payload = {
                      key: 'image',
                      value: capturedImage,
                    };
                    try {
                      const response = await axios.post(
                        'http://localhost:8085/api/v1/images',
                        payload,
                      );
                      if (response.status === 201)
                        console.log('Image sent successfully');
                      else console.log('Error sending image');
                    } catch (error) {
                      console.log(error);
                    }
                  }}>
                  <Icon name="check" color={'#adadad'} size={30} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        {capturedImages.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Reciepts', {
                capturedImages: capturedImages,
                imageNames: imageNames,
              });
            }}>
            <Text style={styles(colors).showTxt}>Show all reciepts</Text>
          </TouchableOpacity>
        )}
      </View>
    </Background>
  );
}

const styles = colors =>
  StyleSheet.create({
    container: {
      marginTop: 30,
      marginBottom: 180,
    },
    titleText: {
      color: colors.text,
      fontWeight: '700',
      fontSize: 20,
      marginTop: 20,
      marginBottom: 50,
      marginLeft: 40,
    },
    choose: {
      height: 150,
      width: 320,
      borderRadius: 10,
      backgroundColor: 'rgba(255,255,255,0.4)',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      borderWidth: 2,
      borderColor: colors.text,
    },
    chooseTxt: {
      color: colors.text,
      fontWeight: '700',
      fontSize: 20,
      marginTop: 10,
    },
    or: {
      color: colors.text,
      fontWeight: '700',
      fontSize: 20,
      marginVertical: 20,
      alignSelf: 'center',
    },
    camera: {
      height: 70,
      width: 320,
      borderRadius: 10,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'center',
      flexDirection: 'row',
      paddingHorizontal: 25,
    },
    cmTxt: {
      color: colors.themeColor,
      fontWeight: '700',
      fontSize: 18,
    },
    showTxt: {
      color: colors.text,
      fontWeight: '500',
      fontSize: 20,
      marginLeft: 40,
    },

    preview: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },

    previewImage: {
      height: 100,
      width: 100,
      marginHorizontal: 16,
    },
  });
export default Scan;
