import React from 'react';
import {ScrollView, View} from 'react-native';
import {Spinner} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
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
import {
  sbCreateGroupChannelListQuery,
  sbUnixTimestampToDate,
  sbGetChannelTitle,
} from '../../sendbirdActions';

import SearchInput from '../../components/searchInput';
import ChatListItem from '../../components/chatListItem';

import colors from '../../constants/colors';

class ClientScreen extends React.Component {
  state = {
    joinChannel: false,
    groupChannelListQuery: null,
    userType: 'client',
    isLoading: true,
  };

  async componentDidMount() {
    const userType = await AsyncStorage.getItem('@witzchatUserType');
    if (userType && userType.length) {
      this.setState({userType, isLoading: false});
    }
    this.props.initGroupChannel();
    this.props.createGroupChannelListHandler();
    this._getGroupChannelList(true);
  }

  _getGroupChannelList = (init) => {
    this.props.groupChannelProgress(true);
    if (init) {
      const groupChannelListQuery = sbCreateGroupChannelListQuery();
      groupChannelListQuery.includeEmpty = true;
      this.setState({groupChannelListQuery}, () => {
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
        memberCount: channel.memberCount,
        isOpenChannel: channel.isOpenChannel(),
        _initListState: this._initJoinState,
      };
      console.log(data);
      this.props.clearSelectedGroupChannel();
      this.props.navigation.navigate('ChatScreen', data);
    }
    // this.props.navigation.navigate('ChatScreen');
  };

  _initJoinState = () => {
    this.setState({joinChannel: false});
  };

  getChannelName = (item) => {
    const {userType} = this.state;
    if (item) {
      if (userType === 'client') {
        return item.inviter.nickname;
      }
      for (const member of item.members) {
        if (member.userId !== item.inviter.userId) {
          return member.nickname;
        }
      }
    }
    return '';
  };

  render() {
    const {isLoading, userType} = this.state;

    return isLoading ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Spinner color={colors.primary} />
      </View>
    ) : (
      <View style={{backgroundColor: colors.white}}>
        <SearchInput />
        <ScrollView
          style={{
            paddingVertical: 10,
          }}>
          {this.props.list.map((item, index) => (
            <ChatListItem
              key={index}
              imageUrl={
                'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4'
              }
              name={this.getChannelName(item)}
              recentMsg={item.lastMessage ? item.lastMessage.message : ''}
              time={'08:09am'}
              unreadMsgCount={0}
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

function mapStateToProps({groupChannel, userInfo, user}) {
  const {isLoading, list, channel} = groupChannel;
  return {isLoading, list, channel, userInfo, user};
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
