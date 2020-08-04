import React from 'react';
import {ScrollView} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Thumbnail,
  View,
  Content,
  Text,
} from 'native-base';

import ChatBubble from '../../components/chatBubble';

import colors from '../../constants/colors';

class Chat extends React.Component {
  state = {
    messages: [
      {
        msg: 'Good morning Mr Tan! How are you feeling today?',
        time: '10:39am',
      },
      {
        msg: 'Morning Dr T, I’m doing fine thank you!',
        time: '10:41am',
        sentByUser: true,
        showDoubleTick: true,
        showSingleTick: true,
      },
      {
        msg:
          'That’s great to hear! In that case, we will continue with scheduled appointment which will be happening this afternoon 3pm.',
        time: '10:45am',
      },
      {
        msg:
          'Please remember to bring your documents along with your identity card ',
        time: '10:47am',
      },
      {
        msg: 'Okay noted! Have already prepared them all in my bag.',
        time: '12:55pm',
        sentByUser: true,
        showDoubleTick: true,
        showSingleTick: true,
      },
      {
        msg: 'May I check if my blood test results are back?',
        time: '12:55pm',
        sentByUser: true,
        showDoubleTick: true,
        showSingleTick: true,
      },
      {
        msg:
          'Your blood test results will take about 1 week for it to be sent back, after which we can arrange for another appt for a review.',
        time: '12:58am',
      },
      {
        msg: 'I see, great! Thanks for the heads up Dr T!',
        time: '01:01am',
        sentByUser: true,
        showDoubleTick: true,
        showSingleTick: true,
      },
    ],
  };
  goBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    const {messages} = this.state;
    return (
      <Container>
        <Header transparent>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name="chevron-left" type="FontAwesome5" primary />
            </Button>
          </Left>
          <Body>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Thumbnail
                source={{
                  uri:
                    'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
                }}
              />
              <Title dark>Dr Anita T.</Title>
            </View>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="video" type="FontAwesome5" primary />
            </Button>
            <Button transparent>
              <Icon name="phone" type="FontAwesome5" primary />
            </Button>
          </Right>
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            backgroundColor: '#ccc',
          }}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}>
            <Text style={{alignSelf: 'center'}}>Tue, 14 Jul</Text>
            {messages.map((item, index) => (
              <ChatBubble {...item} key={index} />
            ))}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default Chat;
