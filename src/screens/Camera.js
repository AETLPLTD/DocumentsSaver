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
import {Camera} from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';

function CameraScreen(props) {
  const [camera, setCamera] = useState(null);
  const colors = useTheme().colors;
  const handleCaptureImage = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      const fileName = data.uri.split('/').pop();
      props.navigation.navigate('Scan', {
        capturedImage: data.uri,
        imageName: fileName,
      });
    }
  };
  return (
    <Background>
      <View style={styles(colors).container}>
        <View style={styles(colors).cameraViewContainer}>
          <Camera style={styles(colors).cameraView} ref={ref => setCamera(ref)}>
            <View style={styles(colors).captureBtn}>
              <Pressable
                onPress={() => {
                  handleCaptureImage();
                }}>
                <Icon name="circle" color={'white'} size={60} />
              </Pressable>
            </View>
          </Camera>
        </View>
      </View>
    </Background>
  );
}

const styles = colors =>
  StyleSheet.create({
    container: {
      marginTop: 50,
      marginBottom: 80,
    },
    cameraViewContainer: {
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: 20,
    },

    cameraView: {
      height: '100%',
      width: 340,
    },

    captureBtn: {
      position: 'absolute',
      bottom: 20,
      right: 150,
    },

    flashGalleryContainer: {
      height: 50,
      width: 350,
      bottom: 0,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },

    flashButton: {marginLeft: '15%'},
    buttonContainer: {
      flex: 3,
      alignItems: 'center',
      marginVertical: 32,
    },
    torchContainer: {
      alignItems: 'center',
    },
    button: {
      marginVertical: 16,
    },

    cameraTxt: {
      color:
        colors.themeColor === '#FFFFFF'
          ? colors.secondary
          : 'rgba(255,255,255,0.7)',
      fontWeight: '700',
      fontSize: 18,
      marginTop: 20,
    },

    galleryTxt: {
      color: '#F8D20A',
      fontWeight: '600',
      fontSize: 20,
      marginTop: 20,
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

    imgList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 20,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      width: '80%',
      height: '80%',
      alignItems: 'center',
      shadowColor: '#000',
    },
  });
export default CameraScreen;
