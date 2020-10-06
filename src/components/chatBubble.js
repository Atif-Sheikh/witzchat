/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text, Icon} from 'native-base';
import {ImageItem} from '../components/ImageItem';
import FileViewer from 'react-native-file-viewer';

import colors from '../constants/colors';
import AudioPlayer from './audioPlayer';

const _isImage = (type) => {
  return type.match(/^image\/.+$/);
};

const renderMessage = (message, sentByUser) => {
  console.log(message, '>>>');
  const openFile = () => {
    FileViewer.open(message.url.replace('http://', 'https://'))
      .then(() => {
        // success
      })
      .catch((error) => {
        // error
      });
  };
  if (message.type.includes('audio')) {
    return <AudioPlayer message={message} />;
  } else if (message.isUserMessage()) {
    return <Text>{message.message}</Text>;
  } else if (_isImage(message.type)) {
    return (
      <ImageItem
        isUser={sentByUser}
        message={message.url.replace('http://', 'https://')}
      />
    );
  } else if (message.isFileMessage()) {
    return (
      <TouchableOpacity
        onPress={openFile}
        style={{flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10}}>
        <Icon
          containerStyle={{marginLeft: 0}}
          iconStyle={{margin: 0, padding: 0}}
          name="download"
          type="FontAwesome"
          color={sentByUser ? '#fff' : '#000'}
          size={16}
        />
        <Text style={{marginLeft: 20}}>
          {message.name.length > 13
            ? message.name.substring(0, 10) + '...'
            : message.name}
        </Text>
      </TouchableOpacity>
    );
  }
};

const ChatBubble = ({
  message,
  time,
  sentByUser,
  showDoubleTick,
  showSingleTick,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 5,
      }}>
      {sentByUser ? <View style={{flex: 0.2}} /> : null}
      <View
        style={{
          backgroundColor: sentByUser ? colors.userChatBubble : colors.white,
          flex: 0.8,
          padding: 10,
          borderRadius: 10,
        }}>
        {renderMessage(message, sentByUser)}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>
          <Text note style={{marginRight: 5}}>
            {time}
          </Text>
          {showDoubleTick ? (
            <Icon name="check-double" type="FontAwesome5" primary small />
          ) : showSingleTick ? (
            <Icon name="check" type="FontAwesome5" primary small />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default ChatBubble;
