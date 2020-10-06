/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Alert} from 'react-native';
import Sound from 'react-native-sound';
import {Icon} from 'native-base';
import {TouchableOpacity} from 'react-native';

const AudioPlayer = ({message}) => {
  const [playAudio, setPlayAudio] = useState(false);
  return (
    <TouchableOpacity>
      <Icon
        containerStyle={{marginLeft: 0}}
        iconStyle={{margin: 0, padding: 0}}
        type="FontAwesome"
        size={16}
        color={playAudio ? 'red' : 'grey'}
        name="play"
        style={{
          left: 90,
          position: 'relative',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.5,
          backgroundColor: 'transparent',
        }}
        onPress={() => {
          try {
            setPlayAudio(true);
            const sound = new Sound(message.name, '', (error) => {
              if (error) {
                console.log('failed to load the sound', error);
              }
              setPlayAudio(false);
              sound.play((success) => {
                console.log(success, 'success play');
                if (!success) {
                  Alert.alert('There was an error playing this audio');
                }
              });
            });
          } catch (err) {
            Alert.alert(err);
          }
        }}
      />
    </TouchableOpacity>
  );
};

export default AudioPlayer;
