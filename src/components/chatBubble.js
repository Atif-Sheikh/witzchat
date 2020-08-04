import React from 'react';
import {View, Text, Icon} from 'native-base';
import colors from '../constants/colors';

const ChatBubble = ({
  msg,
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
        <Text>{msg}</Text>
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
