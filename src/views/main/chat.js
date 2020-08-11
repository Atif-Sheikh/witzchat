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
// import SendBird from 'sendbird';

import ChatBubble from '../../components/chatBubble';

import colors from '../../constants/colors';

// var sb = null;
// var groupChannel = null;

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

  componentDidMount = () => {
    // sb = new SendBird({appId: '99ABD847-487B-424F-8C68-9D92B082B695'});
    // var userIds = ['Atif-client', 'Atif-provider'];
    // // When 'distinct' is false
    // sb.GroupChannel.createChannelWithUserIds(userIds, false, (gc, error) => {
    //   if (error) {
    //     return;
    //   }
    //   groupChannel = gc;
    //   console.log(gc);
    //   this.createChannelHandler();
    //   this.getPreviousMessages();
    // });
  };

  componentWillUnmount = () => {
    // sb.removeChannelHandler(groupChannel.url);
  };

  getPreviousMessages = () => {
    // There should only be one single instance per channel view.
    // var prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
    // // prevMessageListQuery.limit = 100;
    // // prevMessageListQuery.reverse = true;
    // // prevMessageListQuery.includeMetaArray = true; // Retrieve a list of messages along with their metaarrays.
    // // prevMessageListQuery.includeReaction = true; // Retrieve a list of messages along with their reactions.

    // // Retrieving previous messages.
    // prevMessageListQuery.load(function (messages, error) {
    //   if (error) {
    //     return;
    //   }

    //   console.log(messages);
    // });
  };

  createChannelHandler = () => {
    // var ChannelHandler = new sb.ChannelHandler();
    // ChannelHandler.onMessageReceived = (channel, message) => {
    //   console.log('onMessageReceived');
    //   console.log(channel, message);
    // };
    // sb.addChannelHandler(groupChannel.url, ChannelHandler);
  };

  sendMessage = () => {
    // const params = new sb.UserMessageParams();

    // params.message = 'Testing';
    // params.pushNotificationDeliveryOption = 'default'; // Either 'default' or 'suppress'
    // params.mentionType = 'channel';
    // params.mentionedUserIds = groupChannel.members.map(
    //   (member) => member.userId,
    // );

    // console.log("SENDING MESSAGE ", params)
    // groupChannel.sendUserMessage(params, function (message, error) {
    //   if (error) {
    //     return;
    //   }

    //   console.log(message);
    // });
  };
  render() {
    const {messages} = this.state;
    return (
      <Container>
        <Header transparent androidStatusBarColor={colors.white}>
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
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <Title heading style={{marginLeft: 10}}>
                Dr Anita T.
              </Title>
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
            <Text style={{alignSelf: 'center'}} dark>
              Tue, 14 Jul
            </Text>
            {messages.map((item, index) => (
              <ChatBubble {...item} key={index} />
            ))}
            <Button onPress={this.sendMessage}>
              <Text>Testing</Text>
            </Button>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default Chat;
