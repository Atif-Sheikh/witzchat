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
  Spinner,
} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

import ParseApi from '../../utils/parse';
import {initLogin, sendbirdLogin} from '../../actions';

import images from '../../constants/images';
import colors from '../../constants/colors';

import ToggleButtons from '../../components/toggleButtons';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'kfraczek1@usda.gov',
      password: 'P@ssword1',
      focusedInput: null,
      userType: 'client',
      isSubmiting: false,
    };
    this.inputs = {};
  }

  focusNextField = (id) => {
    if (this.inputs && this.inputs[id]) {
      this.inputs[id]._root.focus();
    }
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
    await AsyncStorage.setItem('@witzchatUserType', this.state.userType);

    this.props.navigation.navigate('Main');
  };

  login = () => {
    this.setState({isSubmiting: true});
    ParseApi.User.logIn(this.state.email, this.state.password)
      .then(async (user) => {
        console.log('Logged in user', user);
        await AsyncStorage.setItem('@witzUser', user);
        await this.props.sendbirdLogin({
          userId: user.objectId,
          nickname: user.username,
        });
        this.setState({isSubmiting: false});
      })
      .catch((error) => {
        this.setState({isSubmiting: false});
        console.error('Error while logging in user', error);
      });
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
                    value={this.state.email}
                    style={{
                      color: colors.primary,
                    }}
                    onFocus={() => this.setFocusedInput('username')}
                    onBlur={this.resetFocusedInput}
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.focusNextField('two')}
                    returnKeyType={'next'}
                    getRef={(input) => (this.inputs['one'] = input)}
                    autoCapitalize={'none'}
                    onChangeText={(email) => this.setState({email})}
                  />
                </Item>
                <Item floatingLabel active={focusedInput === 'password'}>
                  <Icon name="lock" type={'SimpleLineIcons'} />
                  <Label>Password</Label>
                  <Input
                    value={this.state.password}
                    secureTextEntry={true}
                    keyboardType={'visible-password'}
                    onFocus={() => this.setFocusedInput('password')}
                    onBlur={this.resetFocusedInput}
                    onSubmitEditing={this.login}
                    returnKeyType={'done'}
                    getRef={(input) => (this.inputs['two'] = input)}
                    onChangeText={(password) => this.setState({password})}
                  />
                </Item>
                <Button
                  block
                  style={{
                    marginTop: 20,
                  }}
                  onPress={this.login}
                  disabled={this.state.isSubmiting}>
                  {this.state.isSubmiting ? (
                    <Spinner color={colors.white} />
                  ) : (
                    <Text>Log in</Text>
                  )}
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
