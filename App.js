/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {StyleProvider, Icon} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Login from './src/views/auth/login';
import ForgotPassword from './src/views/auth/forgotPassword';
import TermsAndConditions from './src/views/auth/termsAndConditions';
import Calls from './src/views/main/calls';
import Chats from './src/views/main/chats';
import Settings from './src/views/main/settings';
import ChatScreen from './src/views/main/chat';

import {StatusBar} from 'react-native';

import {slideAnimation} from './animations';

import colors from './src/constants/colors';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNavigatoins = () => (
  <Tab.Navigator
    activeColor={colors.primary}
    inactiveColor={colors.grey}
    barStyle={{backgroundColor: colors.white}}
    initialRouteName="Chats">
    <Tab.Screen
      name="Calls"
      component={Calls}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="phone" type="FontAwesome" style={{color: color}} />
        ),
      }}
    />
    <Tab.Screen
      name="Chats"
      component={Chats}
      options={{
        tabBarIcon: ({color}) => (
          <Icon
            name="wechat"
            type="FontAwesome"
            style={{color: color, width: 40, textAlign: 'center'}}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({color}) => (
          <Icon
            name="setting"
            type="AntDesign"
            style={{color: color, width: 40, textAlign: 'center'}}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <StyleProvider style={getTheme(material)}>
      <>
        <StatusBar backgroundColor={colors.white} />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: {backgroundColor: 'transparent'},
              cardOverlayEnabled: true,
              cardStyleInterpolator: slideAnimation,
            }}
            mode="modal">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                cardStyle: {backgroundColor: 'transparent'},
                cardOverlayEnabled: true,
                cardStyleInterpolator: ({current: {progress}}) => ({
                  cardStyle: {
                    opacity: progress.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: [0, 0.25, 0.7, 1],
                    }),
                  },
                  overlayStyle: {
                    opacity: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0.5],
                      extrapolate: 'clamp',
                    }),
                  },
                }),
              }}
            />
            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditions}
            />
            <Stack.Screen name="Main" component={TabNavigatoins} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </StyleProvider>
  );
};

export default App;
