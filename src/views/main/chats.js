import React from 'react';
import {ScrollView, Image} from 'react-native';
import {
  View,
  H3,
  Text,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Content,
  Container,
  Header,
  Left,
  Title,
  Body,
  Right,
  ListItem,
  Thumbnail,
  Badge,
} from 'native-base';

import SearchInput from '../../components/searchInput';
import ChatListItem from '../../components/chatListItem';

import colors from '../../constants/colors';

class Chats extends React.Component {
  state = {
    chats: [
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr Anita T.',
        recentMsg: 'Good day sir! Your appointment',
        recentMsgTime: '12:55pm',
        unreadMsgCount: 2,
      },
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr James A.',
        recentMsg: 'Yes.',
        recentMsgTime: '08:32am',
        unreadMsgCount: 0,
      },
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr. Clarence W.',
        recentMsg: 'Would you like to make appointment',
        recentMsgTime: '08:09am',
        unreadMsgCount: 0,
      },
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr. Emily C.',
        recentMsg: 'Thank you Dr Emily!',
        recentMsgTime: 'yesterday',
        unreadMsgCount: 0,
        showDoubleTick: true,
      },
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr Gwen K.',
        recentMsg: 'See you for your next appoitment',
        recentMsgTime: '17/7/2020',
        unreadMsgCount: 0,
        showSingleTick: true,
      },
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr Gwen K.',
        recentMsg: 'See you for your next appoitment',
        recentMsgTime: '17/7/2020',
        unreadMsgCount: 0,
      },
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr Lincoln P.',
        recentMsg: 'That’s great!',
        recentMsgTime: '12/7/2020',
        unreadMsgCount: 0,
      },
    ],
  };
  render() {
    const {chats} = this.state;
    return (
      <Container>
        <Header transparent>
          <Left>
            <Button transparent>
              <Text style={{color: colors.primary}}>Edit</Text>
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: 25,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <H3
                style={{
                  marginBottom: 20,
                }}>
                Chats
              </H3>
            </View>
            <View>
              <Icon name="edit" type="FontAwesome5" primary />
            </View>
          </View>
          <SearchInput />
          <ScrollView
            style={{
              paddingVertical: 10,
            }}>
            {chats.map((item, index) => (
              <ChatListItem
                key={index}
                imageUrl={item.imageUrl}
                name={item.name}
                recentMsg={item.recentMsg}
                time={item.recentMsgTime}
                unreadMsgCount={item.unreadMsgCount}
                showDoubleTick={item.showDoubleTick}
                showSingleTick={item.showSingleTick}
                onPressChat={() => this.props.navigation.navigate('ChatScreen')}
              />
            ))}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default Chats;
