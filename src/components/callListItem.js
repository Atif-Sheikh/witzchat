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

const CallListItem = ({imageUrl, name, callType, time}) => {
  return (
    <ListItem
      avatar
      style={{
        marginLeft: 0,
        borderBottomColor: 'red',
      }} witzlistItem>
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

        <Text gray>{callType}</Text>
      </Body>
      <Right>
        <Text gray>{time}</Text>
      </Right>
    </ListItem>
  );
};

export default CallListItem;
