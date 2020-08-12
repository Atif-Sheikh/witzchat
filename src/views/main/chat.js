import React from 'react';
import {ScrollView, FlatList} from 'react-native';
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
  Input,
  Item,
  Label,
} from 'native-base';
// import SendBird from 'sendbird';
import {connect} from 'react-redux';
import {
  openChannelProgress,
  groupChannelProgress,
  initChatScreen,
  getChannelTitle,
  createChatHandler,
  onSendButtonPress,
  getPrevMessageList,
  onUserBlockPress,
  onMessageDelete,
  onFileButtonPress,
  typingStart,
  onUserMessageCopy,
  onUserUpdateMessage,
  clearMessageSelection,
  typingEnd,
  channelExit,
} from '../../actions';
import {
  sbGetGroupChannel,
  sbGetOpenChannel,
  sbCreatePreviousMessageListQuery,
  sbAdjustMessageList,
  sbMarkAsRead,
} from '../../sendbirdActions';

import ChatBubble from '../../components/chatBubble';

import colors from '../../constants/colors';

// var sb = null;
// var groupChannel = null;

class Chat extends React.Component {
  state = {
    channel: null,
    isLoading: false,
    previousMessageListQuery: null,
    textMessage: '',
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
    this._init();
  };

  _init = () => {
    this.props.initChatScreen();
    const {channelUrl, isOpenChannel} = this.props.route.params;
    console.log(channelUrl, isOpenChannel);
    if (isOpenChannel) {
      sbGetOpenChannel(channelUrl).then((channel) =>
        this.setState({channel}, () => this._componentInit()),
      );
    } else {
      sbGetGroupChannel(channelUrl).then((channel) =>
        this.setState({channel}, () => this._componentInit()),
      );
    }
  };

  _componentInit = () => {
    const {channelUrl, isOpenChannel} = this.props.route.params;
    this.props.openChannelProgress(false);
    this.props.groupChannelProgress(false);
    this.props.getChannelTitle(channelUrl, isOpenChannel);
    this.props.createChatHandler(channelUrl, isOpenChannel);
    this._getMessageList(true);
    if (!isOpenChannel) {
      sbMarkAsRead({channelUrl});
    }
  };

  _getMessageList = (init) => {
    if (!this.state.previousMessageListQuery && !init) {
      return;
    }
    const {channelUrl, isOpenChannel} = this.props.route.params;
    this.setState({isLoading: true}, () => {
      if (init) {
        sbCreatePreviousMessageListQuery(channelUrl, isOpenChannel)
          .then((previousMessageListQuery) => {
            this.setState({previousMessageListQuery}, () => {
              this.props.getPrevMessageList(
                this.state.previousMessageListQuery,
              );
            });
          })
          .catch((error) => this.props.navigation.goBack());
      } else {
        this.props.getPrevMessageList(this.state.previousMessageListQuery);
      }
    });
  };

  _onSendButtonPress = () => {
    if (this.state.textMessage) {
      const {channelUrl, isOpenChannel} = this.props.route.params;
      const {textMessage} = this.state;
      this.setState({textMessage: ''}, () => {
        this.props.onSendButtonPress(channelUrl, isOpenChannel, textMessage);
        if (this.props && this.props.list && this.props.list.length > 0) {
          this.flatList.scrollToIndex({
            index: 0,
            viewOffset: 0,
          });
        }
      });
    }
  };

  _renderList = (rowData) => {
    const item = rowData.item;
    const {channel} = this.state;
    if (!channel) {
      return null;
    }
    return (
      <ChatBubble
        key={item.messageId ? item.messageId : item.reqId}
        msg={item.message}
        time={item.time}
        sentByUser={item.isUser}
        showDoubleTick={item.isUser ? !channel.getReadReceipt(item) : 0}
        showSingleTick={item.isUser}
      />
    );
  };

  _onTextMessageChanged = (textMessage) => {
    this.setState({textMessage});
  };

  render() {
    const {title} = this.props.route.params;
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
                {title}
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
        <View
          style={{
            flex: 1,
            backgroundColor: '#ccc',
          }}>
          <View
            style={{
              paddingHorizontal: 20,
              flex: 1,
            }}>
            <FlatList
              inverted={true}
              ref={(elem) => (this.flatList = elem)}
              renderItem={this._renderList}
              data={this.props.list}
              extraData={this.state}
              keyExtractor={(item, index) => item.messageId + ''}
              onEndReached={() => this._getMessageList(false)}
              onEndReachedThreshold={0}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 10,
              backgroundColor: '#e2e2e2',
            }}>
            <Button transparent>
              <Icon name="plus" type="FontAwesome5" />
            </Button>
            <Input
              style={{
                backgroundColor: colors.white,
                borderRadius: 100,
                marginHorizontal: 10,
                height: 40,
                paddingLeft: 20,
              }}
              value={this.state.textMessage}
              onChangeText={this._onTextMessageChanged}
              returnKeyType={'send'}
              blurOnSubmit={false}
              onSubmitEditing={this._onSendButtonPress}
            />
            <Button transparent>
              <Icon name="camera" type="FontAwesome5" />
            </Button>
            <Button transparent>
              <Icon name="microphone" type="FontAwesome5" />
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

// export default Chat;

function mapStateToProps({chat}) {
  let {title, memberCount, list, exit, typing, selectedMessages} = chat;

  list = sbAdjustMessageList(list);
  return {title, memberCount, list, exit, typing, selectedMessages};
}

export default connect(mapStateToProps, {
  openChannelProgress,
  groupChannelProgress,
  initChatScreen,
  getChannelTitle,
  createChatHandler,
  onSendButtonPress,
  getPrevMessageList,
  onUserUpdateMessage,
  onUserBlockPress,
  onFileButtonPress,
  onUserMessageCopy,
  clearMessageSelection,
  typingStart,
  typingEnd,
  onMessageDelete,
  channelExit,
})(Chat);
