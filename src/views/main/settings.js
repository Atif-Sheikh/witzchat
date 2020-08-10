import React from 'react';
import {ScrollView, Image, StyleSheet} from 'react-native';
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
import {CommonActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import {sendbirdLogout} from '../../actions';

import SearchInput from '../../components/searchInput';
import CallListItem from '../../components/callListItem';

import colors from '../../constants/colors';

class Settings extends React.Component {
  onPressItem = (item) => {
    if (item.name === 'Logout') {
      this.props.sendbirdLogout();
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      this.props.navigation.dispatch(resetAction);
    }
  };

  render() {
    const listItems = [
      {
        name: 'Starred Messages',
      },
      {
        name: 'Account',
      },
      {
        name: 'Chat',
      },
      {
        name: 'Notifications',
      },
      {
        name: 'Data and Storage Usage',
      },
      {
        name: 'Help',
      },
      {
        name: 'Logout',
      },
    ];
    return (
      <Container>
        <Header
          style={{
            backgroundColor: colors.lightGrey,
            borderBottomWidth: 0,
          }}
          androidStatusBarColor={colors.white}
        />
        <Content
          contentContainerStyle={{
            flex: 1,
            backgroundColor: colors.lightGrey,
          }}>
          <View
            style={{
              paddingHorizontal: 25,
              paddingTop: 20,
            }}>
            <H3
              style={{
                marginBottom: 20,
              }}
              heading>
              Settings
            </H3>
          </View>
          <ListItem avatar style={[styles.listItem, styles.profile]}>
            <Left style={{justifyContent: 'center'}}>
              <Thumbnail
                source={{
                  uri:
                    'https://avatars0.githubusercontent.com/u/26920662?s=400&u=407bc704158505fbad27731d5c7ea9212e803f3b&v=4',
                }}
                large
              />
            </Left>
            <Body
              style={{
                height: 80,
                justifyContent: 'center',
                borderBottomWidth: 0,
              }}>
              <H3 heading>Dr Anita T</H3>
            </Body>
          </ListItem>
          <View
            style={{
              paddingTop: 20,
              flex: 1,
            }}>
            {listItems.map((item, index) => (
              <ListItem
                key={index}
                style={styles.listItem}
                onPress={() => this.onPressItem(item)}>
                <Body style={styles.settingsListItemBody}>
                  <Text style={styles.settingsText}>{item.name}</Text>
                </Body>
                <Right>
                  <Icon name="chevron-right" type="FontAwesome5" />
                </Right>
              </ListItem>
            ))}
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps({menu}) {
  const {isDisconnected} = menu;
  return {isDisconnected};
}

export default connect(mapStateToProps, {sendbirdLogout})(Settings);

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 25,
  },
  profile: {
    height: 100,
    justifyContent: 'center',
  },
  settingsListItemBody: {
    height: 40,
    justifyContent: 'center',
  },
  settingsText: {
    color: colors.grey,
  },
});
