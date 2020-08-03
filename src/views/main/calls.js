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

class Calls extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Calls Page</Text>
      </View>
    );
  }
}

export default Calls;
