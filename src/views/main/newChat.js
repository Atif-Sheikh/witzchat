import React from 'react';
import { ScrollView, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
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
  Toast
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { createGroupChannel } from '../../actions';

import ParseApi from '../../utils/parse';

import SearchInput from '../../components/searchInput';
import { NewChatListItem, ThumbnailWithSelectIcon } from '../../components/newChatListItem';
import * as axios from 'axios';

import colors from '../../constants/colors';

import { APP_ID, API_TOKEN } from '../../sendbirdActions/user';

class NewChat extends React.Component {
  state = {
    users: [],
    userType: 'client',
    isLoading: true,
    userData: null,
    activeTab: 'client',
    title: '',
    groupChat: false,
    defaultImage: 'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
    search: ''
  };
  async componentDidMount() {
    const { activeTab } = this.props.route.params;
    const userType = await AsyncStorage.getItem('@witzchatUserType');
    const userData = await AsyncStorage.getItem('@witzUser');
    if (userData) {
      const user = JSON.parse(userData);
      if (user) {
        this.setState({ userType, userData: user, activeTab }, () => {
          this.getUsers();
        });
      }
    }
  }


  getUsers = () => {
    const model =
      this.state.activeTab === 'client'
        ? ParseApi.User
        : ParseApi.Object.extend('CareTeamMember');
    const query = new ParseApi.Query(model);
    query.notEqualTo('username', this.state.userData.username);
    query.find().then(
      (data) => {
        const users = data
          .map((item) => {
            const userData = JSON.parse(JSON.stringify(item));
            console.log(userData);
            return {
              userId: userData.objectId,
              name: userData.firstName,
              email: userData.email,
              username: userData.username,
              selected: false,
            };
          })
        this.setState({
          users,
        });
      },
      (error) => {
        console.error('Error while fetching users', error);
      },
    );
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  createUserOnSendBird = async (user) => {

    const usersApiUrl = `https://api-${APP_ID}.sendbird.com/v3/users`;
    let alreadyExist = true;
    try {
      const res = await axios.request(
        {
          method: 'get',
          url: `${usersApiUrl}/${user.userId}`,
          headers: { 'Api-Token': API_TOKEN }
        })
      alreadyExist = res && res.data;

    } catch (err) {
      if (
        err && err.response && err.response.data &&
        err.response.data.code && err.response.data.code === 400201) {
        alreadyExist = false;
      }
    }
    if (!alreadyExist) {
      try {
        await axios.request(
          {
            method: 'post',
            url: usersApiUrl,
            data: {
              user_id: user.userId,
              nickname: user.username,
              profile_url: "https://i.stack.imgur.com/l60Hf.png"
            },
            headers: { 'Api-Token': API_TOKEN }
          })
      } catch (err) {
        console.log(err);
      }
    }
  }

  createChannel = async (guest) => {
    await this.createUserOnSendBird(guest);

    const userIds = [guest.userId];
    const { userData } = this.state;
    userIds.push(userData.objectId);
    console.log(userIds);
    await this.props.createGroupChannel(userIds, true, this.state.activeTab, guest.username);
    const { channel } = this.props;
    const data = {
      channelUrl: channel.url,
      title: this.getChannelName(channel),
      // memberCount: channel.memberCount,
      isOpenChannel: channel.isOpenChannel(),
      // _initListState: this._initJoinState,
    };
    this.props.navigation.navigate('ChatScreen', data);
  };
  _initJoinState = () => {
    console.log('joined');
  };

  getChannelName = (item) => {
    const { userType } = this.state;
    if(item.name && item.name.length){
      return item.name;
    }
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

  selectUser = (item) => {
    if (this.state.groupChat) {
      const users = this.state.users.map(user => ({ ...user, selected: item.userId === user.userId ? !user.selected : user.selected }));
      this.setState({ users });
    } else {
      this.createChannel(item);
    }
  }

  redirectToNewChatScreen = () => {
    const { users, activeTab } = this.state;
    const selectedUsers = users.filter(user => user.selected);
    if (selectedUsers && selectedUsers.length >= 1) {
      this.props.navigation.navigate('NewChatGroup', {
        users: selectedUsers,
        activeTab
      });
    } else {
      Toast.show({ text: 'Select at least two users for group chat', buttonText: 'Okay', type: 'warning' });
    }
  }

  render() {
    const { users, groupChat, defaultImage, search } = this.state;
    const selectedUsers = users.filter(user => user.selected);
    const filteredUsers = users.filter(user => search && search.trim().length && user.name ? user.name.toLowerCase().indexOf(search.trim().toLowerCase()) >= 0 : true);
    return (
      <View
        style={{
          backgroundColor: colors.lightGrey,
          flex: 1,
        }}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            marginTop: 80,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            paddingTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Left>
              <Button transparent onPress={this.goBack}>
                <Text>Cancel</Text>
              </Button>
            </Left>
            <Body>
              <H3 heading>{groupChat ? 'New Group Chat' : 'New Chat'}</H3>
            </Body>
            <Right>
              <Button transparent onPress={this.redirectToNewChatScreen}>
                <Text>Next</Text>
              </Button>
            </Right>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <SearchInput value={search} onChangeText={(value) => this.setState({ search: value })} />
            <ScrollView
              style={{
                paddingVertical: 10,
              }}>
              {groupChat ?
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {selectedUsers.map(user => <TouchableOpacity onPress={() => this.selectUser(user)}
                    style={{ paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <ThumbnailWithSelectIcon imageUrl={defaultImage} showIcon={true} selected={false} />
                    <Text>{user.name && user.name.length > 10 ? `${user.name.substring(0, 7)}...` : user.name}</Text>
                  </TouchableOpacity>)}
                </View> :
                <ListItem
                  avatar
                  style={{
                    marginLeft: 0,
                    borderBottomColor: 'red',
                  }}
                  witzlistItem
                  onPress={() => this.setState({ groupChat: true })}>
                  <Left>
                    <View style={{
                      backgroundColor: colors.primary,
                      padding: 10,
                      borderRadius: 100,
                      height: 55,
                      width: 55,
                      justifyContent: 'center'

                    }}>
                      <Icon name="users" type="FontAwesome5" style={{
                        color: colors.white,
                        textAlign: 'center'
                      }} />
                    </View>
                  </Left>
                  <Body
                    style={{
                      height: 80,
                      justifyContent: 'center'
                    }}>
                    <Text heading>New Group</Text>
                  </Body>
                </ListItem>}
              {filteredUsers.map((item, index) => (
                <NewChatListItem
                  key={index}
                  imageUrl={defaultImage}
                  name={item.name ? item.name : item.username}
                  onPress={() => this.selectUser(item)}
                  showIcon={groupChat && item.selected}
                  selected={groupChat && item.selected}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps({ groupChannelInvite }) {
  return { channel: groupChannelInvite.channel };
}

export default connect(mapStateToProps, { createGroupChannel })(NewChat);

const styles = StyleSheet.create({});
