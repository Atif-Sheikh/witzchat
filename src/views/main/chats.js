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
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {sendbirdLogout, initMenu} from '../../actions';

import ClientScreen from './clients';

import colors from '../../constants/colors';

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

  redirectToNewChat = () => {
    this.props.navigation.navigate('NewChat');
  };

  render() {
    const {userType, isLoading} = this.state;
    return isLoading ? (
      <Container>
        <Header transparent androidStatusBarColor={'transparent'} />
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
        <Header transparent androidStatusBarColor={'transparent'} />
          {/* <Left>
            <Button transparent style={{width: 80, paddingLeft: 0}}>
              <Text style={{color: colors.primary}}>Edit</Text>
            </Button>
          </Left>
          <Body />
          <Right />
        </Header> */}
        <Content
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: 10,
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
              <Button onPress={this.redirectToNewChat} transparent>
                <Icon name="edit" type="FontAwesome5" primary />
              </Button>
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
