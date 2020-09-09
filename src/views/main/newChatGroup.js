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
import { API_TOKEN, APP_ID } from '../../sendbirdActions';


import { ThumbnailWithSelectIcon } from '../../components/newChatListItem';

import colors from '../../constants/colors';

class NewChatGroup extends React.Component {
  state = {
    users: [],
    isLoading: true,
    userData: null,
    title: '',
    defaultImage: 'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
    activeTab: 'client',
  };
  async componentDidMount() {
    const { activeTab } = this.props.route.params;
    const { users } = this.props.route.params;
    const userData = await AsyncStorage.getItem('@witzUser');
    if (userData) {
      const user = JSON.parse(userData);
      if (user) {
        this.setState({ userData: user, users, activeTab });
      }
    }
  }


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

  createChannel = async () => {
    const { userData, users, title } = this.state;
    if (title && title.trim().length) {
      for (const user of users) {
        await this.createUserOnSendBird(user);
      }
      const userIds = [users.map(user => user.userId)];
      userIds.push(userData.objectId);
      console.log(userIds);
      await this.props.createGroupChannel(userIds, false, this.state.activeTab, title);
      const { channel } = this.props;
      const data = {
        channelUrl: channel.url,
        title: title,
        // memberCount: channel.memberCount,
        isOpenChannel: channel.isOpenChannel(),
        // _initListState: this._initJoinState,
      };
      this.props.navigation.navigate('ChatScreen', data);
    } else {
      Toast.show({ text: 'Title is required for group chat', buttonText: 'Okay', type: 'warning' });
    }
  };
  _initJoinState = () => {
    console.log('joined');
  };

  render() {
    const { users, defaultImage, title } = this.state;
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
            <Left >

              <Button transparent onPress={this.goBack}>
                <Text>Cancel</Text>
              </Button>
            </Left>
            <Body>
              <H3 heading>New Group Chat</H3>
            </Body>
            <Right>
              <Button transparent onPress={this.createChannel}>
                <Text>Create</Text>
              </Button>
            </Right>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <ScrollView
              style={{
                paddingVertical: 10,
              }}>
              <View style={{
                marginBottom: 20,
              }}>
                <Input placeholder="Group Title" value={title} onChangeText={(value) => this.setState({ title: value })} />
              </View>
              <View style={{
                marginBottom: 20,
              }}>
                <Text style={{
                  fontWeight: 'bold'
                }}>Members:</Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {users.map(user => <TouchableOpacity
                  style={{ paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <ThumbnailWithSelectIcon imageUrl={defaultImage} showIcon={false} />
                  <Text>{user.name && user.name.length > 10 ? `${user.name.substring(0, 7)}...` : user.name}</Text>
                </TouchableOpacity>)}
              </View>
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

export default connect(mapStateToProps, { createGroupChannel })(NewChatGroup);

const styles = StyleSheet.create({});
