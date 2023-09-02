import React from 'react';
import {View, Text, ImageBackground} from 'react-native';

const ShowImage = props => {
  return (
    <View>
      <ImageBackground
        source={{uri: props.route.params.image}}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  );
};

export default ShowImage;
