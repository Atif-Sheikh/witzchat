import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'native-base';

import colors from '../constants/colors';

const ToggleButtons = ({
  options,
  value,
  onPress,
  activeColor = colors.darkGreen,
  inActiveColor = colors.lightGrey,
  activeTextColor = colors.white,
  inActiveTextColor = colors.grey,
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: inActiveColor,
          borderRadius: 5,
          shadowColor: 'red',
        }}>
        {options.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginVertical: 5,
              backgroundColor: value === item ? activeColor : inActiveColor,
              borderRadius: 5,
              width: 100,
              elevation: value === item ? 20 : 0,
            }}
            onPress={() => onPress(item)}>
            <Text
              style={{
                color: value === item ? activeTextColor : inActiveTextColor,
                textAlign: 'center',
              }}>
              {item.substring(0, 1).toUpperCase()}
              {item.substring(1).toLowerCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ToggleButtons;
