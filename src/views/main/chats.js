import React from 'react';
import {ScrollView, Image} from 'react-native';
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
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

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
  render() {
    return (
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
                }} heading>
                Chats
              </H3>
            </View>
            <View>
              <Icon name="edit" type="FontAwesome5" primary />
            </View>
          </View>
          <Tabs />
        </Content>
      </Container>
    );
  }
}

export default Chats;
