import React from 'react';
import {ScrollView} from 'react-native';
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

class TermsAndConditions extends React.Component {
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
            borderRadius: 40,
            marginHorizontal: 10,
            marginVertical: 20,
            paddingVertical: 40,
          }}>
          <View
            style={{
              paddingHorizontal: 40,
            }}>
            <H3
              style={{
                marginBottom: 20,
              }}>
              Witz-U Terms of Service
            </H3>
          </View>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 40,
            }}>
            <Text
              style={{
                marginBottom: 20,
              }}>
              Thank you for using Witz-U. We are a collaborative digital
              healthcare platform, aiming to lead in early detection, and
              provide proactive intervention solutions through use of technology
              and active community engagement.
            </Text>
            <Text
              style={{
                marginBottom: 20,
              }}>
              The following Terms and Conditions states your rights in using the
              Witz-U platform.
            </Text>
            <Text
              style={{
                marginBottom: 20,
              }}>
              Please read the following Terms and Conditions carefully
              (including our Privacy Policy) (collectively, the "Terms of
              Service") before accessing and/or using any website or any
              electronic application owned and/or maintained by Witz-U Pte Ltd.
              ("Witz-U") or any of its affiliates
            </Text>
            <Text
              style={{
                marginBottom: 20,
              }}>
              Please read the following Terms and Conditions carefully
              (including our Privacy Policy) (collectively, the "Terms of
              Service") before accessing and/or using any website or any
              electronic application owned and/or maintained by Witz-U Pte Ltd.
              ("Witz-U") or any of its affiliates
            </Text>
            <Text
              style={{
                marginBottom: 20,
              }}>
              Please read the following Terms and Conditions carefully
              (including our Privacy Policy) (collectively, the "Terms of
              Service") before accessing and/or using any website or any
              electronic application owned and/or maintained by Witz-U Pte Ltd.
              ("Witz-U") or any of its affiliates
            </Text>
            <Text
              style={{
                marginBottom: 20,
              }}>
              Please read the following Terms and Conditions carefully
              (including our Privacy Policy) (collectively, the "Terms of
              Service") before accessing and/or using any website or any
              electronic application owned and/or maintained by Witz-U Pte Ltd.
              ("Witz-U") or any of its affiliates
            </Text>
            <Text
              style={{
                marginBottom: 20,
              }}>
              Please read the following Terms and Conditions carefully
              (including our Privacy Policy) (collectively, the "Terms of
              Service") before accessing and/or using any website or any
              electronic application owned and/or maintained by Witz-U Pte Ltd.
              ("Witz-U") or any of its affiliates
            </Text>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingHorizontal: 40,
            }}>
            <Button
              style={{
                marginTop: 20,
              }}
              onPress={this.goBack}>
              <Text>CONFIRM</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default TermsAndConditions;
