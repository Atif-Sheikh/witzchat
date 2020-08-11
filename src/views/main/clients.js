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

  navigateToChat = () => {
    this.props.navigation.navigate('ChatScreen');
  };

  render() {
    const {chats, isLoading, userType} = this.state;

    const getChannelName = (item) => {
      if (item) {
        if (userType === 'client') {
          return item.inviter.nickname;
        }
        for (const member of item.members) {
          if(member.userId !== item.inviter.userId){
            return member.nickname;
          }
        }
      }
      return '';
    };

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
              name={getChannelName(item)}
              recentMsg={item.lastMessage ? item.lastMessage : ''}
              time={'08:09am'}
              unreadMsgCount={0}
              showDoubleTick={false}
              showSingleTick={false}
              onPressChat={this.navigateToChat}
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
