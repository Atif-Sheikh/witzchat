import React from 'react';
import {Image} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  View,
  Form,
  Item,
  Input,
  Label,
  Icon,
} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

import {initLogin, sendbirdLogin} from '../../actions';

import images from '../../constants/images';
import colors from '../../constants/colors';

import ToggleButtons from '../../components/toggleButtons';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    focusedInput: null,
    userType: 'client',
  };

  componentDidMount() {
    SplashScreen.hide();
    this.props.initLogin();
  }

  setFocusedInput = (input) => {
    this.setState({focusedInput: input});
  };

  resetFocusedInput = () => {
    this.setState({focusedInput: null});
  };

  redirectToHomeScreen = async () => {
    console.log(this.state.userType);
    await AsyncStorage.setItem('@witzchatUserType', this.state.userType);
    await this.props.sendbirdLogin({
      userId: `AtifSheikh-${this.state.userType}`,
      nickname:
        this.state.userType === 'client'
          ? 'AtifSheikhClient'
          : 'AtifSheikhProvider',
    });
    this.props.navigation.navigate('Main');
  };

  render() {
    const {focusedInput} = this.state;
    return (
      <Container>
        <Content
          contentContainerStyle={{
            flex: 1,
          }}>
          <View style={{flex: 1, backgroundColor: colors.white}}>
            <View
              style={{
                flex: 0.4,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Image
                source={images.logo}
                style={{
                  height: 200,
                  width: 200,
                }}
              />
            </View>
            <View
              style={{
                flex: 0.6,
              }}>
              <View style={{marginTop: 20}}>
                <ToggleButtons
                  options={['client', 'provider']}
                  value={this.state.userType}
                  onPress={(value) => this.setState({userType: value})}
                />
              </View>
              <Form
                style={{
                  paddingHorizontal: 20,
                }}
                witzchat>
                <Item floatingLabel active={focusedInput === 'username'}>
                  <Icon name="user-o" type={'FontAwesome'} />
                  <Label>Username</Label>
                  <Input
                    style={{
                      color: colors.primary,
                    }}
                    onFocus={() => this.setFocusedInput('username')}
                    onBlur={this.resetFocusedInput}
                  />
                </Item>
                <Item floatingLabel error={focusedInput === 'password'}>
                  <Icon name="lock" type={'SimpleLineIcons'} />
                  <Label>Password</Label>
                  <Input
                    onFocus={() => this.setFocusedInput('password')}
                    onBlur={this.resetFocusedInput}
                  />
                </Item>
                <Button
                  block
                  style={{
                    marginTop: 20,
                  }}
                  onPress={this.redirectToHomeScreen}>
                  <Text>Log in</Text>
                </Button>
              </Form>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.navigate('ForgotPassword');
                }}>
                <Text
                  style={{
                    color: colors.grey,
                  }}>
                  Forgot Password?
                </Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps({login}) {
  const {error, user} = login;
  return {error, user};
}

export default connect(mapStateToProps, {initLogin, sendbirdLogin})(Login);
