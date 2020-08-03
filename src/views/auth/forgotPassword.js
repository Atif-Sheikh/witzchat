import React from 'react';
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
} from 'native-base';

import colors from '../../constants/colors';

class ForgotPassword extends React.Component {
  state = {
    focusedInput: null,
  };

  setFocusedInput = (input) => {
    this.setState({focusedInput: input});
  };

  resetFocusedInput = () => {
    this.setState({focusedInput: null});
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {focusedInput} = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: colors.white,
            padding: 40,
            borderRadius: 40,
          }}>
          <Button
            rounded
            style={{
              alignSelf: 'flex-end',
              position: 'absolute',
              top: -15,
              right: 5,
            }}
            onPress={this.goBack}>
            <Icon name="close" type="FontAwesome" />
          </Button>
          <H3
            style={{
              marginBottom: 20,
            }}>
            Forgot Password
          </H3>
          <Text
            style={{
              marginBottom: 20,
            }}>
            Please enter Email Address associated with your account
          </Text>
          <Form style={{}} witzchat>
            <Item floatingLabel active={focusedInput === 'email'}>
              <Label>Email Address</Label>
              <Input
                style={{
                  color: colors.primary,
                }}
                onFocus={() => this.setFocusedInput('email')}
                onBlur={this.resetFocusedInput}
              />
            </Item>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Button
                style={{
                  marginTop: 20,
                }}
                onPress={this.goBack}
                transparent>
                <Text>Cancel</Text>
              </Button>
              <Button
                style={{
                  marginTop: 20,
                }}>
                <Text>Reset Password</Text>
              </Button>
            </View>
          </Form>
        </View>
      </View>
    );
  }
}

export default ForgotPassword;
