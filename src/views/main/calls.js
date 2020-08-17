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
import CallListItem from '../../components/callListItem';
import ToggleButtons from '../../components/toggleButtons';

import colors from '../../constants/colors';

class Calls extends React.Component {
  state = {
    chats: [
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr Anita T.',
        time: '12:55pm',
        callType: 'Outgoing',
      },
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr Anita T.',
        time: '08:32am',
        callType: 'Outgoing',
      },
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr Clarence W.',
        time: '08:32am',
        callType: 'Outgoing',
      },
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr Emily C.',
        time: '20/7/2020',
        callType: 'Incoming',
      },
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr Gwen K.',
        time: '19/7/2020',
        callType: 'Missed',
      },
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr Lincoln P.',
        time: '19/7/2020',
        callType: 'Missed',
      },
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr Emily C.',
        time: '17/7/2020',
        callType: 'Incoming',
      },
      {
        imageUrl:
          'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
        name: 'Dr Gwen K.',
        time: '12/7/2020',
        callType: 'Incoming',
      },
    ],
    callType: 'all',
  };
  render() {
    const {chats} = this.state;
    return (
      <Container>
        <Header transparent androidStatusBarColor={'transparent'}>
          <Left>
            <Button transparent style={{width: 80, paddingLeft: 0}}>
              <Text style={{color: colors.primary}}>Edit</Text>
            </Button>
          </Left>
          <Body>
            <ToggleButtons
              options={['all', 'missed']}
              value={this.state.callType}
              onPress={(value) => this.setState({callType: value})}
              activeColor={colors.white}
              activeTextColor={colors.grey}
            />
          </Body>
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: 10,
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
                }}
                heading>
                Calls
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
              <CallListItem key={index} {...item} />
            ))}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default Calls;
