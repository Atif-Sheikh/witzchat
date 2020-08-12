import React from 'react';
import {ScrollView, Image, StatusBar} from 'react-native';
import {
  View,
  H3,
  Text,
  Button,
  Icon,
  Content,
  Container,
  Header,
  Left,
  Body,
  Right,
  Spinner,
} from 'native-base';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationAction, CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {sendbirdLogout, initMenu} from '../../actions';
import {sbConnect} from '../../sendbirdActions';

import ClientScreen from './clients';
// import SendBird from 'sendbird';

import colors from '../../constants/colors';

// var sb = null;

const Tab = createMaterialTopTabNavigator();
const Tabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: colors.primary,
      inactiveTintColor: colors.grey,
      indicatorStyle: {backgroundColor: colors.primary},
    }}>
    <Tab.Screen name="Client" component={ClientScreen} />
    <Tab.Screen name="Provider" component={ClientScreen} />
  </Tab.Navigator>
);
class Chats extends React.Component {
  state = {
    userType: 'client',
    isLoading: true,
  };
  componentDidMount = async () => {
    const userType = await AsyncStorage.getItem('@witzchatUserType');
    if (userType && userType.length) {
      this.setState({userType, isLoading: false});
    }
  };

  getChannels = () => {
    var channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
    channelListQuery.includeEmpty = true;
    channelListQuery.order = 'latest_last_message'; // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'
    channelListQuery.limit = 15; // The value of pagination limit could be set up to 100.

    if (channelListQuery.hasNext) {
      channelListQuery.next(function (channelList, error) {
        if (error) {
          return;
        }

        console.log('channelList', channelList);
      });
    }
  };

  render() {
    const {userType, isLoading} = this.state;
    return isLoading ? (
      <Container>
        <Header transparent androidStatusBarColor={colors.white} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Spinner color={colors.primary} />
        </View>
      </Container>
    ) : (
      <Container>
        <Header transparent androidStatusBarColor={colors.white}>
          <Left>
            <Button transparent>
              <Text style={{color: colors.primary}}>Edit</Text>
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: 25,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <H3
                style={{
                  marginBottom: 20,
                }}
                heading>
                Chats
              </H3>
            </View>
            <View>
              <Icon name="edit" type="FontAwesome5" primary />
            </View>
          </View>
          {userType === 'provider' ? (
            <Tabs />
          ) : (
            <ClientScreen {...this.props} />
          )}
        </Content>
      </Container>
    );
  }
}

function mapStateToProps({menu}) {
  const {isDisconnected} = menu;
  return {isDisconnected};
}

export default connect(mapStateToProps, {sendbirdLogout, initMenu})(Chats);
