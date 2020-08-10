import React from 'react';
import {ScrollView, View} from 'react-native';

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
  };

  componentDidMount() {
    this.props.initGroupChannel();
    this.props.createGroupChannelListHandler();
    this._getGroupChannelList(true);
  }

  _getGroupChannelList = init => {
    this.props.groupChannelProgress(true);
    if (init) {
      const groupChannelListQuery = sbCreateGroupChannelListQuery();
      this.setState({ groupChannelListQuery }, () => {
        this.props.getGroupChannelList(this.state.groupChannelListQuery);
      });
    } else {
      this.props.getGroupChannelList(this.state.groupChannelListQuery);
    }
  };


  render() {
    const {chats} = this.state;
    console.log(this.props.list);
    return (
      <View style={{backgroundColor: colors.white}}>
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
      </View>
    );
  }
}

function mapStateToProps({ groupChannel }) {
  const { isLoading, list, channel } = groupChannel;
  return { isLoading, list, channel };
}

export default connect(
  mapStateToProps,
  {
    initGroupChannel,
    groupChannelProgress,
    getGroupChannelList,
    onGroupChannelPress,
    onLeaveChannelPress,
    onHideChannelPress,
    clearSelectedGroupChannel,
    createGroupChannelListHandler
  }
)(ClientScreen);
