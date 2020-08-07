import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  View,
  Text,
  Left,
  Body,
  Right,
  ListItem,
  Thumbnail,
  Badge,
  Icon,
} from 'native-base';

const ChatListItem = ({
  imageUrl,
  name,
  recentMsg,
  time,
  unreadMsgCount,
  showDoubleTick,
  showSingleTick,
  onPressChat,
}) => {
  return (
    <ListItem
      avatar
      style={{
        marginLeft: 0,
        height: 90,
      }}>
      <Left>
        <Thumbnail
          source={{
            uri: imageUrl,
          }}
        />
      </Left>
      <Body
        style={{
          
        }}>
        <TouchableOpacity onPress={onPressChat}>
          <Text heading>{name}</Text>
          <View style={{flexDirection: 'row'}}>
            {showDoubleTick ? (
              <Icon name="check-double" type="FontAwesome5" primary small />
            ) : showSingleTick ? (
              <Icon name="check" type="FontAwesome5" primary small />
            ) : null}

            <Text gray>
              {recentMsg.length > 20
                ? recentMsg.substring(0, 20) + '...'
                : recentMsg}
            </Text>
          </View>
        </TouchableOpacity>
      </Body>
      <TouchableOpacity onPress={onPressChat}>
        <Right>
          <Text primary={unreadMsgCount > 0} gray={unreadMsgCount === 0}>
            {time}
          </Text>
          {unreadMsgCount ? (
            <Badge primary>
              <Text>{unreadMsgCount}</Text>
            </Badge>
          ) : null}
        </Right>
      </TouchableOpacity>
    </ListItem>
  );
};

export default ChatListItem;
