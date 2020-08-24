import React from 'react';
import {ScrollView, Image, StyleSheet, StatusBar} from 'react-native';
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
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {createGroupChannel} from '../../actions';

import ParseApi from '../../utils/parse';

import SearchInput from '../../components/searchInput';
import NewChatListItem from '../../components/newChatListItem';

import colors from '../../constants/colors';

class NewChat extends React.Component {
  state = {
    users: [],
    userType: 'client',
    isLoading: true,
    userData: null,
    activeTab: 'client',
  };
  async componentDidMount() {
    const {activeTab} = this.props.route.params;
    const userType = await AsyncStorage.getItem('@witzchatUserType');
    const userData = await AsyncStorage.getItem('@witzUser');
    if (userData) {
      const user = JSON.parse(userData);
      if (user) {
        this.setState({userType, userData: user, activeTab}, () => {
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

  createChannel = async (userId) => {
    const userIds = [userId];
    const {userData} = this.state;
    userIds.push(userData.objectId);
    console.log(userIds);
    await this.props.createGroupChannel(userIds, true, this.state.activeTab);
    const {channel} = this.props;
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
    const {users} = this.state;
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
            <Left />
            <Body>
              <H3 heading>New Chat</H3>
            </Body>
            <Right>
              <Button transparent onPress={this.goBack}>
                <Text>Cancel</Text>
              </Button>
            </Right>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <SearchInput />
            <ScrollView
              style={{
                paddingVertical: 10,
              }}>
              {users.map((item, index) => (
                <NewChatListItem
                  key={index}
                  imageUrl={
                    'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4'
                  }
                  name={item.name ? item.name : item.username}
                  onPress={() => this.createChannel(item.userId)}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps({groupChannelInvite}) {
  return {channel: groupChannelInvite.channel};
}

export default connect(mapStateToProps, {createGroupChannel})(NewChat);

const styles = StyleSheet.create({});
