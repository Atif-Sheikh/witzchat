import React from 'react';
import { TouchableOpacity } from 'react-native';
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
import colors from '../constants/colors';

export const ThumbnailWithSelectIcon = ({ imageUrl, showIcon, selected }) =>
  <View>
    <Thumbnail
      source={{
        uri: imageUrl,
      }}
    />
    {showIcon ?
      <View style={{
        position: 'absolute',
        right: -5,
        bottom: 0,
        backgroundColor: selected ? colors.primary : colors.grey,
        borderRadius: 100,
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Icon name={selected ? "check" : "close"} type="FontAwesome" style={{
          fontSize: 20,
          color: colors.white,
        }} />
      </View>
      : null
    }
  </View>;

export const NewChatListItem = ({ imageUrl, name, onPress, showIcon, selected }) => {
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
        <ThumbnailWithSelectIcon imageUrl={imageUrl} showIcon={showIcon} selected={selected} />
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


