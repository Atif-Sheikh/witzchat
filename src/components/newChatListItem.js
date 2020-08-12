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

const NewChatListItem = ({imageUrl, name, onPress}) => {
  return (
    <ListItem
      avatar
      style={{
        marginLeft: 0,
        borderBottomColor: 'red',
      }}
      onPress={onPress}
      witzlistItem>
      <Left>
        <Thumbnail
          source={{
            uri: imageUrl,
          }}
        />
      </Left>
      <Body
        style={{
          height: 80,
        }}>
        <Text heading>{name}</Text>
      </Body>
    </ListItem>
  );
};

export default NewChatListItem;
