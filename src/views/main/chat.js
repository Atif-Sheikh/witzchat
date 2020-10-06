/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, Alert, Platform, PermissionsAndroid} from 'react-native';
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
  Input,
  Text,
} from 'native-base';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Permissions, {PERMISSIONS, RESULTS} from 'react-native-permissions';
import DocumentPicker from 'react-native-document-picker';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

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
import {ImageItem} from '../../components/ImageItem';

import colors from '../../constants/colors';

class Chat extends React.Component {
  state = {
    channel: null,
    isLoading: false,
    previousMessageListQuery: null,
    textMessage: '',

    startAudio: false,
    hasPermission: false,
    audioPath: `${
      AudioUtils.DocumentDirectoryPath
    }/${this.messageIdGenerator()}test.aac`,
    playAudio: false,
    fetchChats: false,
    audioSettings: {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      MeteringEnabled: true,
      IncludeBase64: true,
      AudioEncodingBitRate: 32000,
    },
  };
  goBack = () => {
    this.props.navigation.navigate('Chats');
  };

  componentDidMount = () => {
    this._init();
    this.checkAudioPermissions();
  };

  messageIdGenerator() {
    // generates uuid.
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  checkAudioPermissions = () => {
    this.checkPermission().then(async (hasPermission) => {
      this.setState({hasPermission});
      if (!hasPermission) {
        return;
      }
      await AudioRecorder.prepareRecordingAtPath(
        this.state.audioPath,
        this.state.audioSettings,
      );
      AudioRecorder.onProgress = (data) => {
        console.log(data, 'onProgress data');
      };
      AudioRecorder.onFinished = (data) => {
        console.log(data, 'on finish');
      };
    });
  };

  checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }
    const rationale = {
      title: 'Microphone Permission',
      message:
        'WitzChat needs access to your microphone so you can record audio.',
    };
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      rationale,
    ).then((result) => {
      console.log('Permission result:', result);
      return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    });
  }

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
    // const isFile = item.isFileMessage();
    // if (isFile) console.log(item);
    // return isFile ? (
    //   <ImageItem
    //     isUser={item.isUser}
    //     message={item.url.replace('http://', 'https://')}
    //   />
    // ) : (
    return (
      <ChatBubble
        key={item.messageId ? item.messageId : item.reqId}
        message={item}
        time={item.time}
        sentByUser={item.isUser}
        showDoubleTick={item.isUser ? !channel.getReadReceipt(item) : 0}
        showSingleTick={item.isUser}
      />
    );
    // );
  };

  _onTextMessageChanged = (textMessage) => {
    this.setState({textMessage});
  };

  onAudioPress = async () => {
    try {
      const {channelUrl, isOpenChannel} = this.props.route.params;

      if (!this.state.startAudio) {
        this.setState({
          startAudio: true,
        });
        await AudioRecorder.startRecording();
      } else {
        this.setState({startAudio: false});
        await AudioRecorder.stopRecording();
        const {audioPath} = this.state;
        const fileName = `${this.messageIdGenerator()}.aac`;
        const file = {
          uri: Platform.OS === 'ios' ? audioPath : `file://${audioPath}`,
          name: fileName,
          type: 'audio/aac',
        };

        this.props.onFileButtonPress(channelUrl, isOpenChannel, file);
      }
    } catch (err) {
      console.log(err);
    }
  };

  _onPhotoAddPress = () => {
    const {channelUrl, isOpenChannel} = this.props.route.params;
    Permissions.check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ).then((response) => {
      if (response === RESULTS.GRANTED) {
        ImagePicker.showImagePicker(
          {
            title: 'Select Image File To Send',
            mediaType: 'photo',
            noData: true,
          },
          (response) => {
            if (!response.didCancel && !response.error) {
              let source = {uri: response.uri};
              if (response.fileName) {
                source.name = response.fileName;
              } else {
                let paths = response.uri.split('/');
                source.name = paths[paths.length - 1];
              }
              if (response.type) {
                source.type = response.type;
              } else {
                /** For react-native-image-picker library doesn't return type in iOS,
                 *  it is necessary to force the type to be an image/jpeg (or whatever you're intended to be).
                 */
                if (Platform.OS === 'ios') {
                  source.type = 'image/jpeg';
                }
              }
              this.props.onFileButtonPress(channelUrl, isOpenChannel, source);
            }
          },
        );
      } else if (response === RESULTS.DENIED) {
        Permissions.request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ).then((response) => {
          this._onPhotoAddPress();
        });
      } else {
        Alert.alert(
          'Permission denied',
          'You declined the permission to access to your photo.',
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
      }
    });
  };

  _onDocumentAddPress = () => {
    const {channelUrl, isOpenChannel} = this.props.route.params;
    Permissions.check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ).then(async (response) => {
      if (response === RESULTS.GRANTED) {
        try {
          const response = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
          });
          let source = {uri: response.uri};
          if (response.name) {
            source.name = response.name;
          }
          if (response.type) {
            source.type = response.type;
          }
          this.props.onFileButtonPress(channelUrl, isOpenChannel, source);
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            Alert.alert(
              'Permission denied',
              'You declined the permission to access to your photo.',
              [{text: 'OK'}],
              {
                cancelable: false,
              },
            );
          } else {
            throw err;
          }
        }
      } else if (response === RESULTS.DENIED) {
        Permissions.request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ).then((response) => {
          this._onDocumentAddPress();
        });
      } else {
        Alert.alert(
          'Permission denied',
          'You declined the permission to access to your photo.',
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
      }
    });
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
            <Button transparent onPress={this._onDocumentAddPress}>
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
            <Button transparent onPress={this._onPhotoAddPress}>
              <Icon name="camera" type="FontAwesome5" />
            </Button>
            <Button transparent onPress={this.onAudioPress}>
              <Icon
                style={this.state.startAudio ? {color: 'red'} : {}}
                name="microphone"
                type="FontAwesome5"
              />
            </Button>
            <Button transparent onPress={this._onSendButtonPress}>
              <Icon name="send" type="FontAwesome" />
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

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
