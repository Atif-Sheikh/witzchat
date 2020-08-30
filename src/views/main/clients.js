import React from 'react';
import { ScrollView, View } from 'react-native';
import { Spinner } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import { connect } from 'react-redux';
import {
  initGroupChannel,
  groupChannelProgress,
  getGroupChannelList,
  onGroupChannelPress,
  onLeaveChannelPress,
  onHideChannelPress,
  clearSelectedGroupChannel,
  createGroupChannelListHandler,
  createGroupChannel,
} from '../../actions';
import { sbCreateGroupChannelListQuery } from '../../sendbirdActions';

import SearchInput from '../../components/searchInput';
import ChatListItem from '../../components/chatListItem';

import colors from '../../constants/colors';

class ClientScreen extends React.Component {
  state = {
    joinChannel: false,
    groupChannelListQuery: null,
    userType: 'client',
    isLoading: true,
    userData: null,
  };

  async componentDidMount() {
    const userType = await AsyncStorage.getItem('@witzchatUserType');
    const userData = await AsyncStorage.getItem('@witzUser');
    if (userType && userType.length && userData) {
      this.setState({
        userType,
        isLoading: false,
        userData: JSON.parse(userData),
      }, () => {
        if (this.props.route.name === 'Client') {
          this._initGroupChannelList();
        }
        this.focus = this.props.navigation.addListener('focus', () => {
          this._initGroupChannelList();
        });
      });
    }
  }

  componentWillUnmount() {
    if (this.focus) this.focus();
  }

  _initGroupChannelList = () => {
    this.props.initGroupChannel();
    this.props.createGroupChannelListHandler();
    this._getGroupChannelList(true);
  };

  _getGroupChannelList = (init) => {
    this.props.groupChannelProgress(true);
    if (init) {
      const groupChannelListQuery = sbCreateGroupChannelListQuery();
      groupChannelListQuery.includeEmpty = true;
      groupChannelListQuery.customTypesFilter =
        this.props.route.name === 'Client' ? ['client'] : ['provider'];
      this.setState({ groupChannelListQuery }, () => {
        this.props.getGroupChannelList(this.state.groupChannelListQuery);
      });
    } else {
      this.props.getGroupChannelList(this.state.groupChannelListQuery);
    }
  };

  navigateToChat = (channel) => {
    if (channel) {
      const data = {
        channelUrl: channel.url,
        title: this.getChannelName(channel),
        // memberCount: channel.memberCount,
        isOpenChannel: channel.isOpenChannel(),
        // _initListState: this._initJoinState,
      };
      console.log(
        'Members : ',
        channel.members.map((item) => item.nickname),
      );
      console.log('Channel Type : ', channel.customType)
      this.props.clearSelectedGroupChannel();
      this.props.navigation.navigate('ChatScreen', data);
    }
  };

  _initJoinState = () => {
    this.setState({ joinChannel: false });
  };

  getChannelName = (item) => {
    const { userData } = this.state;
    if (item) {
      for (const member of item.members) {
        if (member.userId !== userData.objectId) {
          return member.nickname;
        }
      }
    }
    return '';
  };

  render() {
    const { isLoading, userType } = this.state;
    return isLoading ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Spinner color={colors.primary} />
      </View>
    ) : (
        <View style={{ backgroundColor: colors.white }}>
          <SearchInput />
          <ScrollView
            style={{
              paddingVertical: 10,
            }}
            contentContainerStyle={{
              paddingBottom: 50,
            }}>
            {this.props.list.map((item, index) => (
              <ChatListItem
                key={index}
                imageUrl={item.coverUrl}
                name={this.getChannelName(item)}
                recentMsg={item.lastMessage ? item.lastMessage.message : ''}
                time={
                  item.lastMessage
                    ? moment(
                      new Date(item.lastMessage.createdAt).toLocaleTimeString(),
                      'HH:mm:ss',
                    ).format('hh:mm A')
                    : ''
                }
                unreadMsgCount={item.unreadMessageCount}
                showDoubleTick={false}
                showSingleTick={false}
                onPressChat={() => this.navigateToChat(item)}
              />
            ))}
          </ScrollView>
        </View>
      );
  }
}

function mapStateToProps({ groupChannel, userInfo, user }) {
  const { isLoading, list, channel } = groupChannel;
  return { isLoading, list, channel, userInfo, user };
}

export default connect(mapStateToProps, {
  initGroupChannel,
  groupChannelProgress,
  getGroupChannelList,
  onGroupChannelPress,
  onLeaveChannelPress,
  onHideChannelPress,
  clearSelectedGroupChannel,
  createGroupChannelListHandler,
  createGroupChannel,
})(ClientScreen);
